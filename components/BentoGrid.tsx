"use client";

import { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Frame, Palette, Wind, Gem, ArrowUpRight, type LucideIcon } from "lucide-react";
import { SPECIALTIES, type Specialty } from "@/lib/constants";

const ICON_MAP: Record<Specialty["icon"], LucideIcon> = {
  aluminium: Frame,
  stained: Palette,
  airbrushed: Wind,
  bevelled: Gem,
};

/**
 * True asymmetric bento layout on a 4-column desktop grid — a wide "hero"
 * card, a wide secondary card, and two square cards beneath it. Defined
 * here (rather than trusting the 5-column span classes in lib/constants.ts)
 * so every card gets enough width for its glass text panel to breathe.
 * Falls back to the item's own `span` field if a new specialty id is added
 * without an explicit layout entry below.
 */
const CARD_LAYOUT: Record<string, string> = {
  aluminium: "md:col-span-2 md:row-span-2",
  stained: "md:col-span-2 md:row-span-1",
  airbrushed: "md:col-span-1 md:row-span-1",
  bevelled: "md:col-span-1 md:row-span-1",
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

/**
 * Extracted and wrapped in React.memo so each card only re-renders when its
 * own `item`/`index` props change, isolating the 4 cards from one another
 * and from any state added to the parent section later. Combined with the
 * transform-gpu / will-change-transform hints below (which promote the
 * backdrop-blur panels to their own compositor layer), this is what keeps
 * scrolling smooth — the browser paints each blurred panel once and then
 * composites it, instead of recalculating the blur against the whole page
 * on every scroll frame.
 */
const SpecialtyCard = memo(function SpecialtyCard({
  item,
  index,
}: {
  item: Specialty;
  index: number;
}) {
  const Icon = ICON_MAP[item.icon];
  const layout = CARD_LAYOUT[item.id] ?? item.span;
  // The two bottom cards are single-column (md:col-span-1) and therefore
  // much narrower — they need smaller type and tighter side padding so
  // titles wrap across 1-2 lines instead of 4-5.
  const isCompact = layout.includes("md:col-span-1");

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ scale: 1.015 }}
      className={`iridescent-border group relative transform-gpu overflow-hidden rounded-3xl border border-white/8 transition-shadow duration-500 will-change-transform ${layout} ${item.glow}`}
    >
      {/* Residential application photo */}
      <Image
        src={item.image}
        alt={item.imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 40vw"
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        priority={index === 0}
      />

      {/* Minimal wash — just enough to seat the card in the obsidian
          mood without muddying the photography. Legibility for the
          copy now comes from the dedicated glass panel below, not
          from darkening the whole image. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/75 via-obsidian/10 to-transparent" />

      {/* Ambient gradient wash — opacity only transitions on hover
          (no continuous animation loop), so it costs nothing at rest
          or while scrolling */}
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-gradient-to-br ${item.accent} blur-3xl opacity-70 transition-opacity duration-500 group-hover:opacity-100`}
      />

      <div
        className={`relative z-10 flex h-full flex-col justify-between ${
          isCompact ? "p-4" : "p-5 sm:p-7"
        }`}
      >
        <div className="flex items-start justify-between">
          <span className="flex h-12 w-12 transform-gpu items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md transition-transform duration-500 will-change-transform group-hover:-translate-y-1 group-hover:rotate-3">
            <Icon className="h-5 w-5 text-white/90" strokeWidth={1.75} />
          </span>
          <ArrowUpRight className="h-5 w-5 text-white/30 transition-all duration-500 group-hover:text-white/70 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>

        {/* True glassmorphism text panel — frosted, bordered, and
            independent of the image wash, so the photo behind it stays
            vibrant while the copy stays legible. Height is dynamic
            (h-auto) with generous bottom padding so the last line of
            copy never gets clipped by the card's overflow-hidden edge.
            transform-gpu + will-change-transform force this panel onto
            its own GPU compositor layer so the backdrop-blur doesn't get
            recomputed against the rest of the page on every scroll tick. */}
        <div
          className={`h-auto transform-gpu rounded-2xl border border-white/15 bg-obsidian/40 pt-4 pb-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-xl will-change-transform ${
            isCompact ? "px-3" : "px-4 sm:px-5"
          }`}
        >
          <h3
            className={`font-medium text-white ${
              isCompact ? "text-base leading-snug" : "text-lg sm:text-xl"
            }`}
          >
            {item.title}
          </h3>
          <p
            className={`mt-2 leading-relaxed text-white/70 ${
              isCompact
                ? "text-xs line-clamp-3"
                : "text-sm line-clamp-3 md:line-clamp-none"
            }`}
          >
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

export default function BentoGrid() {
  return (
    <section
      id="specialties"
      className="relative bg-obsidian pb-28 pt-16 sm:pb-36 sm:pt-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-white/50">
            Our Specialties
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Engineered for <span className="text-gradient-accent">Homes That Lead</span>
          </h2>
          <p className="mt-4 text-white/50">
            Four disciplines, purpose-built for Ludhiana&apos;s finest independent houses.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-4 md:auto-rows-[16rem]">
          {SPECIALTIES.map((item, i) => (
            <SpecialtyCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <p className="mt-6 text-center text-[11px] text-white/25">
          Reference imagery for illustrative purposes, sourced under the Unsplash License.
        </p>
      </div>
    </section>
  );
}
