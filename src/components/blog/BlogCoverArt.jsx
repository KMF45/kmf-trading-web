import React from 'react';

/* ============================================================
   BlogCoverArt — SVG cover art per blog category.
   viewBox: 800 × 450 (16:9). Pure SVG + inline <style>.
   Covers are self-contained so they can be serialized as
   standalone SVG strings (e.g. via renderToStaticMarkup) for
   OG images or static embedding.
   ============================================================ */

const V_W = 800;
const V_H = 450;

/* -------- Shared helpers -------- */

function Badge({ label }) {
  const chars = label.length;
  const width = Math.max(96, chars * 8 + 32);
  return (
    <g>
      <rect
        x={24}
        y={24}
        width={width}
        height={30}
        rx={15}
        ry={15}
        fill="rgba(0,0,0,0.55)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
      />
      <text
        x={24 + width / 2}
        y={43.5}
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="11"
        fontWeight="700"
        letterSpacing="2"
        style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' }}
      >
        {label.toUpperCase()}
      </text>
    </g>
  );
}

function Watermark() {
  return (
    <text
      x={V_W - 30}
      y={V_H - 22}
      textAnchor="end"
      fill="#FFFFFF"
      opacity="0.15"
      fontSize="14"
      fontWeight="800"
      letterSpacing="3"
      style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' }}
    >
      K·M·F
    </text>
  );
}

