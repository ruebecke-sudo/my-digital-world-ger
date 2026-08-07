import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'wouter';

export default function PosterDanke() {
  const location = useLocation();
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get('order');
  const downloadToken = params.get('token');

  const [status, setStatus] = useState('pending');
  const [progress, setProgress] = useState(4);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const pollingRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (!orderId || !downloadToken) return;

    const poll = async () => {
      try {
        const res = await fetch(
          `/.netlify/functions/order-status?order_id=${orderId}&token=${downloadToken}`
        );
        const data = await res.json();
        setStatus(data.status);

        // Berechne Progress basierend auf Status
        if (data.status === 'pending') {
          setProgress(p => Math.min(p + Math.random() * 3, 30));
        } else if (data.status === 'generating') {
          setProgress(p => Math.min(p + Math.random() * 2, 95));
        } else if (data.status === 'done') {
          setProgress(100);
          // ====== NEUE LOGIK: Preview mit Logo ======
          setPreviewImage(
            `/.netlify/functions/image-preview?order_id=${orderId}&token=${downloadToken}&type=preview`
          );
          // ==========================================
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    };

    poll(); // Sofort einmal aufrufen
    pollingRef.current = setInterval(poll, 3000);

    return () => clearInterval(pollingRef.current);
  }, [orderId, downloadToken]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-lg p-8 shadow-2xl">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center border-2 border-emerald-500">
            <svg className="w-8 h-8 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center mb-2">Zahlung erfolgreich!</h1>
        <p className="text-slate-400 text-center mb-6">
          Dein persönliches Poster wird gerade erstellt.
          Das dauert ca. 30-60 Sekunden – bitte lass die Seite geöffnet.
        </p>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="relative w-full h-3 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-slate-400 mt-2 text-center">
            {Math.round(progress)}% – die KI malt gerade dein Poster ...
          </p>
        </div>

        {/* Image Preview */}
        {previewImage && (
          <div className="mb-6">
            <div
              className="relative bg-slate-700 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setShowPopup(true)}
            >
              <img
                src={previewImage}
                alt="Poster Preview"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors">
                <span className="text-white text-sm font-semibold opacity-0 hover:opacity-100">
                  Klicken zum Vergrößern
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Download Button (nur bei status = done) */}
        {status === 'done' && (
          <a
            href={`/.netlify/functions/download?order_id=${orderId}&token=${downloadToken}`}
            download={`mdw-poster-${orderId}.png`}
            className="block w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all text-center"
          >
            📥 Jetzt herunterladen
          </a>
        )}

        {/* Loading State */}
        {status !== 'done' && (
          <div className="text-center text-slate-400 text-sm">
            Generierung läuft... Gleich geht's los!
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg text-sm">
            ⚠️ Fehler bei der Generierung. Bitte kontaktiere den Support.
          </div>
        )}
      </div>

      {/* Popup Modal */}
      {showPopup && previewImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
          onClick={() => setShowPopup(false)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <img
              src={previewImage}
              alt="Poster Full Preview"
              className="w-full h-auto rounded-lg"
              onClick={e => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
