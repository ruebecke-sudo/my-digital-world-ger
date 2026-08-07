// POST /api/generate-background (intern)
// Wird vom Webhook aufgerufen – generiert Bild mit Stable Diffusion 3
import { getOrder, saveOrder, addBranding, imagesStore } from "../../lib/shared.mjs";

export default async (req) => {
  const { orderId, internalSecret } = await req.json();

  if (req.headers.get("x-internal-key") !== internalSecret) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const order = await getOrder(orderId);
    if (!order) return new Response("Order not found", { status: 404 });

    console.log(`[${orderId}] Starte SD3-Bildgenerierung...`);

    // Replicate API aufrufen (Stable Diffusion 3)
    const replicateResponse = await fetch(
      "https://api.replicate.com/v1/predictions",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          version:
            "7762fd07cf82c948538e41f63dcdc30ba1375dc20e9716c00e1358aa9c7f87df", // SD3 Medium
          input: { prompt: order.prompt },
        }),
      }
    );

    if (!replicateResponse.ok) {
      throw new Error(
        `Replicate API error: ${replicateResponse.status} ${replicateResponse.statusText}`
      );
    }

    const prediction = await replicateResponse.json();
    const predictionId = prediction.id;

    console.log(`[${orderId}] Prediction ID: ${predictionId}`);

    // Warte auf Fertigstellung (Poll)
    let result = prediction;
    let attempts = 0;
    const maxAttempts = 120; // 10 Min bei 5s Intervals

    while (
      (result.status === "processing" || result.status === "starting") &&
      attempts < maxAttempts
    ) {
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const pollResponse = await fetch(
        `https://api.replicate.com/v1/predictions/${predictionId}`,
        {
          headers: { Authorization: `Token ${process.env.REPLICATE_API_TOKEN}` },
        }
      );

      result = await pollResponse.json();
      attempts++;
      console.log(`[${orderId}] Versuch ${attempts}: ${result.status}`);
    }

    if (result.status !== "succeeded") {
      throw new Error(`Generation failed: ${result.status}`);
    }

    // Bild-URL aus Output
    const imageUrl = result.output && result.output[0];
    if (!imageUrl) {
      throw new Error("No image URL in response");
    }

    console.log(`[${orderId}] Bild generiert: ${imageUrl}`);

    // Bild downloaden
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    // Branding hinzufügen
    const brandedImage = await addBranding(imageBuffer);

    // In Blobs speichern
    await imagesStore().set(orderId, brandedImage, {
      metadata: { contentType: "image/png" },
    });

    // Order-Status auf "done" setzen
    order.status = "done";
    await saveOrder(order);

    console.log(`[${orderId}] ✓ Fertig!`);

    return new Response(
      JSON.stringify({ success: true, orderId }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(`Generation error:`, error);

    const order = await getOrder(orderId);
    if (order) {
      order.status = "error";
      order.error = error.message;
      await saveOrder(order);
    }

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
