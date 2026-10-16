import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Smartphone, Palette, Terminal, Play, CheckCircle2, ShieldCheck, Eye, Sparkles } from 'lucide-react';
import { ThemeMode } from '../types';

interface InteractiveTechSandboxProps {
  theme: ThemeMode;
}

type SandboxTab = 'fullstack' | 'uiux' | 'designsystem';

interface QueryPreset {
  id: string;
  name: string;
  method: string;
  endpoint: string;
  sqlQuery: string;
  responseBody: Record<string, unknown>;
  latencyMs: number;
}

const QUERY_PRESETS: QueryPreset[] = [
  {
    id: 'inventory',
    name: 'Real-Time Inventory Alert',
    method: 'GET',
    endpoint: '/api/v1/inventory/low-stock?threshold=15',
    sqlQuery: `SELECT item_sku, name, quantity, reorder_level 
FROM inventory_items 
WHERE quantity <= 15 
ORDER BY quantity ASC 
LIMIT 5;`,
    responseBody: {
      status: 'success',
      count: 2,
      latency_ms: 14,
      data: [
        { item_sku: 'SKU-802', name: 'Barista Whole Bean 1kg', quantity: 4, reorder_level: 15, status: 'CRITICAL_LOW' },
        { item_sku: 'SKU-419', name: 'Compostable Takeout Cups (L)', quantity: 12, reorder_level: 20, status: 'REORDER_TRIGGERED' }
      ]
    },
    latencyMs: 14
  },
  {
    id: 'order',
    name: 'Wholesale Order Dispatch',
    method: 'POST',
    endpoint: '/api/v1/orders/dispatch',
    sqlQuery: `UPDATE order_pipeline 
SET status = 'IN_TRANSIT', dispatched_at = NOW() 
WHERE order_id = 'ORD-2026-9041' 
RETURNING order_id, status, tracking_code;`,
    responseBody: {
      status: 'order_dispatched',
      order_id: 'ORD-2026-9041',
      tracking_code: 'TRK-MXP-884129',
      recipient: 'Artisan Bistro Manila',
      driver_assigned: 'Courier #14',
      eta: '45 mins'
    },
    latencyMs: 22
  },
  {
    id: 'auth',
    name: 'Role-Based Session Verification',
    method: 'POST',
    endpoint: '/api/v1/auth/verify-session',
    sqlQuery: `SELECT u.user_id, u.email, r.role_name, r.permissions 
FROM users u 
JOIN user_roles r ON u.role_id = r.role_id 
WHERE u.session_token = :token AND u.is_active = TRUE;`,
    responseBody: {
      authenticated: true,
      user_id: 'usr_ash_88',
      role: 'SUPER_ADMIN',
      permissions: ['inventory:write', 'orders:dispatch', 'reports:export'],
      session_expires_in: '12h'
    },
    latencyMs: 9
  }
];

