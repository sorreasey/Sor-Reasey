/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { MobileFrame } from './components/mobile/MobileFrame';
import { AdminLayout } from './components/admin/AdminLayout';
import { ApiExplorer } from './components/api-explorer/ApiExplorer';
import { CodeHub } from './components/code-hub/CodeHub';
import { DocsGuide } from './components/docs/DocsGuide';

const AppContent: React.FC = () => {
  const { viewMode, language } = useApp();

  return (
    <div className="min-h-screen bg-[#F5F7F6] flex flex-col font-sans text-slate-800">
      <Header />

      <main className="flex-1">
        {viewMode === 'mobile' && <MobileFrame />}
        {viewMode === 'admin' && <AdminLayout />}
        {viewMode === 'api' && <ApiExplorer />}
        {viewMode === 'code' && <CodeHub />}
        {viewMode === 'docs' && <DocsGuide />}
      </main>

      {/* Global Application Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#087F4F]">Anjali House SIMS</span>
            <span>•</span>
            <span>Salakanseng Village, Siem Reap, Cambodia</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>Flutter 3.x</span>
            <span>•</span>
            <span>ASP.NET Core 8 Web API</span>
            <span>•</span>
            <span>Microsoft SQL Server</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
