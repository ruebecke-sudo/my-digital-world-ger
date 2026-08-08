<<<<<<< HEAD
﻿export async function addBranding(imageBuffer) {
  return imageBuffer;
}
=======
import sharp from 'sharp';

const MDW_LOGO_BASE64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==';

export async function addBranding(imageBuffer) {
  // Falls kein Logo vorhanden, einfach das originale Bild zurückgeben
  if (!MDW_LOGO_BASE64) return imageBuffer;
  
  // Vereinfachte Version: Nur das Bild zurückgeben
  // Die Logo-Anwendung kann hier später implementiert werden
  return imageBuffer;
}
>>>>>>> e556fcc347f5e098d1da8b23588b221e42274f91
