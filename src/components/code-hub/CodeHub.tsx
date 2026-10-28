import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CODE_DELIVERABLES, CodeFile } from '../../data/codebaseDeliverables';
import {
  Code2,
  FileCode,
  Copy,
  Check,
  Download,
  FolderTree,
  Smartphone,
  Server,
  Database,
  BookOpen
} from 'lucide-react';

export const CodeHub: React.FC = () => {
  const { language } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Flutter' | 'ASPNET' | 'SQLServer' | 'Docs'>('All');
  const [activeFile, setActiveFile] = useState<CodeFile>(CODE_DELIVERABLES[0]);
  const [copied, setCopied] = useState(false);

  const filteredFiles = selectedCategory === 'All'
    ? CODE_DELIVERABLES
    : CODE_DELIVERABLES.filter(f => f.category === selectedCategory);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = activeFile.path.split('/').pop() || 'code.txt';
    const blob = new Blob([activeFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#07583D]">
              Complete Project Codebase
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {CODE_DELIVERABLES.length} Production Files
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1">
            {language === 'km' ? 'កូដគម្រោងពេញលេញ (Flutter, ASP.NET Core & SQL Server)' : 'Source Code & Project Deliverables'}
          </h2>
          <p className="text-xs text-slate-500">
            Browse, copy, or download all source code files ready for Visual Studio, SSMS, and Flutter SDK
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {(['All', 'Flutter', 'ASPNET', 'SQLServer', 'Docs'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                const first = cat === 'All' ? CODE_DELIVERABLES[0] : CODE_DELIVERABLES.find(f => f.category === cat);
                if (first) setActiveFile(first);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#087F4F] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'ASPNET' ? 'ASP.NET Core' : cat === 'SQLServer' ? 'SQL Server' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Code Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: File Tree */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <FolderTree className="w-3.5 h-3.5 text-slate-500" />
            <span>Files Tree</span>
          </h3>

          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredFiles.map((file) => {
              const isSelected = file.path === activeFile.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setActiveFile(file)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all ${
                    isSelected
                      ? 'bg-emerald-50 border-[#087F4F] shadow-xs'
                      : 'border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileCode
                      className={`w-4 h-4 shrink-0 ${
                        file.category === 'Flutter'
                          ? 'text-blue-500'
                          : file.category === 'ASPNET'
                          ? 'text-purple-600'
                          : file.category === 'SQLServer'
                          ? 'text-rose-600'
                          : 'text-amber-600'
                      }`}
                    />
                    <span className="font-mono text-slate-800 font-bold truncate">
                      {file.path.split('/').pop()}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate pl-6">
                    {file.path}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Code Editor Preview */}
        <div className="lg:col-span-2 bg-[#0F172A] rounded-2xl overflow-hidden border border-slate-800 shadow-lg flex flex-col justify-between">
          {/* File Header Bar */}
          <div className="bg-[#1E293B] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="font-mono text-xs font-bold text-slate-200 ml-2">
                {activeFile.path}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                title="Copy Code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>

              <button
                onClick={handleDownload}
                className="px-2.5 py-1 bg-[#087F4F] hover:bg-[#07583D] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                title="Download File"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Description banner */}
          <div className="px-4 py-2 bg-slate-900 border-b border-slate-800/80 text-[11px] text-emerald-300 font-medium">
            {language === 'km' ? activeFile.descriptionKhmer : activeFile.descriptionEnglish}
          </div>

          {/* Code Viewer with Lines */}
          <div className="p-4 overflow-x-auto max-h-[550px] overflow-y-auto font-mono text-xs text-slate-200 leading-relaxed">
            <pre>
              <code>
                {activeFile.content.split('\n').map((line, idx) => (
                  <div key={idx} className="table-row">
                    <span className="table-cell pr-4 text-right select-none text-slate-600 font-mono text-[10px] w-8">
                      {idx + 1}
                    </span>
                    <span className="table-cell whitespace-pre">{line}</span>
                  </div>
                ))}
              </code>
            </pre>
          </div>

          {/* Code Footer */}
          <div className="px-4 py-2.5 bg-[#1E293B] border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>{activeFile.category} • Language: {activeFile.language}</span>
            <span>{activeFile.content.split('\n').length} lines</span>
          </div>
        </div>
      </div>
    </div>
  );
};
