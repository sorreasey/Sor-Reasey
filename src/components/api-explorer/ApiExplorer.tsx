import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Terminal, Database, Play, CheckCircle2, Copy, Check, Server, ShieldCheck } from 'lucide-react';

export const ApiExplorer: React.FC = () => {
  const { students, classes, attendance, news, events, stats, language } = useApp();
  const [activeTab, setActiveTab] = useState<'rest' | 'sql'>('rest');
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('GET /api/students');
  const [sqlQuery, setSqlQuery] = useState<string>('SELECT s.StudentCode, s.FullName, s.Gender, c.ClassName, s.Status\nFROM Students s\nJOIN Classes c ON s.ClassId = c.ClassId\nORDER BY s.StudentId ASC;');
  const [sqlResult, setSqlResult] = useState<any[] | null>(null);
  const [copied, setCopied] = useState(false);

  // REST API Endpoints catalog
  const endpoints = [
    {
      method: 'GET',
      path: '/api/students',
      summary: 'Get all enrolled students with class & status filters',
      auth: 'Bearer JWT',
      response: students
    },
    {
      method: 'GET',
      path: '/api/students/S0001',
      summary: 'Retrieve single student profile by Student Code',
      auth: 'Bearer JWT',
      response: students[0]
    },
    {
      method: 'POST',
      path: '/api/students',
      summary: 'Register a new student with guardian contacts',
      auth: 'Bearer JWT (Admin/Staff)',
      requestBody: {
        fullName: 'Sok Samouth',
        fullNameKhmer: 'សុខ សាមុត',
        dateOfBirth: '2013-02-18',
        gender: 'Male',
        classId: 1,
        guardianName: 'Sok Vanna',
        guardianPhone: '+855 12 445 566',
        address: 'Salakanseng Village, Siem Reap'
      },
      response: {
        studentCode: 'S0009',
        fullName: 'Sok Samouth',
        status: 'Active',
        createdAt: new Date().toISOString()
      }
    },
    {
      method: 'GET',
      path: '/api/attendance?date=2024-05-15',
      summary: 'Get daily attendance sheet by date and class ID',
      auth: 'Bearer JWT',
      response: attendance
    },
    {
      method: 'GET',
      path: '/api/dashboard/stats',
      summary: 'Retrieve KPI metrics & donut distribution for admin',
      auth: 'Bearer JWT',
      response: stats
    },
    {
      method: 'POST',
      path: '/api/auth/login',
      summary: 'Staff authentication & JWT token generation',
      auth: 'Public',
      requestBody: {
        username: 'panha.keo',
        password: 'Password123!'
      },
      response: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwidXNlcm5hbWUiOiJwYW5oYS5rZW8iLCJyb2xlIjoiQWRtaW4ifQ...',
        role: 'Admin',
        expiresIn: '7 days'
      }
    }
  ];

  const currentEndpoint = endpoints.find(e => `${e.method} ${e.path}` === selectedEndpoint) || endpoints[0];

  const handleRunSql = () => {
    // Simulated SQL interpreter for presentation
    const results = students.map(s => ({
      StudentCode: s.id,
      FullName: s.fullName,
      Gender: s.gender,
      ClassName: s.className,
      GuardianPhone: s.guardianPhone,
      Status: s.status
    }));
    setSqlResult(results);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(currentEndpoint.response, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              ASP.NET Core 8 Web API
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
              SQL Server 2022
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1.5">
            {language === 'km' ? 'កុងសូលតេស្ត RESTful API & មូលដ្ឋានទិន្នន័យ SQL' : 'Backend API Explorer & SQL Server Studio'}
          </h2>
          <p className="text-xs text-slate-500">
            Interactive Swagger-style testing console and T-SQL database query sandbox
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('rest')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'rest' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Server className="w-3.5 h-3.5 text-blue-600" />
            <span>REST API (Swagger)</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('sql');
              if (!sqlResult) handleRunSql();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'sql' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-rose-600" />
            <span>SQL Server Studio</span>
          </button>
        </div>
      </div>

      {activeTab === 'rest' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Endpoints Catalog */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              API Endpoints
            </h3>
            <div className="space-y-1.5">
              {endpoints.map((ep) => {
                const isSelected = `${ep.method} ${ep.path}` === selectedEndpoint;
                return (
                  <button
                    key={`${ep.method} ${ep.path}`}
                    onClick={() => setSelectedEndpoint(`${ep.method} ${ep.path}`)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                      isSelected
                        ? 'bg-emerald-50/80 border-[#087F4F] shadow-xs'
                        : 'border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          ep.method === 'GET'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {ep.method}
                      </span>
                      <span className="font-mono font-semibold text-slate-800 truncate">
                        {ep.path}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{ep.summary}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Request & Live Response Preview */}
          <div className="lg:col-span-2 bg-[#0F172A] rounded-2xl p-5 text-slate-200 shadow-md font-mono text-xs flex flex-col justify-between">
            <div className="space-y-4">
              {/* Endpoint Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-bold ${
                      currentEndpoint.method === 'GET' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {currentEndpoint.method}
                  </span>
                  <span className="text-sm font-bold text-white">{currentEndpoint.path}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-sans px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>200 OK</span>
                  </span>
                  <button
                    onClick={handleCopyJson}
                    className="p-1 text-slate-400 hover:text-white rounded bg-slate-800"
                    title="Copy Response JSON"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Request Info */}
              <div className="text-[11px] text-slate-400 space-y-1">
                <p><span className="text-slate-500">Host:</span> https://localhost:7001</p>
                <p><span className="text-slate-500">Authorization:</span> {currentEndpoint.auth}</p>
              </div>

              {/* Request Body if POST */}
              {currentEndpoint.requestBody && (
                <div className="space-y-1">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Payload (JSON)</p>
                  <pre className="p-3 bg-slate-900 rounded-xl overflow-x-auto text-emerald-400 text-[11px] border border-slate-800">
                    {JSON.stringify(currentEndpoint.requestBody, null, 2)}
                  </pre>
                </div>
              )}

              {/* Response Body */}
              <div className="space-y-1">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Response Body (JSON)</p>
                <pre className="p-3 bg-slate-900 rounded-xl overflow-x-auto text-slate-300 text-[11px] max-h-72 overflow-y-auto border border-slate-800">
                  {JSON.stringify(currentEndpoint.response, null, 2)}
                </pre>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
              <span>ASP.NET Core Web API 8.0 • JWT Bearer Active</span>
              <span>Content-Type: application/json; charset=utf-8</span>
            </div>
          </div>
        </div>
      ) : (
        /* SQL Server Studio Sandbox */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-rose-600" />
              <h3 className="text-sm font-bold text-slate-900">
                SQL Server Query Editor • [AnjaliHouseSIMS].[dbo]
              </h3>
            </div>
            <button
              onClick={handleRunSql}
              className="px-4 py-1.5 bg-[#087F4F] hover:bg-[#07583D] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Execute (F5)</span>
            </button>
          </div>

          {/* SQL Editor Area */}
          <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 p-3 font-mono text-xs text-emerald-400">
            <textarea
              rows={4}
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              className="w-full bg-transparent text-emerald-300 font-mono focus:outline-none resize-none"
            ></textarea>
          </div>

          {/* SQL Query Results Table */}
          {sqlResult && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Query Results ({sqlResult.length} rows returned)</span>
                <span className="text-emerald-700 font-bold">Execution time: 0.002s</span>
              </div>
              <div className="border border-slate-200 rounded-xl overflow-hidden overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
                    <tr>
                      {Object.keys(sqlResult[0] || {}).map((col) => (
                        <th key={col} className="py-2.5 px-3">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sqlResult.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        {Object.values(row).map((val: any, cidx) => (
                          <td key={cidx} className="py-2 px-3 text-slate-800">
                            {String(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
