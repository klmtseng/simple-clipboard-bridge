import React from 'react';
import { X, Link as LinkIcon, Edit3, Smartphone, Wifi } from 'lucide-react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl max-w-lg w-full p-6 relative animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-3 flex items-center gap-2">
          <span>Usage Guide</span>
          <span className="text-slate-500 font-normal">/</span>
          <span>使用說明</span>
        </h2>

        <div className="overflow-y-auto pr-2 custom-scrollbar flex-1 space-y-8">
          {/* English Section */}
          <section>
            <h3 className="text-blue-400 font-semibold mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
              English
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="bg-slate-700/50 p-2 rounded-lg h-fit text-slate-400">
                  <Wifi size={20} />
                </div>
                <div>
                  <h4 className="text-slate-200 font-medium text-sm">1. Establish Connection</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    Open the app on your primary device. Scan the <strong>Connection QR Code</strong> with your second device (e.g., phone) to open the app there.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="bg-slate-700/50 p-2 rounded-lg h-fit text-slate-400">
                  <Edit3 size={20} />
                </div>
                <div>
                  <h4 className="text-slate-200 font-medium text-sm">2. Compose Text</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    Type or paste content into the editor on your primary device.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="bg-slate-700/50 p-2 rounded-lg h-fit text-slate-400">
                  <Smartphone size={20} />
                </div>
                <div>
                  <h4 className="text-slate-200 font-medium text-sm">3. Transfer via Clipboard</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    Click <strong>Transfer Data</strong> to generate a Data QR Code. Scan it with your connected device to instantly copy the text to its clipboard.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          {/* Chinese Section */}
          <section>
            <h3 className="text-emerald-400 font-semibold mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
              中文指南
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="bg-slate-700/50 p-2 rounded-lg h-fit text-slate-400">
                  <Wifi size={20} />
                </div>
                <div>
                  <h4 className="text-slate-200 font-medium text-sm">1. 建立連線</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    在主設備開啟網頁，使用第二台設備（如手機）掃描首頁的 <strong>連線 QR Code</strong>，以在該設備上開啟本應用程式。
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="bg-slate-700/50 p-2 rounded-lg h-fit text-slate-400">
                  <Edit3 size={20} />
                </div>
                <div>
                  <h4 className="text-slate-200 font-medium text-sm">2. 編輯內容</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    在主設備的編輯器中輸入或貼上您想要傳輸的文字。
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="bg-slate-700/50 p-2 rounded-lg h-fit text-slate-400">
                  <Smartphone size={20} />
                </div>
                <div>
                  <h4 className="text-slate-200 font-medium text-sm">3. 複製剪貼簿傳輸</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    點擊 <strong>Transfer Data</strong> 按鈕生成資料 QR Code。使用已連線的設備掃描，即可將內容複製到該設備的剪貼簿。
                  </p>
                </div>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Close / 關閉
          </button>
        </div>
      </div>
    </div>
  );
};