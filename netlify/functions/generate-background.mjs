import fetch from 'node-fetch';
import { Readable } from 'stream';
import sharp from 'sharp';
import { ordersStore, imagesStore } from '../lib/blobs.mjs';
import { addBranding } from '../lib/shared.mjs';

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const SD3_MODEL_VERSION = 'a6c0daea3c4a01b5ef380f6a9f62c12d02d0f1e3f8e3b5c8d9e0f1a2b3c4d5e6';

export async function handler(event) {
  const orderId = event.queryStringParameters?.order_id;

  if (!orderId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing order_id' }) };
  }

  try {
    // Hole Order-Daten
    const orderData = await ordersStore.get(orderId);
    if (!orderData) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Order not found' }) };
    }

    const order = JSON.parse(orderData);

    // Prüfe ob bereits vorhanden
    const existingImage = await imagesStore.get(`${orderId}_download`).catch(() => null);
    if (existingImage) {
      await ordersStore.put(orderId, JSON.stringify({ ...order, status: 'done' }));
      return { statusCode: 200, body: JSON.stringify({ status: 'done' }) };
    }

    // Update Status → "generating"
    await ordersStore.put(orderId, JSON.stringify({ ...order, status: 'generating' }));

    // Starte Prediction bei Replicate
    const predictionRes = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: SD3_MODEL_VERSION,
        input: {
          prompt: order.prompt,
          width: 1024,
          height: 1536,
          num_outputs: 1,
          guidance_scale: 7,
        },
      }),
    });

    if (!predictionRes.ok) {
      throw new Error(`Replicate API error: ${predictionRes.statusText}`);
    }

    const prediction = await predictionRes.json();
    const predictionId = prediction.id;

    // Polling: Warte auf Completion (max 10 min, alle 5 sek)
    let completed = false;
    let attempts = 0;
    const maxAttempts = 120;

    while (!completed && attempts < maxAttempts) {
      attempts++;

      const statusRes = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: { 'Authorization': `Token ${REPLICATE_API_TOKEN}` },
      });

      const status = await statusRes.json();

      if (status.status === 'succeeded') {
        completed = true;
        const imageUrl = status.output[0];

        // Download Bild von Replicate
        const imgRes = await fetch(imageUrl);
        const imgBuffer = await imgRes.buffer();

        // ====== NEUE LOGIK: Zwei Versionen ======

        // Version 1: MIT Logo (für Preview)
        const imageWithBranding = await addBranding(imgBuffer);
        await imagesStore.put(`${orderId}_preview`, imageWithBranding);

        // Version 2: OHNE Logo (für Download)
        await imagesStore.put(`${orderId}_download`, imgBuffer);

        // ========================================

        // Update Status → "done"
        await ordersStore.put(orderId, JSON.stringify({ ...order, status: 'done' }));

        return { statusCode: 200, body: JSON.stringify({ status: 'done' }) };
      } else if (status.status === 'failed') {
        throw new Error(`Prediction failed: ${status.error}`);
      }

      // Warte 5 Sekunden vor nächstem Poll
      await new Promise(resolve => setTimeout(resolve, 5000));
    }

    throw new Error('Prediction timeout after 10 minutes');
  } catch (error) {
    console.error('Error:', error);
    await ordersStore.put(orderId, JSON.stringify({ ...order, status: 'error' }));
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
