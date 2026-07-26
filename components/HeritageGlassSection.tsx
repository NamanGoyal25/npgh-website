"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Landmark, MessageCircle, Gem } from "lucide-react";
import { WHATSAPP_PREFILLED } from "@/lib/constants";

const CRAFT_TAGS = [
  "Thikri Mirror Inlay",
  "Sacred Motif Stained Glass",
  "Gurdwara & Temple Installations",
] as const;

export default function HeritageGlassSection() {
  return (
    <section
      id="heritage-glass"
      className="relative overflow-hidden bg-obsidian py-28 sm:py-36"
    >
      {/* Ambient gold glow field — deliberately warm, no cyan/violet, to feel sacred rather than "tech" */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.12, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-amber-300/10 blur-[130px]"
        />
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.15, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-amber-500/10 blur-[130px]"
        />
      </div>

      {/* Faint traditional lattice (jaali) texture for quiet, respectful ornamentation */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(245,199,126,0.6) 0px, rgba(245,199,126,0.6) 1px, transparent 1px, transparent 22px), repeating-linear-gradient(-45deg, rgba(245,199,126,0.6) 0px, rgba(245,199,126,0.6) 1px, transparent 1px, transparent 22px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-16">
          {/* Image placeholder — swap the inner content for real Gurdwara / temple photography */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 md:order-1"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-amber-200/15 shadow-[0_0_90px_-25px_rgba(245,199,126,0.3)] md:aspect-[3/4]">
              {/* Real Gurdwara / temple mirror-mosaic photography.
                  File lives at /public/heritage-thikri.jpg — swap that file
                  to update the image, no code changes needed.
                  object-cover (not contain) fills the frame edge-to-edge so
                  there's no floating "white box" — instead we crop in
                  slightly and bias the focal point toward the mandala and
                  hanging sapphire/ruby drops (the sharpest, highest-detail
                  part of the source photo), then mask the softer/blown-out
                  edges with the vignette layers below. priority + quality=100
                  + unoptimized serve the source file at full fidelity. */}
              <Image
                src="/heritage-thikri.jpg"
                alt="Hand-crafted Thikri mirror mosaic and sacred stained glass detailing, focused on the central mandala and hanging gemstone drops"
                fill
                sizes="(min-width: 1024px) 1000px, 100vw"
                quality={100}
                priority
                unoptimized
                className="scale-[1.15] object-cover object-[50%_38%]"
              />

              {/* Premium masking — a soft radial vignette keeps the central
                  motif sharp and fully visible, then burns everything outside
                  it down into deep obsidian so the busy/white parts of the
                  original photo (walls, blurry edges) disappear into the
                  section's own dark background instead of clashing with it. */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 66% 64% at 50% 40%, transparent 40%, rgba(10,10,12,0.55) 62%, rgba(10,10,12,0.9) 80%, #0A0A0C 100%)",
                }}
              />

              {/* Extra edge burn — guarantees no bright/white edge of the
                  source photo ever bleeds through at the very corners. */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{ boxShadow: "inset 0 0 100px 45px rgba(10,10,12,0.92)" }}
              />

              {/* Faceted mirror-shard shimmer — a subtle light overlay evoking
                  the Thikri mosaic's sparkle across the whole frame, blended
                  so the real photo stays fully visible underneath */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "conic-gradient(from 45deg at 20% 20%, rgba(245,199,126,0.5), transparent 25%), conic-gradient(from 200deg at 80% 30%, rgba(255,223,150,0.5), transparent 25%), conic-gradient(from 120deg at 50% 80%, rgba(245,199,126,0.4), transparent 30%)",
                }}
              />

              {/* Ambient gold glow accents — screen-blended so they add warm
                  gallery-light halo around the artwork rather than washing
                  out the photograph */}
              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full bg-amber-300/30 blur-[90px] mix-blend-screen"
              />
              <motion.div
                animate={{ opacity: [0.15, 0.4, 0.15] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="pointer-events-none absolute -bottom-16 -right-10 h-56 w-56 rounded-full bg-amber-500/30 blur-[90px] mix-blend-screen"
              />

              {/* Gold corner brackets — a quiet nod to a mounted frame, not a religious symbol */}
              {[
                "top-6 left-6 border-t border-l",
                "top-6 right-6 border-t border-r",
                "bottom-6 left-6 border-b border-l",
                "bottom-6 right-6 border-b border-r",
              ].map((pos) => (
                <span
                  key={pos}
                  className={`pointer-events-none absolute h-8 w-8 border-amber-200/40 ${pos}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 overflow-visible md:order-2"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-200/[0.06] px-4 py-1.5 text-[11px] uppercase tracking-[0.15em] text-amber-100/70">
              <Landmark className="h-3.5 w-3.5 text-amber-300" />
              Heritage Craftsmanship
            </span>

            {/* No h-/max-h- has ever been set here — this heading has always
                been free to size to its content. The clipping instead came
                from the two lines below being separate block spans that each
                carry their own gradient background (needed for bg-clip-text).
                overflow-visible + pb-4 here, plus min-h-[1.2em] and pb-1.5 on
                each line, guarantee the box is never shorter than the font's
                full em box and that each line's background can never start
                before the previous line's descenders have fully cleared. */}
            <h2 className="mt-6 overflow-visible pb-4 font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              <span className="block min-h-[1.2em] overflow-visible pb-1.5 bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 bg-clip-text text-transparent">
                Preserving Heritage.
              </span>
              <span className="block min-h-[1.2em] overflow-visible bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 bg-clip-text text-transparent">
                Crafting Devotion.
              </span>
            </h2>

            <p className="mt-5 text-sm uppercase tracking-[0.1em] text-amber-100/50 sm:text-[13px]">
              State-Leading Specialists in Traditional Mirror Mosaic &amp; Spiritual Glass Art
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60">
              As one of Punjab&apos;s exclusive purveyors of custom Gurdwara and
              temple glasswork, we bring decades of mastery to traditional
              Thikri mirror art, stained glass detailing, and sacred
              architectural installations.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {CRAFT_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-amber-200/15 bg-white/[0.03] px-3.5 py-1.5 text-xs text-amber-100/60"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href={WHATSAPP_PREFILLED(
                  "Namaste/Sat Sri Akal NPGH, I would like to consult on a sacred Gurdwara/Temple glass art project."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 bg-[length:200%_auto] px-7 py-4 text-sm font-semibold text-obsidian shadow-[0_0_50px_-12px_rgba(245,199,126,0.55)] transition-all duration-500 hover:bg-[position:100%_0] hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" />
                Consult on Sacred Projects
              </a>

              <span className="inline-flex items-center gap-1.5 text-xs text-white/35">
                <Gem className="h-3.5 w-3.5 text-amber-300/70" />
                Confidential consultations &middot; On-site across Punjab
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
