import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Smartphone, AlertTriangle } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  // QR Codes have a capacity limit. Approx 2-3KB is safe for Version 40.
  // We warn the user if the data is too large.
  const isTooLarge = data.length > 2000;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl max-w-sm w-full p-6 relative animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
            <Smartphone className="text-blue-400" />
            Scan to Transfer
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Use your phone's camera to scan this code and copy the text instantly.
          </p>
        </div>

        <div className="flex justify-center bg-white p-4 rounded-xl mb-4">
          {!isTooLarge ? (
             <QRCodeSVG 
             value={data} 
             size={200}
             level={"M"}
             includeMargin={true}
           />
          ) : (
            <div className="w-[200px] h-[200px] flex flex-col items-center justify-center text-red-500 text-center p-2">
              <AlertTriangle size={48} className="mb-2" />
              <span className="text-sm font-semibold">Text too long for QR Code</span>
              <span className="text-xs text-slate-500 mt-1">Try summarizing or splitting the text.</span>
            </div>
          )}
         
        </div>

        {isTooLarge && (
           <p className="text-xs text-center text-amber-400 mb-4">
             Tip: Use the "Download" button on the dashboard for large files.
           </p>
        )}

        <div className="text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
