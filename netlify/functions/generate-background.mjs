// Background-Function (Namens-Suffix "-background" = bis zu 15 Min. Laufzeit).
// Generiert das Bild nach bestätigter Zahlung und stempelt das Branding auf.
import OpenAI from "openai";
import { getOrder, saveOrder, addBranding, imagesStore } from "../../lib/shared.mjs";

export default async (req) => {
  if (req.headers.get("x-internal-key") !== process.env.INTERNAL_SECRET) {
    return new Response("Kein Zugriff.", { status: 403 });
  }
  const { orderId } = await req.json();
  const order = await getOrder(orderId);
  if (!order || order.status !== "paid") return new Response("Ignoriert.", { status: 200 });

  try {
    console.log(`Generiere Bild für Bestellung ${orderId} …`);
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt: order.prompt,
      size: process.env.IMAGE_SIZE || "1024x1536",
      quality: "high",
    });

    const roh = Buffer.from(result.data[0].b64_json, "base64");
    const fertig = await addBranding(roh);

    await imagesStore().set(orderId, fertig.buffer.slice(fertig.byteOffset, fertig.byteOffset + fertig.byteLength));
    order.status = "done";
    order.doneAt = new Date().toISOString();
    await saveOrder(order);
    console.log(`Bild fertig: ${orderId}`);
  } catch (err) {
    console.error(`Bildgenerierung fehlgeschlagen (${orderId}):`, err.message);
    order.status = "error";
    order.error = err.message;
    await saveOrder(order);
  }
  return new Response("OK");
};