export const InteractiveTechSandbox: React.FC<InteractiveTechSandboxProps> = ({ theme }) => {
  const isLight = theme === 'monochrome-light';

  const [activeTab, setActiveTab] = useState<SandboxTab>('fullstack');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('inventory');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<QueryPreset>(QUERY_PRESETS[0]);
  
  // UI/UX viewport state
  const [viewportMode, setViewportMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [showThumbZones, setShowThumbZones] = useState<boolean>(true);

  // Design system state
  const [selectedColor, setSelectedColor] = useState<{
    name: string;
    hex: string;
    role: string;
    contrastOnDark: string;
    contrastOnLight: string;
  }>({
    name: 'Terracotta Signal',
    hex: '#D95D39',
    role: 'Primary Action & Intent Focal',
    contrastOnDark: '5.2:1 (Pass AA)',
    contrastOnLight: '4.8:1 (Pass AA)'
  });

  const handleRunQuery = (preset: QueryPreset) => {
    setSelectedPresetId(preset.id);
    setIsRunning(true);
    setTimeout(() => {
      setExecutionResult(preset);
      setIsRunning(false);
    }, 280);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-10 max-w-3xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#d95d39] animate-pulse" />
          <span
            className={`text-xs font-mono uppercase tracking-widest ${
              isLight ? 'text-[#44403c] font-semibold' : 'text-zinc-400'
            }`}
          >
            Live Architecture & Engineering Sandbox
          </span>
        </div>
        <h3
          className={`text-2xl sm:text-4xl font-display font-extrabold tracking-tight ${
            isLight ? 'text-[#0c0a09]' : 'text-white'
          }`}
        >
          Explore How I Architect & Build
        </h3>
        <p
          className={`text-sm sm:text-base mt-2.5 leading-relaxed ${
            isLight ? 'text-[#292524]' : 'text-zinc-300'
          }`}
        >
          Test live database queries, mobile thumb ergonomics, and design system tokens
          to see the engineering and UX standards applied across every client build.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'fullstack', label: 'Full-Stack Database & API', icon: Database },
          { id: 'uiux', label: 'Mobile Ergonomics & Viewport', icon: Smartphone },
          { id: 'designsystem', label: 'Design System & Contrast Lab', icon: Palette }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as SandboxTab)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap border ${
                isActive
                  ? isLight
                    ? 'bg-[#0c0a09] text-white border-[#0c0a09] shadow-sm'
                    : 'bg-white text-zinc-950 border-white shadow-sm'
                  : isLight
                    ? 'bg-white text-[#44403c] border-[#ded8cc] hover:border-[#a8a29e]'
                    : 'bg-[#121218] text-zinc-400 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Box */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border transition-all shadow-xl ${
          isLight
            ? 'bg-white border-[#ded8cc] text-[#0c0a09]'
            : 'bg-[#101015] border-zinc-800 text-white'
        }`}
      >
        {activeTab === 'fullstack' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4
                  className={`text-lg font-display font-bold ${
                    isLight ? 'text-[#0c0a09]' : 'text-white'
                  }`}
                >
                  Live SQL Query & API Endpoint Dispatch
                </h4>
                <p
                  className={`text-xs mt-1 ${
                    isLight ? 'text-[#44403c]' : 'text-zinc-400'
                  }`}
                >
                  Select a business workflow below to simulate SQL execution and API payload response.
                </p>
              </div>

              {/* Presets */}
              <div className="flex items-center gap-2 flex-wrap">
                {QUERY_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleRunQuery(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border cursor-pointer ${
                      selectedPresetId === p.id
                        ? 'bg-[#d95d39] text-white border-[#d95d39]'
                        : isLight
                          ? 'bg-[#f8f5ee] text-[#1c1917] border-[#ded8cc] hover:border-[#a8a29e]'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Split Screen: SQL Query on Left, Response JSON on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left: Terminal SQL */}
              <div className="rounded-2xl border border-zinc-800 bg-[#09090c] p-4 text-xs font-mono text-zinc-300 space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-[#d95d39]" />
                    <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold">
                      Prepared SQL Statement
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                    PostgreSQL / MySQL
                  </span>
                </div>

                <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
                  <span className="text-[#d95d39] font-bold">{executionResult.method}</span>
                  <span className="text-zinc-300">{executionResult.endpoint}</span>
                </div>

                <pre className="text-emerald-400 text-xs overflow-x-auto p-2.5 rounded bg-black/50 border border-zinc-900 leading-relaxed font-mono">
                  {executionResult.sqlQuery}
                </pre>

                <div className="flex items-center justify-between pt-1 text-[11px] text-zinc-500">
                  <span>Zero SQL injection risk (Parameterized)</span>
                  <button
                    type="button"
                    disabled={isRunning}
                    onClick={() => handleRunQuery(executionResult)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#d95d39] hover:bg-[#c24e2b] text-white font-bold transition-all cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>{isRunning ? 'Executing...' : 'Re-run Query'}</span>
                  </button>
                </div>
              </div>

              {/* Right: API Response JSON */}
              <div className="rounded-2xl border border-zinc-800 bg-[#09090c] p-4 text-xs font-mono text-zinc-300 space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold">
                      Response Payload (200 OK)
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-bold">
                    {isRunning ? 'Calculating...' : `${executionResult.latencyMs} ms`}
                  </span>
                </div>

                <pre className="text-zinc-200 text-xs overflow-x-auto p-2.5 rounded bg-black/50 border border-zinc-900 leading-relaxed font-mono max-h-56">
                  {JSON.stringify(executionResult.responseBody, null, 2)}
                </pre>

                <div className="flex items-center gap-2 pt-1 text-[11px] text-zinc-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Strict schema validation with JWT session expiry</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'uiux' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4
                  className={`text-lg font-display font-bold ${
                    isLight ? 'text-[#0c0a09]' : 'text-white'
                  }`}
                >
                  Ergonomic Mobile-First Layout & Thumb Zone Analysis
                </h4>
                <p
                  className={`text-xs mt-1 ${
                    isLight ? 'text-[#44403c]' : 'text-zinc-400'
                  }`}
                >
                  Over 70% of bookings happen on phones. Here is how I position critical actions
                  in the easiest reach zone to minimize drop-off.
                </p>
              </div>

              {/* Viewport & Heatmap Toggles */}
              <div className="flex items-center gap-3 flex-wrap">
                <div
                  className={`flex items-center gap-1 p-1 rounded-xl border ${
                    isLight ? 'bg-[#f8f5ee] border-[#ded8cc]' : 'bg-zinc-900 border-zinc-800'
                  }`}
                >
                  {(['mobile', 'tablet', 'desktop'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setViewportMode(mode)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold capitalize transition-all cursor-pointer ${
                        viewportMode === mode
                          ? 'bg-[#d95d39] text-white'
                          : isLight
                            ? 'text-[#44403c] hover:text-[#0c0a09]'
                            : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setShowThumbZones(!showThumbZones)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    showThumbZones
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-500'
                      : isLight
                        ? 'bg-white border-[#ded8cc] text-[#44403c]'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Thumb Reach Overlay: {showThumbZones ? 'ON' : 'OFF'}</span>
                </button>
              </div>
            </div>

            {/* Simulated Device Frame */}
            <div className="flex justify-center py-4">
              <div
                className={`transition-all duration-300 rounded-3xl border-4 p-4 relative overflow-hidden shadow-2xl ${
                  isLight
                    ? 'border-zinc-800 bg-[#f8f5ee]'
                    : 'border-zinc-700 bg-[#09090c]'
                } ${
                  viewportMode === 'mobile'
                    ? 'w-full max-w-[340px] min-h-[460px]'
                    : viewportMode === 'tablet'
                      ? 'w-full max-w-[540px] min-h-[420px]'
                      : 'w-full max-w-[760px] min-h-[380px]'
                }`}
              >
                {/* Phone Speaker Notch if mobile */}
                {viewportMode === 'mobile' && (
                  <div className="w-24 h-3.5 bg-zinc-800 rounded-full mx-auto mb-4" />
                )}

                {/* Simulated Screen Content */}
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-300 dark:border-zinc-800">
                    <span className="font-display font-extrabold text-xs">ASH BOOKING</span>
                    <span className="text-[10px] font-mono opacity-70">10:45 AM</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1">
                    <div className="text-xs font-bold font-display">Select Service & Time</div>
                    <div className="text-[11px] opacity-70">3-tap streamlined checkout</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 text-[11px] font-bold text-center">
                      Oct 14 · 2:00 PM
                    </div>
                    <div className="p-2.5 rounded-lg border border-[#d95d39] bg-[#d95d39]/10 text-[11px] font-bold text-center text-[#d95d39]">
                      Oct 15 · 10:00 AM ✓
                    </div>
                  </div>

                  {/* Primary CTA placed at natural thumb bottom */}
                  <div className="pt-8">
                    <button
                      type="button"
                      className="w-full py-3.5 rounded-xl bg-[#d95d39] text-white font-mono font-bold text-xs shadow-md text-center block"
                    >
                      Confirm Booking ($85)
                    </button>
                    <div className="text-[10px] text-center mt-1.5 opacity-60 font-mono">
                      Placed in primary thumb sweep zone
                    </div>
                  </div>
                </div>

                {/* Heatmap Overlay */}
                {showThumbZones && viewportMode === 'mobile' && (
                  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 z-20">
                    <div className="p-2 rounded bg-rose-500/15 border border-rose-500/30 text-[10px] font-mono text-rose-500 text-center font-bold">
                      Hard to Reach Zone (Top 25% — secondary info only)
                    </div>
                    <div className="p-2 rounded bg-amber-500/15 border border-amber-500/30 text-[10px] font-mono text-amber-500 text-center font-bold">
                      Stretch Zone (Middle — dates & content cards)
                    </div>
                    <div className="p-2 rounded bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-mono text-emerald-500 text-center font-bold">
                      Natural Thumb Sweetspot (Bottom 35% — Primary Checkout CTA)
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'designsystem' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4
                  className={`text-lg font-display font-bold ${
                    isLight ? 'text-[#0c0a09]' : 'text-white'
                  }`}
                >
                  Color System Tokens & WCAG Contrast Validator
                </h4>
                <p
                  className={`text-xs mt-1 ${
                    isLight ? 'text-[#44403c]' : 'text-zinc-400'
                  }`}
                >
                  Every color in Ash’s visual palette is strictly calibrated for maximum
                  readability across dim restaurant lighting and outdoor sunlight.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  name: 'Terracotta Signal',
                  hex: '#D95D39',
                  role: 'Primary Action & Intent Focal',
                  contrastOnDark: '5.2:1 (Pass AA)',
                  contrastOnLight: '4.8:1 (Pass AA)'
                },
                {
                  name: 'Obsidian Stealth',
                  hex: '#09090B',
                  role: 'Dark Canvas Baseline',
                  contrastOnDark: '18.5:1 (Pass AAA)',
                  contrastOnLight: '18.5:1 (Pass AAA)'
                },
                {
                  name: 'Gallery Bone',
                  hex: '#FCFBF9',
                  role: 'Light Canvas Baseline',
                  contrastOnDark: '17.2:1 (Pass AAA)',
                  contrastOnLight: '17.2:1 (Pass AAA)'
                },
                {
                  name: 'Warm Concrete',
                  hex: '#DED8CC',
                  role: 'Architectural Grid Dividers',
                  contrastOnDark: '8.4:1 (Pass AA)',
                  contrastOnLight: '3.1:1 (Pass AA Large)'
                }
              ].map((color) => (
                <button
                  key={color.hex}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedColor.hex === color.hex
                      ? 'border-[#d95d39] ring-2 ring-[#d95d39]/20 shadow-md'
                      : isLight
                        ? 'border-[#ded8cc] bg-white hover:border-[#a8a29e]'
                        : 'border-zinc-800 bg-[#121218] hover:border-zinc-700'
                  }`}
                >
                  <div
                    className="w-full h-12 rounded-xl mb-3 border border-black/10"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="font-display font-bold text-sm">{color.name}</div>
                  <div className="text-xs font-mono opacity-60 mt-0.5">{color.hex}</div>
                  <div className="text-[11px] mt-2 opacity-80 line-clamp-1">{color.role}</div>
                </button>
              ))}
            </div>

            {/* Active Token Inspector */}
            <div
              className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isLight ? 'bg-[#f8f5ee] border-[#ded8cc]' : 'bg-black/60 border-zinc-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg border border-black/20 shrink-0"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider">
                    {selectedColor.name} ({selectedColor.hex})
                  </div>
                  <div className="text-xs opacity-75 mt-0.5">{selectedColor.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs font-mono">
                <div>
                  <span className="opacity-60 block text-[10px] uppercase">Dark Theme Contrast:</span>
                  <span className="font-bold text-emerald-500">{selectedColor.contrastOnDark}</span>
                </div>
                <div>
                  <span className="opacity-60 block text-[10px] uppercase">Light Theme Contrast:</span>
                  <span className="font-bold text-emerald-500">{selectedColor.contrastOnLight}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
