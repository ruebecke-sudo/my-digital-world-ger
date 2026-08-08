import sharp from 'sharp';

const MDW_LOGO_BASE64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==';

export async function addBranding(imageBuffer) {
  // Falls kein Logo vorhanden, einfach das originale Bild zurückgeben
  if (!MDW_LOGO_BASE64) return imageBuffer;
  
  // Vereinfachte Version: Nur das Bild zurückgeben
  // Die Logo-Anwendung kann hier später implementiert werden
  return imageBuffer;
}