function SvgFrame({ children, ariaLabel }) {
  return (
    <svg
      viewBox={`0 0 ${V_W} ${V_H}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
    >
      {children}
    </svg>
  );
}

/* ============================================================
   1. PSYCHOLOGY — violet → pink, brain glyph, pulse rings
   ============================================================ */

function CoverPsychology() {
  return (
    <SvgFrame ariaLabel="Psychology category cover">
      <defs>
        <linearGradient id="psyBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1A0B2E" />
          <stop offset="55%" stopColor="#3B0764" />
          <stop offset="100%" stopColor="#831843" />
        </linearGradient>
        <radialGradient id="psyHalo" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#A855F7" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="psyBrain" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F9A8D4" />
          <stop offset="50%" stopColor="#E879F9" />
          <stop offset="100%" stopColor="#C4B5FD" />
        </linearGradient>
        <filter id="psyGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <style>{`
        .psy-ring { transform-origin: 400px 225px; opacity: 0; animation: psyPulse 4s ease-out infinite; }
        .psy-ring.r2 { animation-delay: 1.3s; }
        .psy-ring.r3 { animation-delay: 2.6s; }
        @keyframes psyPulse {
          0%   { transform: scale(0.3); opacity: 0; }
          20%  { opacity: 0.55; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .psy-particle { animation: psyDrift 7s linear infinite; }
        @keyframes psyDrift {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          10%  { opacity: 0.8; }
          90%  { opacity: 0.8; }
          100% { transform: translateY(-220px) translateX(8px); opacity: 0; }
        }
        .psy-brain { transform-origin: 400px 225px; animation: psyBreathe 5s ease-in-out infinite; }
        @keyframes psyBreathe {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.035); }
        }
      `}</style>

      {/* Background */}
      <rect width={V_W} height={V_H} fill="url(#psyBg)" />
      <rect width={V_W} height={V_H} fill="url(#psyHalo)" />

      {/* Diagonal accent lines — top right */}
      <g stroke="#F9A8D4" strokeWidth="1" opacity="0.22">
        <line x1="640" y1="10" x2="820" y2="190" />
        <line x1="680" y1="10" x2="820" y2="150" />
        <line x1="720" y1="10" x2="820" y2="110" />
        <line x1="760" y1="10" x2="820" y2="70" />
      </g>

      {/* Pulse rings */}
      <g fill="none" stroke="#C4B5FD" strokeWidth="1.5">
        <circle className="psy-ring" cx="400" cy="225" r="60" />
        <circle className="psy-ring r2" cx="400" cy="225" r="60" />
        <circle className="psy-ring r3" cx="400" cy="225" r="60" />
      </g>

      {/* Floating particles */}
      <g fill="#F9A8D4">
        <circle className="psy-particle" cx="150" cy="380" r="3" style={{ animationDelay: '0s' }} />
        <circle className="psy-particle" cx="210" cy="400" r="2" style={{ animationDelay: '1.1s' }} />
        <circle className="psy-particle" cx="280" cy="390" r="2.5" style={{ animationDelay: '2.2s' }} />
        <circle className="psy-particle" cx="520" cy="410" r="3" style={{ animationDelay: '0.8s' }} />
        <circle className="psy-particle" cx="580" cy="395" r="2" style={{ animationDelay: '2.8s' }} />
        <circle className="psy-particle" cx="640" cy="405" r="2.5" style={{ animationDelay: '3.5s' }} />
        <circle className="psy-particle" cx="340" cy="405" r="2" style={{ animationDelay: '4.2s' }} />
        <circle className="psy-particle" cx="470" cy="398" r="2.5" style={{ animationDelay: '5.6s' }} />
      </g>

      {/* Brain glyph */}
      <g className="psy-brain" filter="url(#psyGlow)" transform="translate(400 225)">
        {/* Left hemisphere */}
        <path
          d="M -6 -72
             C -34 -80, -70 -62, -78 -30
             C -96 -22, -98 18, -80 30
             C -86 58, -62 82, -30 80
             C -14 82, -6 72, -6 60 Z"
          fill="url(#psyBrain)"
          fillOpacity="0.18"
          stroke="url(#psyBrain)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Right hemisphere */}
        <path
          d="M 6 -72
             C 34 -80, 70 -62, 78 -30
             C 96 -22, 98 18, 80 30
             C 86 58, 62 82, 30 80
             C 14 82, 6 72, 6 60 Z"
          fill="url(#psyBrain)"
          fillOpacity="0.18"
          stroke="url(#psyBrain)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Central division */}
        <path d="M 0 -64 L 0 72" stroke="#F9A8D4" strokeWidth="1.5" opacity="0.65" strokeLinecap="round" />
        {/* Gyri (folds) left */}
        <path d="M -62 -40 Q -50 -28, -38 -40 T -14 -40" fill="none" stroke="#F9A8D4" strokeWidth="1.6" opacity="0.7" strokeLinecap="round" />
        <path d="M -68 -10 Q -54 2, -40 -10 T -14 -10" fill="none" stroke="#F9A8D4" strokeWidth="1.6" opacity="0.7" strokeLinecap="round" />
        <path d="M -66 22 Q -52 34, -38 22 T -14 22" fill="none" stroke="#F9A8D4" strokeWidth="1.6" opacity="0.7" strokeLinecap="round" />
        <path d="M -56 50 Q -44 60, -32 50 T -14 50" fill="none" stroke="#F9A8D4" strokeWidth="1.6" opacity="0.6" strokeLinecap="round" />
        {/* Gyri right */}
        <path d="M 14 -40 Q 26 -28, 38 -40 T 62 -40" fill="none" stroke="#C4B5FD" strokeWidth="1.6" opacity="0.7" strokeLinecap="round" />
        <path d="M 14 -10 Q 28 2, 40 -10 T 68 -10" fill="none" stroke="#C4B5FD" strokeWidth="1.6" opacity="0.7" strokeLinecap="round" />
        <path d="M 14 22 Q 28 34, 40 22 T 66 22" fill="none" stroke="#C4B5FD" strokeWidth="1.6" opacity="0.7" strokeLinecap="round" />
        <path d="M 14 50 Q 26 60, 38 50 T 56 50" fill="none" stroke="#C4B5FD" strokeWidth="1.6" opacity="0.6" strokeLinecap="round" />
        {/* Stem */}
        <path d="M -8 78 Q 0 92, 8 78" fill="none" stroke="url(#psyBrain)" strokeWidth="3" strokeLinecap="round" />
      </g>

      <Badge label="Psychology" />
      <Watermark />
    </SvgFrame>
  );
}

/* ============================================================
   2. RISK MANAGEMENT — emerald → teal, shield + checkmark
   ============================================================ */

function CoverRiskManagement() {
  return (
    <SvgFrame ariaLabel="Risk Management category cover">
      <defs>
        <linearGradient id="rskBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#022C22" />
          <stop offset="55%" stopColor="#064E3B" />
          <stop offset="100%" stopColor="#0C4A6E" />
        </linearGradient>
        <radialGradient id="rskHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rskShield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5EEAD4" />
          <stop offset="60%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <pattern id="rskHex" x="0" y="0" width="56" height="48.5" patternUnits="userSpaceOnUse">
          <path
            d="M 14 0 L 42 0 L 56 24.25 L 42 48.5 L 14 48.5 L 0 24.25 Z"
            fill="none"
            stroke="#5EEAD4"
            strokeWidth="0.8"
            opacity="0.12"
          />
        </pattern>
        <filter id="rskGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <style>{`
        .rsk-shield { transform-origin: 400px 225px; animation: rskPulse 3s ease-in-out infinite; }
        @keyframes rskPulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.05); }
        }
        .rsk-check { stroke-dasharray: 120; stroke-dashoffset: 120; animation: rskDraw 1.6s 0.3s ease-out forwards; }
        @keyframes rskDraw { to { stroke-dashoffset: 0; } }
      `}</style>

      {/* Background */}
      <rect width={V_W} height={V_H} fill="url(#rskBg)" />
      <rect width={V_W} height={V_H} fill="url(#rskHex)" />
      <rect width={V_W} height={V_H} fill="url(#rskHalo)" />

      {/* Dotted inner frame */}
      <rect
        x="22"
        y="22"
        width={V_W - 44}
        height={V_H - 44}
        rx="14"
        fill="none"
        stroke="#5EEAD4"
        strokeWidth="1"
        strokeDasharray="2 6"
        opacity="0.2"
      />

      {/* Shield glyph */}
      <g className="rsk-shield" filter="url(#rskGlow)" transform="translate(400 225)">
        <path
          d="M 0 -96
             L 72 -72
             L 72 14
             C 72 52, 40 88, 0 104
             C -40 88, -72 52, -72 14
             L -72 -72 Z"
          fill="url(#rskShield)"
          stroke="#A7F3D0"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Inner highlight */}
        <path
          d="M 0 -82
             L 60 -62
             L 60 12
             C 60 44, 34 76, 0 90
             C -34 76, -60 44, -60 12
             L -60 -62 Z"
          fill="none"
          stroke="#ECFDF5"
          strokeWidth="1"
          opacity="0.35"
        />
        {/* Checkmark */}
        <path
          className="rsk-check"
          d="M -28 6 L -6 30 L 32 -18"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <Badge label="Risk Management" />
      <Watermark />
    </SvgFrame>
  );
}

/* ============================================================
   3. STATISTICS — cyan → blue, animated bars + curve
   ============================================================ */

function CoverStatistics() {
  return (
    <SvgFrame ariaLabel="Statistics category cover">
      <defs>
        <linearGradient id="statBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#082F49" />
          <stop offset="55%" stopColor="#0C4A6E" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id="statBar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <pattern id="statGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#67E8F9" strokeWidth="0.6" opacity="0.1" />
        </pattern>
        <filter id="statGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <style>{`
        .stat-bar { transform-origin: bottom; transform-box: fill-box; animation: statGrow 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; transform: scaleY(0); }
        .stat-bar.b1 { animation-delay: 0.15s; }
        .stat-bar.b2 { animation-delay: 0.35s; }
        .stat-bar.b3 { animation-delay: 0.55s; }
        @keyframes statGrow { to { transform: scaleY(1); } }
        .stat-curve { stroke-dasharray: 500; stroke-dashoffset: 500; animation: statDraw 2.4s 0.9s ease-out forwards; }
        @keyframes statDraw { to { stroke-dashoffset: 0; } }
        .stat-dot { opacity: 0; animation: statPop 0.4s ease-out forwards; }
        .stat-dot.d1 { animation-delay: 1.5s; }
        .stat-dot.d2 { animation-delay: 1.8s; }
        .stat-dot.d3 { animation-delay: 2.1s; }
        .stat-dot.d4 { animation-delay: 2.4s; }
        .stat-dot.d5 { animation-delay: 2.7s; }
        .stat-dot.d6 { animation-delay: 3.0s; }
        @keyframes statPop { to { opacity: 1; } }
      `}</style>

      {/* Background */}
      <rect width={V_W} height={V_H} fill="url(#statBg)" />
      <rect width={V_W} height={V_H} fill="url(#statGrid)" />

      {/* Axis hint */}
      <line x1="150" y1="320" x2="650" y2="320" stroke="#67E8F9" strokeWidth="1" opacity="0.2" />
      <line x1="150" y1="140" x2="150" y2="320" stroke="#67E8F9" strokeWidth="1" opacity="0.2" />

      {/* Bars */}
      <g filter="url(#statGlow)">
        <rect className="stat-bar b1" x="250" y="250" width="48" height="70"  rx="4" fill="url(#statBar)" />
        <rect className="stat-bar b2" x="325" y="200" width="48" height="120" rx="4" fill="url(#statBar)" />
        <rect className="stat-bar b3" x="400" y="140" width="48" height="180" rx="4" fill="url(#statBar)" />
        {/* Ghost bar (the peak — gold accent) */}
        <rect className="stat-bar b3" x="475" y="170" width="48" height="150" rx="4" fill="#F59E0B" opacity="0.85" />
      </g>

      {/* Price curve at bottom */}
      <g>
        <path
          className="stat-curve"
          d="M 150 390
             L 210 380
             L 270 385
             L 330 372
             L 390 360
             L 450 352
             L 510 340
             L 570 330
             L 630 320
             L 650 315"
          fill="none"
          stroke="#67E8F9"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle className="stat-dot d1" cx="210" cy="380" r="3.5" fill="#67E8F9" />
        <circle className="stat-dot d2" cx="330" cy="372" r="3.5" fill="#67E8F9" />
        <circle className="stat-dot d3" cx="390" cy="360" r="3.5" fill="#67E8F9" />
        <circle className="stat-dot d4" cx="510" cy="340" r="3.5" fill="#67E8F9" />
        <circle className="stat-dot d5" cx="570" cy="330" r="3.5" fill="#67E8F9" />
        <circle className="stat-dot d6" cx="630" cy="320" r="3.5" fill="#67E8F9" />
      </g>

      <Badge label="Statistics" />
      <Watermark />
    </SvgFrame>
  );
}

/* ============================================================
   4. IMPROVEMENT — amber → orange, rocket + rays
   ============================================================ */

function CoverImprovement() {
  return (
    <SvgFrame ariaLabel="Improvement category cover">
      <defs>
        <linearGradient id="impBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#451A03" />
          <stop offset="55%" stopColor="#7C2D12" />
          <stop offset="100%" stopColor="#9A3412" />
        </linearGradient>
        <radialGradient id="impHalo" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FCD34D" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="impRocket" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="55%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="impFlame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FEF9C3" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
        </linearGradient>
        <pattern id="impStripes" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="18" stroke="#FCD34D" strokeWidth="0.8" opacity="0.08" />
        </pattern>
        <filter id="impGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <style>{`
        .imp-rocket { transform-origin: 400px 230px; animation: impBob 2.5s ease-in-out infinite; }
        @keyframes impBob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-7px); }
        }
        .imp-flame { transform-origin: 400px 300px; animation: impFlicker 0.6s ease-in-out infinite; }
        @keyframes impFlicker {
          0%, 100% { transform: scaleY(1); opacity: 0.95; }
          50%      { transform: scaleY(1.2); opacity: 0.75; }
        }
        .imp-ray { transform-origin: 400px 225px; animation: impRays 6s linear infinite; }
        @keyframes impRays {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      {/* Background */}
      <rect width={V_W} height={V_H} fill="url(#impBg)" />
      <rect width={V_W} height={V_H} fill="url(#impStripes)" />
      <rect width={V_W} height={V_H} fill="url(#impHalo)" />

      {/* Rotating rays behind rocket */}
      <g className="imp-ray" opacity="0.18" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round">
        <line x1="400" y1="100" x2="400" y2="140" />
        <line x1="400" y1="310" x2="400" y2="350" />
        <line x1="280" y1="225" x2="320" y2="225" />
        <line x1="480" y1="225" x2="520" y2="225" />
        <line x1="320" y1="145" x2="348" y2="173" />
        <line x1="480" y1="145" x2="452" y2="173" />
        <line x1="320" y1="305" x2="348" y2="277" />
        <line x1="480" y1="305" x2="452" y2="277" />
      </g>

      {/* Static starburst accent */}
      <g opacity="0.28">
        {[...Array(16)].map((_, i) => {
          const angle = (i * Math.PI * 2) / 16;
          const x1 = 400 + Math.cos(angle) * 145;
          const y1 = 225 + Math.sin(angle) * 145;
          const x2 = 400 + Math.cos(angle) * 180;
          const y2 = 225 + Math.sin(angle) * 180;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FEF3C7" strokeWidth="1" strokeLinecap="round" />;
        })}
      </g>

      {/* Rocket */}
      <g className="imp-rocket" filter="url(#impGlow)">
        {/* Flames */}
        <g className="imp-flame">
          <path
            d="M 380 278
               Q 372 310, 388 330
               Q 400 316, 400 340
               Q 400 316, 412 330
               Q 428 310, 420 278 Z"
            fill="url(#impFlame)"
          />
        </g>
        {/* Body */}
        <path
          d="M 400 150
             L 430 200
             L 430 270
             L 370 270
             L 370 200 Z"
          fill="url(#impRocket)"
          stroke="#FEF3C7"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Tip highlight */}
        <path d="M 370 200 L 400 150 L 430 200 Z" fill="#FEF3C7" opacity="0.35" />
        {/* Window */}
        <circle cx="400" cy="215" r="12" fill="#0C4A6E" stroke="#FEF3C7" strokeWidth="2.5" />
        <circle cx="396" cy="211" r="4" fill="#FEF3C7" opacity="0.5" />
        {/* Fins */}
        <path
          d="M 370 250 L 346 290 L 370 278 Z"
          fill="url(#impRocket)"
          stroke="#FEF3C7"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M 430 250 L 454 290 L 430 278 Z"
          fill="url(#impRocket)"
          stroke="#FEF3C7"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Body detail */}
        <line x1="385" y1="235" x2="385" y2="265" stroke="#9A3412" strokeWidth="1.5" opacity="0.6" />
        <line x1="415" y1="235" x2="415" y2="265" stroke="#9A3412" strokeWidth="1.5" opacity="0.6" />
      </g>

      <Badge label="Improvement" />
      <Watermark />
    </SvgFrame>
  );
}

