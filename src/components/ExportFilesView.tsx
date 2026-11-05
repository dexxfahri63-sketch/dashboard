import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  Download,
  FolderArchive,
  FileCode,
  Terminal,
  ExternalLink,
} from 'lucide-react';
import { STANDALONE_FILES } from '../utils/standalone-bundle';

export const ExportFilesView: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<'index.html' | 'style.css' | 'script.js'>('index.html');
  const [copied, setCopied] = useState(false);

  const currentContent = STANDALONE_FILES[selectedFile];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    downloadFile('index.html', STANDALONE_FILES['index.html']);
    setTimeout(() => downloadFile('style.css', STANDALONE_FILES['style.css']), 200);
    setTimeout(() => downloadFile('script.js', STANDALONE_FILES['script.js']), 400);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span>Struktur File Proyek (index.html, style.css, script.js)</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              Standalone Zero-Build
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Download atau salin file ini langsung untuk diedit di Visual Studio Code dan dideploy ke GitHub Pages / Vercel.
          </p>
        </div>

        <button
          onClick={handleDownloadAll}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all"
          style={{ backgroundColor: 'var(--accent-primary, #0D9488)' }}
        >
          <Download className="w-4 h-4" />
          <span>Download Semua File (3 File)</span>
        </button>
      </div>

      {/* VS Code & GitHub Deployment Guide */}
      <div
        className="p-5 rounded-2xl border space-y-3"
        style={{
          backgroundColor: 'var(--bg-card, #131C31)',
          borderColor: 'var(--border-color, #1E293B)',
        }}
      >
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Terminal className="w-4 h-4 text-teal-400" />
          <span>Panduan Deployment ke GitHub & Visual Studio Code</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="font-bold text-white">1. Siapkan Folder di VS Code</div>
            <p className="text-slate-400 text-[11px]">
              Buat folder baru di komputer, download 3 file di bawah (<code className="text-teal-400">index.html</code>, <code className="text-teal-400">style.css</code>, <code className="text-teal-400">script.js</code>) dan letakkan di dalam 1 folder yang sama.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="font-bold text-white">2. Push ke GitHub Repo Klien</div>
            <p className="text-slate-400 text-[11px]">
              Buat repository baru di GitHub (misal: <code className="text-teal-400">laundry-klien-a</code>), push ketiga file tersebut via Git / VS Code Source Control.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="font-bold text-white">3. Aktifkan GitHub Pages</div>
            <p className="text-slate-400 text-[11px]">
              Masuk ke repo GitHub &gt; <strong>Settings &gt; Pages &gt; Branch: main &gt; Save</strong>. Website laundry langsung online gratis dengan SSL HTTPS!
            </p>
          </div>
        </div>
      </div>

      {/* Code Editor & Viewer */}
      <div
        className="rounded-2xl border overflow-hidden shadow-lg"
        style={{
          backgroundColor: 'var(--bg-card, #131C31)',
          borderColor: 'var(--border-color, #1E293B)',
        }}
      >
        {/* File Tabs */}
        <div className="flex items-center justify-between border-b px-4 py-2 bg-slate-950 border-slate-800 flex-wrap gap-2">
          <div className="flex items-center gap-1">
            {(['index.html', 'style.css', 'script.js'] as const).map((filename) => (
              <button
                key={filename}
                onClick={() => setSelectedFile(filename)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  selectedFile === filename
                    ? 'bg-slate-800 text-teal-400 border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{filename}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 bg-slate-850 hover:bg-slate-800 border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : `Salin ${selectedFile}`}</span>
            </button>

            <button
              onClick={() => downloadFile(selectedFile, currentContent)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all"
              style={{ backgroundColor: 'var(--accent-primary, #0D9488)' }}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download {selectedFile}</span>
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="relative">
          <pre className="p-4 bg-slate-950 text-slate-300 text-xs font-mono overflow-x-auto max-h-[500px] leading-relaxed">
            {currentContent}
          </pre>
        </div>
      </div>
    </div>
  );
};
