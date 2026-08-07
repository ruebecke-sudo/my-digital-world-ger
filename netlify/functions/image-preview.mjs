import { ordersStore, imagesStore } from '../lib/blobs.mjs';

export async function handler(event) {
  const orderId = event.queryStringParameters?.order_id;
  const downloadToken = event.queryStringParameters?.token;
  const type = event.queryStringParameters?.type || 'preview'; // 'preview' (mit Logo) oder 'download' (ohne)

  if (!orderId || !downloadToken) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing parameters' }) };
  }

  try {
    // Hole Order-Daten
    const orderData = await ordersStore.get(orderId);
    if (!orderData) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Order not found' }) };
    }

    const order = JSON.parse(orderData);

    // Validiere Download-Token
    if (order.downloadToken !== downloadToken) {
      return { statusCode: 403, body: JSON.stringify({ error: 'Invalid token' }) };
    }

    // Prüfe Status
    if (order.status !== 'done') {
      return { statusCode: 202, body: JSON.stringify({ status: order.status }) };
    }

    // ====== NEUE LOGIK: Je nach type ======
    let imageBuffer;
    if (type === 'preview') {
      // Mit Logo (für Website-Anzeige)
      imageBuffer = await imagesStore.get(`${orderId}_preview`);
    } else {
      // Ohne Logo (für Download)
      imageBuffer = await imagesStore.get(`${orderId}_download`);
    }
    // ======================================

    if (!imageBuffer) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Image not found' }) };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600', // 1 Stunde cachen
      },
      body: imageBuffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error('Preview error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