/* ============================================================
   5. DISCIPLINE — gold → red, checkmark circle
   ============================================================ */

function CoverDiscipline() {
  return (
    <SvgFrame ariaLabel="Discipline category cover">
      <defs>
        <linearGradient id="disBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#422006" />
          <stop offset="55%" stopColor="#7C2D12" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </linearGradient>
        <radialGradient id="disHalo" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor="#FACC15" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#EAB308" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="disRing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <filter id="disGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <style>{`
        .dis-ring { stroke-dasharray: 502; stroke-dashoffset: 502; animation: disDraw 2s ease-out forwards; }
        @keyframes disDraw { to { stroke-dashoffset: 0; } }
        .dis-check { stroke-dasharray: 160; stroke-dashoffset: 160; animation: disCheck 0.9s 1.6s ease-out forwards; }
        @keyframes disCheck { to { stroke-dashoffset: 0; } }
        .dis-concentric { transform-origin: 400px 225px; animation: disSpin 40s linear infinite; }
        @keyframes disSpin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Background */}
      <rect width={V_W} height={V_H} fill="url(#disBg)" />
      <rect width={V_W} height={V_H} fill="url(#disHalo)" />

      {/* Concentric circles background */}
      <g className="dis-concentric" fill="none" stroke="#FDE047" opacity="0.12">
        <circle cx="400" cy="225" r="130" strokeWidth="1" />
        <circle cx="400" cy="225" r="170" strokeWidth="1" strokeDasharray="3 8" />
        <circle cx="400" cy="225" r="210" strokeWidth="1" />
        <circle cx="400" cy="225" r="250" strokeWidth="1" strokeDasharray="2 10" />
      </g>

      {/* Corner ticks */}
      <g stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" opacity="0.45">
        <path d="M 56 80 L 66 90 L 86 70" fill="none" />
        <path d="M 714 80 L 724 90 L 744 70" fill="none" />
        <path d="M 56 380 L 66 390 L 86 370" fill="none" />
      </g>

      {/* Main ring + check */}
      <g filter="url(#disGlow)">
        <circle
          className="dis-ring"
          cx="400"
          cy="225"
          r="80"
          fill="none"
          stroke="url(#disRing)"
          strokeWidth="8"
          strokeLinecap="round"
          transform="rotate(-90 400 225)"
        />
        <path
          className="dis-check"
          d="M 360 225 L 390 255 L 442 200"
          fill="none"
          stroke="#FEF9C3"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <Badge label="Discipline" />
      <Watermark />
    </SvgFrame>
  );
}

