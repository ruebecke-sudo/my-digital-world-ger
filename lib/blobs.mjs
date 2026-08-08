import { Blob } from '@netlify/blobs';

// Orders Store - speichert Bestelldaten (Status, Token, etc.)
export const ordersStore = new Blob({ path: 'orders/' });

// Images Store - speichert generierte Bilder
export const imagesStore = new Blob({ path: 'images/' });