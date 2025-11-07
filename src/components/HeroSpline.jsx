import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroSpline() {
  return (
    <section className="relative w-full h-[340px] md:h-[420px] rounded-3xl overflow-hidden border border-white/10 bg-neutral-950">
      <Spline
        scene="https://prod.spline.design/igThmltzmqv5hkWo/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Soft gradient vignette that won't block interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="pointer-events-none text-center px-6">
          <p className="uppercase tracking-[0.3em] text-xs md:text-sm text-white/70">Interactive Loading Animation</p>
          <h1 className="mt-3 md:mt-4 text-2xl md:text-4xl font-semibold text-white">
            Learning Progress Dashboard
          </h1>
          <p className="mt-2 md:mt-3 text-sm md:text-base text-white/70 max-w-xl mx-auto">
            Minimal, modern, and responsive overview of your coding journey.
          </p>
        </div>
      </div>
    </section>
  );
}