/* ============================================================
   6. APP REVIEWS — sky → purple, phone + stars + shimmer
   ============================================================ */

function CoverAppReviews() {
  return (
    <SvgFrame ariaLabel="App Reviews category cover">
      <defs>
        <linearGradient id="appBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0C4A6E" />
          <stop offset="55%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#581C87" />
        </linearGradient>
        <radialGradient id="appHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="appPhone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E0E7FF" />
          <stop offset="100%" stopColor="#A5B4FC" />
        </linearGradient>
        <linearGradient id="appScreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#9333EA" />
        </linearGradient>
        <linearGradient id="appShimmer" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <filter id="appGlow" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="appPhoneClip">
          <rect x="358" y="130" width="84" height="200" rx="14" />
        </clipPath>
      </defs>

      <style>{`
        .app-card-1 { transform-origin: 175px 150px; animation: appFloat1 7s ease-in-out infinite; }
        .app-card-2 { transform-origin: 620px 120px; animation: appFloat2 6s ease-in-out infinite; }
        .app-card-3 { transform-origin: 150px 340px; animation: appFloat3 8s ease-in-out infinite; }
        .app-card-4 { transform-origin: 640px 340px; animation: appFloat1 5.5s ease-in-out infinite; }
        .app-card-5 { transform-origin: 240px 270px; animation: appFloat2 7.5s ease-in-out infinite; }
        @keyframes appFloat1 {
          0%, 100% { transform: translateY(0) rotate(-4deg); }
          50%      { transform: translateY(-10px) rotate(-2deg); }
        }
        @keyframes appFloat2 {
          0%, 100% { transform: translateY(0) rotate(5deg); }
          50%      { transform: translateY(8px) rotate(3deg); }
        }
        @keyframes appFloat3 {
          0%, 100% { transform: translateY(0) rotate(-7deg); }
          50%      { transform: translateY(-6px) rotate(-4deg); }
        }
        .app-shimmer { animation: appSweep 4s ease-in-out infinite; }
        @keyframes appSweep {
          0%   { transform: translateX(-120px); opacity: 0; }
          40%  { opacity: 0.9; }
          100% { transform: translateX(120px); opacity: 0; }
        }
        .app-star { transform-origin: center; animation: appStarPop 0.4s ease-out forwards; opacity: 0; }
        .app-star.s1 { animation-delay: 0.4s; }
        .app-star.s2 { animation-delay: 0.55s; }
        .app-star.s3 { animation-delay: 0.7s; }
        .app-star.s4 { animation-delay: 0.85s; }
        .app-star.s5 { animation-delay: 1.0s; }
        @keyframes appStarPop { from { opacity: 0; transform: scale(0.4); } to { opacity: 1; transform: scale(1); } }
      `}</style>

      {/* Background */}
      <rect width={V_W} height={V_H} fill="url(#appBg)" />
      <rect width={V_W} height={V_H} fill="url(#appHalo)" />

      {/* Floating UI "cards" */}
      <g opacity="0.7">
        <rect className="app-card-1" x="140" y="100" width="90" height="60" rx="8" fill="#0EA5E9" opacity="0.22" stroke="#7DD3FC" strokeWidth="1" />
        <rect className="app-card-2" x="580" y="80" width="100" height="56" rx="8" fill="#9333EA" opacity="0.22" stroke="#C4B5FD" strokeWidth="1" />
        <rect className="app-card-3" x="110" y="305" width="80" height="56" rx="8" fill="#38BDF8" opacity="0.22" stroke="#7DD3FC" strokeWidth="1" />
        <rect className="app-card-4" x="600" y="305" width="90" height="60" rx="8" fill="#A855F7" opacity="0.22" stroke="#C4B5FD" strokeWidth="1" />
        <rect className="app-card-5" x="200" y="240" width="70" height="50" rx="6" fill="#38BDF8" opacity="0.18" stroke="#7DD3FC" strokeWidth="1" />
      </g>

      {/* Phone */}
      <g filter="url(#appGlow)" transform="translate(0 0)">
        {/* Body */}
        <rect x="350" y="122" width="100" height="216" rx="18" fill="url(#appPhone)" stroke="#1E293B" strokeWidth="2" />
        {/* Screen */}
        <rect x="358" y="130" width="84" height="200" rx="12" fill="url(#appScreen)" />
        {/* Notch */}
        <rect x="385" y="130" width="30" height="6" rx="3" fill="#0F172A" />
        {/* Home indicator */}
        <rect x="382" y="320" width="36" height="3" rx="1.5" fill="#FFFFFF" opacity="0.5" />
        {/* App content lines on screen */}
        <rect x="368" y="146" width="64" height="6" rx="3" fill="#FFFFFF" opacity="0.35" />
        <rect x="368" y="158" width="44" height="4" rx="2" fill="#FFFFFF" opacity="0.25" />
        <rect x="368" y="178" width="64" height="38" rx="5" fill="#FFFFFF" opacity="0.12" />
        <rect x="368" y="224" width="30" height="30" rx="5" fill="#FFFFFF" opacity="0.18" />
        <rect x="402" y="224" width="30" height="30" rx="5" fill="#FFFFFF" opacity="0.18" />
        {/* Shimmer sweep on screen */}
        <g clipPath="url(#appPhoneClip)">
          <rect className="app-shimmer" x="350" y="130" width="60" height="200" fill="url(#appShimmer)" />
        </g>
        {/* Stars row below phone */}
        <g transform="translate(400 360)">
          {[-32, -16, 0, 16, 32].map((dx, i) => (
            <polygon
              key={i}
              className={`app-star s${i + 1}`}
              points="0,-9 2.65,-3.65 8.55,-2.78 4.28,1.06 5.29,7.04 0,4.5 -5.29,7.04 -4.28,1.06 -8.55,-2.78 -2.65,-3.65"
              fill="#FDE047"
              transform={`translate(${dx} 0)`}
              stroke="#FBBF24"
              strokeWidth="0.5"
            />
          ))}
        </g>
      </g>

      <Badge label="App Reviews" />
      <Watermark />
    </SvgFrame>
  );
}

