import React, { useState, useEffect, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Copy, 
  Download, 
  Trash2, 
  Smartphone, 
  Clipboard,
  Eraser,
  CircleHelp,
  MessageSquare,
  Link as LinkIcon,
  ArrowRight,
  Wifi
} from 'lucide-react';
import { QRCodeModal } from './components/QRCodeModal';
import { InstructionsModal } from './components/InstructionsModal';

export default function App() {
  const [text, setText] = useState<string>(() => {
    return localStorage.getItem('simple_clipboard_text') || '';
  });
  
  // New State: Mode switching (connect vs editor)
  // If there is existing text, we assume the user might want to go straight to editor, 
  // but following the request, we prioritize connection if they explicitly want that flow.
  // We'll default to 'connect' if it's a fresh visit (no text), otherwise 'editor'.
  const [mode, setMode] = useState<'connect' | 'editor'>(() => {
    return localStorage.getItem('simple_clipboard_text') ? 'editor' : 'connect';
  });

  const [showQR, setShowQR] = useState<boolean>(false); // Data QR
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem('simple_clipboard_text', text);
  }, [text]);

  const handleCopy = useCallback(() => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  const handleDownload = useCallback(() => {
    if (!text) return;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clipboard-content.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [text]);

  const handleSendSMS = useCallback(() => {
    if (!text) return;

    if (text.length > 2000) {
      alert("Text is too long for SMS (limit is approx 2000 characters).\nPlease use the QR Code transfer or Copy function instead.\n\n內容過長，無法使用簡訊傳送（上限約 2000 字），請改用 QR Code 或複製功能。");
      return;
    }

    const body = encodeURIComponent(text);
    window.location.href = `sms:?body=${body}`;
  }, [text]);

  const clearAll = () => {
    if (text && window.confirm("Are you sure you want to clear the clipboard?")) {
      setText("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setMode('connect')}>
            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center shadow-lg border border-slate-700">
              <Clipboard className="text-blue-400 w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight text-white">Clipboard Bridge</h1>
              <p className="text-xs text-slate-400">Simple Cross-Device Transfer</p>
            </div>
          </div>
          
          {/* Header Actions */}
          <div className="flex items-center gap-2">
            {mode === 'editor' && (
              <button 
                onClick={() => setMode('connect')}
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-sm"
              >
                <LinkIcon size={16} />
                <span>Reconnect</span>
              </button>
            )}

            <div className="w-px h-6 bg-slate-700 mx-1"></div>

            <button 
              onClick={() => setShowInstructions(true)}
              className="p-2 text-slate-400 hover:text-blue-400 transition-colors rounded-lg hover:bg-slate-800"
              title="Help / 使用說明"
            >
              <CircleHelp size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-4 flex flex-col h-[calc(100vh-80px)]">
        
        {/* VIEW 1: CONNECT (Landing) */}
        {mode === 'connect' && (
          <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
            <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-md text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 text-blue-400">
                <Wifi size={32} />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">Establish Connection</h2>
              <p className="text-slate-400 mb-8 text-sm leading-relaxed">
                Scan this code with your second device (phone/tablet) to open the app.
                <br />
                <span className="text-slate-500 text-xs">(掃描此 QR Code 以在第二台設備上開啟本網頁)</span>
              </p>

              <div className="bg-white p-4 rounded-2xl shadow-inner mb-8">
                <QRCodeSVG 
                  value={window.location.href} 
                  size={220}
                  level={"M"}
                  includeMargin={true}
                />
              </div>

              <button
                onClick={() => setMode('editor')}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-900/20 font-semibold"
              >
                <span>Ready, Start Editing</span>
                <ArrowRight size={20} />
              </button>
              
              <p className="mt-4 text-xs text-slate-500">
                Already on the target device? <button onClick={() => setMode('editor')} className="text-blue-400 hover:underline">Skip this step</button>
              </p>
            </div>
          </div>
        )}

        {/* VIEW 2: EDITOR (Workspace) */}
        {mode === 'editor' && (
          <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
            
            {/* Toolbar for Editor */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Workspace
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={handleSendSMS}
                  disabled={!text}
                  className="p-2 bg-slate-800 text-slate-300 hover:text-green-400 border border-slate-700 hover:border-green-400/50 transition-all rounded-lg disabled:opacity-30 disabled:hover:border-slate-700"
                  title="Send via SMS"
                >
                  <MessageSquare size={18} />
                </button>
                <button 
                  onClick={handleDownload}
                  disabled={!text}
                  className="p-2 bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-700 hover:border-emerald-400/50 transition-all rounded-lg disabled:opacity-30 disabled:hover:border-slate-700"
                  title="Download .txt"
                >
                  <Download size={18} />
                </button>
                <button 
                  onClick={clearAll}
                  disabled={!text}
                  className="p-2 bg-slate-800 text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-400/50 transition-all rounded-lg disabled:opacity-30 disabled:hover:border-slate-700"
                  title="Clear"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-xl overflow-hidden flex flex-col relative group focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text or code here..."
                className="flex-1 w-full bg-transparent p-6 resize-none outline-none text-slate-200 placeholder:text-slate-600 font-mono text-base leading-relaxed"
                spellCheck={false}
                autoFocus
              />
              
              {/* Bottom Actions Bar */}
              <div className="px-6 py-4 bg-slate-800 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                 <div className="text-xs text-slate-500 font-mono">
                   {text.length} chars
                 </div>

                 <div className="flex gap-3 w-full sm:w-auto">
                   <button 
                    onClick={handleCopy}
                    disabled={!text}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
                   >
                     {copied ? <span className="text-emerald-400 font-bold">Copied!</span> : <> <Copy size={16} /> Copy </>}
                   </button>

                   <button 
                    onClick={() => setShowQR(true)}
                    disabled={!text}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50 shadow-lg shadow-blue-900/20"
                   >
                     <Smartphone size={18} />
                     <span>Transfer Data</span>
                   </button>
                 </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* QR Code Modal (For Data Transfer) */}
      <QRCodeModal 
        isOpen={showQR} 
        onClose={() => setShowQR(false)} 
        data={text} 
      />

      {/* Instructions Modal */}
      <InstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />
    </div>
  );
}