'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroCanvas — Abstract floating UI ecosystem
 * Performance-first: CSS animations + SVG, no external 3D lib required.
 * Lazy-rendered, reduced-motion safe, mobile friendly.
 */
export function HeroCanvas() {
  return (
    <div className="relative w-full h-full select-none" aria-hidden="true">
      {/* Main glowing orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse-slow"
        style={{ background: 'radial-gradient(circle, #00E5A8 0%, #3B82F6 60%, transparent 80%)' }}
      />

      {/* Floating UI Card 1 — Dashboard widget */}
      <div
        className="absolute top-[8%] left-[10%] w-44 glass-card rounded-xl p-3 shadow-card animate-float"
        style={{ animationDelay: '0s', animationDuration: '6s' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          <span className="text-[10px] text-text-secondary font-medium">Live Traffic</span>
        </div>
        <div className="text-lg font-bold font-heading text-text-primary">2,847</div>
        <div className="text-[10px] text-accent-green">↑ 18.3% this week</div>
        <div className="mt-2 h-1 bg-border rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-accent-green rounded-full" />
        </div>
      </div>

      {/* Floating UI Card 2 — Performance score */}
      <div
        className="absolute top-[12%] right-[8%] w-36 glass-card rounded-xl p-3 shadow-card animate-float"
        style={{ animationDelay: '1.5s', animationDuration: '7s' }}
      >
        <div className="text-[10px] text-text-secondary font-medium mb-1">Lighthouse</div>
        <div className="flex items-end gap-1">
          <span className="text-2xl font-bold font-heading text-accent-green">98</span>
          <span className="text-[10px] text-text-secondary pb-1">/100</span>
        </div>
        <div className="flex gap-1 mt-2">
          {[98, 95, 100, 97].map((score, i) => (
            <div key={i} className="flex-1 flex flex-col gap-0.5">
              <div
                className="rounded-sm"
                style={{
                  height: `${(score / 100) * 16}px`,
                  background: score >= 90 ? '#00E5A8' : '#F59E0B',
                  opacity: 0.8,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Center node grid — connected nodes SVG */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-30"
        viewBox="0 0 200 200"
        fill="none"
      >
        {/* Connection lines */}
        <line x1="100" y1="100" x2="40" y2="50" stroke="#00E5A8" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.6" />
        <line x1="100" y1="100" x2="160" y2="55" stroke="#3B82F6" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.6" />
        <line x1="100" y1="100" x2="30" y2="140" stroke="#00E5A8" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.4" />
        <line x1="100" y1="100" x2="170" y2="145" stroke="#3B82F6" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.4" />
        <line x1="100" y1="100" x2="100" y2="20" stroke="#00E5A8" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.5" />
        <line x1="100" y1="100" x2="100" y2="180" stroke="#3B82F6" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.5" />
        {/* Secondary connections */}
        <line x1="40" y1="50" x2="100" y2="20" stroke="#00E5A8" strokeWidth="0.5" opacity="0.3" />
        <line x1="160" y1="55" x2="100" y2="20" stroke="#3B82F6" strokeWidth="0.5" opacity="0.3" />
        <line x1="30" y1="140" x2="100" y2="180" stroke="#00E5A8" strokeWidth="0.5" opacity="0.3" />
        <line x1="170" y1="145" x2="100" y2="180" stroke="#3B82F6" strokeWidth="0.5" opacity="0.3" />

        {/* Nodes */}
        <circle cx="100" cy="100" r="6" fill="#00E5A8" opacity="0.9" />
        <circle cx="100" cy="100" r="12" fill="#00E5A8" opacity="0.1" />
        <circle cx="40" cy="50" r="4" fill="#3B82F6" opacity="0.8" />
        <circle cx="160" cy="55" r="4" fill="#00E5A8" opacity="0.8" />
        <circle cx="30" cy="140" r="3" fill="#3B82F6" opacity="0.7" />
        <circle cx="170" cy="145" r="3" fill="#00E5A8" opacity="0.7" />
        <circle cx="100" cy="20" r="3.5" fill="#3B82F6" opacity="0.8" />
        <circle cx="100" cy="180" r="3.5" fill="#00E5A8" opacity="0.8" />

        {/* Outer ring */}
        <circle cx="100" cy="100" r="70" stroke="#00E5A8" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.2" />
        <circle cx="100" cy="100" r="90" stroke="#3B82F6" strokeWidth="0.3" strokeDasharray="2 8" opacity="0.15" />
      </svg>

      {/* Floating UI Card 3 — Code component */}
      <div
        className="absolute bottom-[20%] left-[5%] w-48 glass-card rounded-xl p-3 shadow-card animate-float font-mono"
        style={{ animationDelay: '0.8s', animationDuration: '8s' }}
      >
        <div className="flex gap-1.5 mb-2">
          <div className="w-2 h-2 rounded-full bg-red-500/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <div className="w-2 h-2 rounded-full bg-accent-green/60" />
        </div>
        <div className="space-y-1 text-[9px] leading-relaxed">
          <div><span className="text-accent-blue">const</span> <span className="text-accent-green">studio</span> <span className="text-text-secondary">= {'{'}</span></div>
          <div className="pl-3"><span className="text-text-secondary">name:</span> <span className="text-yellow-400">'CM Studio'</span><span className="text-text-secondary">,</span></div>
          <div className="pl-3"><span className="text-text-secondary">focus:</span> <span className="text-yellow-400">'digital'</span><span className="text-text-secondary">,</span></div>
          <div className="pl-3"><span className="text-accent-green">build</span><span className="text-text-secondary">: () =&gt; 🚀</span></div>
          <div><span className="text-text-secondary">{'}'}</span></div>
        </div>
      </div>

      {/* Floating UI Card 4 — Project status */}
      <div
        className="absolute bottom-[18%] right-[6%] w-40 glass-card rounded-xl p-3 shadow-card animate-float"
        style={{ animationDelay: '2.5s', animationDuration: '6.5s' }}
      >
        <div className="text-[10px] text-text-secondary font-medium mb-2">Project Status</div>
        <div className="space-y-1.5">
          {[
            { label: 'Design', done: true },
            { label: 'Dev', done: true },
            { label: 'Launch', done: false },
          ].map(({ label, done }) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${done ? 'bg-accent-green/20 border border-accent-green/50' : 'border border-border-strong'}`}>
                {done && <div className="w-1.5 h-1.5 rounded-full bg-accent-green" />}
              </div>
              <span className={`text-[10px] ${done ? 'text-text-secondary line-through' : 'text-text-primary'}`}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating mini tag — Next.js */}
      <div
        className="absolute top-[38%] left-[2%] px-2.5 py-1 glass-card rounded-full text-[9px] font-medium text-accent-green border border-accent-green/20 animate-float"
        style={{ animationDelay: '1.2s', animationDuration: '9s' }}
      >
        Next.js
      </div>

      {/* Floating mini tag — TypeScript */}
      <div
        className="absolute top-[55%] right-[4%] px-2.5 py-1 glass-card rounded-full text-[9px] font-medium text-accent-blue border border-accent-blue/20 animate-float"
        style={{ animationDelay: '3s', animationDuration: '7.5s' }}
      >
        TypeScript
      </div>

      {/* Floating mini tag — SEO */}
      <div
        className="absolute top-[78%] left-[30%] px-2.5 py-1 glass-card rounded-full text-[9px] font-medium text-text-secondary border border-border animate-float"
        style={{ animationDelay: '0.5s', animationDuration: '8.5s' }}
      >
        SEO-First
      </div>

      {/* Wireframe rect decoration */}
      <div
        className="absolute top-[45%] left-[42%] w-20 h-12 rounded-lg border border-accent-green/15 animate-float"
        style={{ animationDelay: '4s', animationDuration: '10s' }}
      >
        <div className="absolute inset-2 border border-accent-green/10 rounded" />
      </div>
    </div>
  );
}