/* ============================================================
   Public API
   ============================================================ */

export const CATEGORY_COVERS = {
  Psychology: CoverPsychology,
  'Risk Management': CoverRiskManagement,
  Statistics: CoverStatistics,
  Improvement: CoverImprovement,
  Discipline: CoverDiscipline,
  'App Reviews': CoverAppReviews,
};

function BlogCoverArt({ category, className, style }) {
  const Cover = CATEGORY_COVERS[category] || CoverStatistics;
  return (
    <div
      className={className}
      style={{ width: '100%', height: '100%', lineHeight: 0, ...style }}
    >
      <Cover />
    </div>
  );
}

export default BlogCoverArt;

/* ============================================================
   Demo — renders all 6 covers in a 3×2 grid with labels.
   Useful for visual QA: import and render anywhere.
   ============================================================ */

export function BlogCoverArtDemo() {
  const categories = Object.keys(CATEGORY_COVERS);
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16,
        padding: 24,
        background: '#0F1115',
        minHeight: '100vh',
      }}
    >
      {categories.map((cat) => (
        <div key={cat} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div
            style={{
              aspectRatio: '16 / 9',
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              background: '#1A1D24',
            }}
          >
            <BlogCoverArt category={cat} />
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: '#F0F4FF',
              letterSpacing: 1,
              textTransform: 'uppercase',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            {cat}
          </div>
        </div>
      ))}
    </div>
  );
}
