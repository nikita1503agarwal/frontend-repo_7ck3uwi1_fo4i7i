import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroSpline() {
  return (
    <section className="relative w-full h-[360px] sm:h-[420px] md:h-[520px] overflow-hidden rounded-b-2xl">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Gradient overlays for readability; pointer-events-none so Spline remains interactive */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="relative z-10 h-full flex items-end">
        <div className="px-4 sm:px-6 md:px-10 pb-6 text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            Your Coding Journey, Visualized
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/80 max-w-2xl">
            Tap the interactive grid—watch tiles react with a soft red ripple as you build momentum.
          </p>
        </div>
      </div>
    </section>
  );
}
