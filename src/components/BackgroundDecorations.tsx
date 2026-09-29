import React from 'react';
import { Shield, Fingerprint, Search, Compass, FileText, Sparkles, Zap, Radio } from 'lucide-react';

export const BackgroundDecorations: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Base Grid Blueprint Matrix with Multi-tone chromatic dots */}
      <div className="absolute inset-0 bg-noir-grid opacity-75" />

      {/* 2. Top-Center Warm Amber / Gold Desk Spotlight */}
      <div 
        className="absolute -top-36 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-amber-500/25 via-orange-600/15 to-transparent rounded-full blur-3xl opacity-80"
      />

      {/* 3. Top-Left Electric Cyan & Teal Cyber Light */}
      <div 
        className="absolute -top-24 -left-20 w-[650px] h-[650px] bg-gradient-to-br from-cyan-500/22 via-teal-600/12 to-transparent rounded-full blur-3xl"
      />

      {/* 4. Top-Right Neon Violet & Electric Purple Tech Flare */}
      <div 
        className="absolute -top-28 -right-20 w-[650px] h-[650px] bg-gradient-to-bl from-purple-500/22 via-fuchsia-600/15 to-transparent rounded-full blur-3xl"
      />

      {/* 5. Bottom-Right Crimson & Ruby Suspicion Aura */}
      <div 
        className="absolute -bottom-28 -right-28 w-[750px] h-[750px] bg-gradient-to-tl from-rose-600/30 via-red-600/18 to-transparent rounded-full blur-3xl opacity-90"
      />

      {/* 6. Bottom-Left Cyber Emerald & Lime Forensic Scanner Glow */}
      <div 
        className="absolute -bottom-36 -left-36 w-[700px] h-[700px] bg-gradient-to-tr from-emerald-500/25 via-teal-700/18 to-transparent rounded-full blur-3xl opacity-80"
      />

      {/* 7. Center Floating Atmospheric Color Pulses */}
      <div 
        className="absolute top-1/3 left-1/4 w-[550px] h-[400px] bg-gradient-to-r from-amber-600/12 to-rose-600/12 rounded-full blur-3xl animate-float-fog-1"
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[450px] bg-gradient-to-l from-indigo-600/15 to-cyan-600/12 rounded-full blur-3xl animate-float-fog-2"
      />

      {/* 8. Watermarked Noir Detective Motifs with subtle color luminescence */}
      {/* Top Right: Classified Stamp Outline with gold/amber tint */}
      <div className="absolute top-24 right-10 text-amber-400/15 rotate-12 flex flex-col items-center">
        <div className="border-2 border-dashed border-amber-400/25 bg-amber-500/5 px-4 py-2 rounded-lg text-center font-mono text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(245,158,11,0.1)]">
          CLASSIFIED CASE FILE #8804
        </div>
      </div>

      {/* Bottom Right Watermark: Giant Fingerprint Contour with crimson aura */}
      <div className="absolute bottom-12 right-12 text-rose-400/10 transform scale-150 rotate-[-15deg]">
        <Fingerprint className="w-64 h-64" strokeWidth={0.8} />
      </div>

      {/* Top Left Watermark: Compass Reticle Contour with cyan aura */}
      <div className="absolute top-28 left-16 text-cyan-400/12 transform scale-125">
        <Compass className="w-48 h-48" strokeWidth={0.7} />
      </div>

      {/* Bottom Left Watermark: Shield Badge with emerald glow */}
      <div className="absolute bottom-20 left-12 text-emerald-400/12 transform -rotate-12">
        <Shield className="w-40 h-40" strokeWidth={0.7} />
      </div>

      {/* Center Subtle Multi-colored Pin Grid Nodes */}
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#38bdf8_1px,transparent_1px),radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:48px_48px,24px_24px] [background-position:0_0,12px_12px]" />

      {/* 9. Overall Vignette Frame with rich jewel-tone depth */}
      <div className="absolute inset-0 bg-noir-vignette opacity-70" />
    </div>
  );
};
