"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { WHATSAPP_PREFILLED } from "@/lib/constants";

const headlineWords = [
  "Three",
  "Decades",
  "of",
  "Precision.",
  "The",
  "Future",
  "of",
  "Glass.",
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.4,
    },
  },
};

const word = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-npgh-charcoal"
    >
      {/* ================================================================
          BACKGROUND VIDEO — replace with your own footage
          1. Drop your video file into the /public folder,
             e.g. /public/hero-glass.mp4
          2. Point the <source src="..."> below at that same path
          3. (Optional) Drop a still frame into /public/hero-poster.jpg —
             it displays instantly while the video buffers, so the hero
             never shows a blank frame on slow connections
          If no video is supplied, this layer simply renders transparent
          and the ambient glow orbs + npgh-charcoal background carry the hero.
          ================================================================ */}
      <div className="absolute inset-0 z-0">
        <video
          className="h-full w-full object-cover opacity-40"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg" // <-- your still-frame image goes here
        >
          <source src="/hero-glass.mp4" type="video/mp4" />
          {/* your local video file replaces "hero-glass.mp4" above */}
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-npgh-charcoal/70 via-npgh-charcoal/60 to-npgh-charcoal" />
        <div className="absolute inset-0 bg-gradient-to-t from-npgh-charcoal via-transparent to-transparent" />
      </div>

      {/* Ambient glow orbs — animate opacity + transform only (both
          compositor-friendly) and are pinned to their own GPU layer via
          transform-gpu/will-change-transform, so these infinite loops
          composite instead of repainting the page underneath on every
          scroll frame. */}
      <div className="pointer-events-none absolute inset-0 z-0 grain-overlay">
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 left-1/4 h-[32rem] w-[32rem] transform-gpu rounded-full bg-iridescent-cyan/10 blur-[120px] will-change-transform"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-0 right-1/4 h-[28rem] w-[28rem] transform-gpu rounded-full bg-iridescent-violet/10 blur-[120px] will-change-transform"
        />
        <motion.div
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-1/3 right-1/3 h-72 w-72 transform-gpu rounded-full bg-iridescent-amber/10 blur-[100px] will-change-transform"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-28 text-center sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-panel mb-8 inline-flex transform-gpu items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-wide text-npgh-white/70 will-change-transform"
        >
          <Sparkles className="h-3.5 w-3.5 text-npgh-gold" />
          Est. Precision Since Three Decades &middot; Ludhiana, Punjab
        </motion.div>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-npgh-white sm:text-6xl lg:text-7xl"
        >
          {headlineWords.map((w, i) => (
            <span key={i} className="mr-3 inline-block overflow-hidden align-bottom last:mr-0">
              <motion.span
                variants={word}
                className={`inline-block transform-gpu will-change-transform ${
                  w === "Precision." || w === "Glass."
                    ? "gold-metallic bg-clip-text text-transparent"
                    : "text-gradient"
                }`}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-7 max-w-2xl text-balance text-base leading-relaxed text-npgh-white/60 sm:text-lg"
        >
          Ludhiana's trusted name for wholesale aluminium section supply and
          bespoke decorative glass engineering — stained, sand-blasted,
          bevelled, and edge-polished to architectural precision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#specialties"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-npgh-white/15 bg-npgh-white/5 px-7 py-4 text-sm font-medium text-npgh-white backdrop-blur-md transition-all duration-300 hover:border-npgh-white/25 hover:bg-npgh-white/10 sm:w-auto"
          >
            Explore Specialties
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href={WHATSAPP_PREFILLED(
              "Hello NPGH, I'd like an instant quote for glass/aluminium requirements."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex w-full transform-gpu items-center justify-center gap-2 overflow-hidden rounded-2xl gold-metallic px-7 py-4 text-sm font-semibold text-npgh-charcoal shadow-amber-glow transition-all duration-500 will-change-transform hover:scale-[1.02] sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" />
            Instant WhatsApp Quote
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5 }}
          className="mt-16 grid w-full max-w-2xl grid-cols-3 divide-x divide-npgh-white/10 border-t border-npgh-white/10 pt-8"
        >
          {[
            { value: "30+", label: "Years of Craft" },
            { value: "5000+", label: "Projects Delivered" },
            { value: "100%", label: "Precision Finish" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center px-2">
              <span className="text-2xl font-semibold text-npgh-white sm:text-3xl">
                {stat.value}
              </span>
              <span className="mt-1 text-[11px] uppercase tracking-wide text-npgh-white/40">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
