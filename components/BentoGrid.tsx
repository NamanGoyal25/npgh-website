"use client";

import { memo, useState } from "react";
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

  // Drives the "reveal full description" interaction. group-hover: classes
  // below already handle desktop mouse hover with pure CSS (no re-render),
  // but touch devices have no reliable hover state — so tapping the card
  // toggles this instead, and the same expanded classes are applied either
  // way. Tapping again (or moving the mouse away on desktop) collapses it.
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ scale: 1.015 }}
      onClick={() => setIsOpen((prev) => !prev)}
      onMouseLeave={() => setIsOpen(false)}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      className={`iridescent-border group relative transform-gpu cursor-pointer overflow-hidden rounded-3xl border border-npgh-white/8 transition-shadow duration-500 will-change-transform ${layout} ${item.glow}`}
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

      {/* Minimal wash — just enough to seat the card in the npgh-charcoal
          mood without muddying the photography. Legibility for the
          copy now comes from the dedicated glass panel below, not
          from darkening the whole image. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-npgh-charcoal/75 via-npgh-charcoal/10 to-transparent" />

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
          <span className="flex h-12 w-12 transform-gpu items-center justify-center rounded-2xl border border-npgh-white/15 bg-npgh-white/10 backdrop-blur-md transition-transform duration-500 will-change-transform group-hover:-translate-y-1 group-hover:rotate-3">
            <Icon className="h-5 w-5 text-npgh-white/90" strokeWidth={1.75} />
          </span>
          <ArrowUpRight
            className={`h-5 w-5 transition-all duration-300 ${
              isOpen
                ? "-translate-y-1 translate-x-1 rotate-45 text-npgh-gold"
                : "text-npgh-white/30 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-45 group-hover:text-npgh-gold"
            }`}
          />
        </div>

        {/* True glassmorphism text panel — frosted, bordered, and
            independent of the image wash, so the photo behind it stays
            vibrant while the copy stays legible. Collapsed, it shows the
            title plus a short two-line preview; on hover (desktop) or tap
            (mobile, via the isOpen state above) it smoothly grows taller
            and un-clamps the paragraph to reveal the full description —
            no modal, just the card breathing open in place.

            The two compact (single-column) cards have a hard-capped 16rem
            row height from the grid, so their expanded max-height is kept
            well inside that budget (icon row + padding + panel all have to
            add up to less than the card's fixed height, or the card's own
            overflow-hidden silently clips the panel instead of the panel
            clipping its own text). min-h-0 is required here too — flex
            items default to min-height:auto, which otherwise fights the
            max-height/overflow-y-auto combo and lets the panel balloon past
            its flex allocation. overflow-y-auto is the safety net on top of
            that budget: if a particular card's copy is still too long to
            fit even fully expanded, it scrolls inside the glass panel with
            a subtle scrollbar instead of being clipped or pushed off-card. */}
        <div
          className={`min-h-0 transform-gpu overflow-y-auto rounded-2xl border border-npgh-white/15 bg-npgh-charcoal/40 pt-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 ease-out will-change-transform ${
            isCompact ? "px-3" : "px-4 sm:px-5"
          } ${
            isOpen
              ? isCompact
                ? "max-h-32 pb-4"
                : "max-h-60 pb-6"
              : isCompact
              ? "max-h-20 pb-4 group-hover:max-h-32"
              : "max-h-20 pb-4 group-hover:max-h-60 group-hover:pb-6"
          }`}
        >
          <h3
            className={`line-clamp-2 font-medium text-npgh-white ${
              isCompact ? "text-base leading-snug" : "text-lg sm:text-xl"
            }`}
          >
            {item.title}
          </h3>
          <p
            className={`mt-2 leading-relaxed text-npgh-white/70 transition-all duration-300 ${
              isCompact ? "text-xs" : "text-sm"
            } ${isOpen ? "line-clamp-none" : "line-clamp-2 group-hover:line-clamp-none"}`}
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
      className="relative bg-npgh-charcoal pb-28 pt-16 sm:pb-36 sm:pt-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-npgh-white/10 bg-npgh-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-npgh-white/50">
            Our Specialties
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-npgh-white sm:text-5xl">
            Engineered for{" "}
            <span className="gold-metallic bg-clip-text text-transparent">Homes That Lead</span>
          </h2>
          <p className="mt-4 text-npgh-white/50">
            Four disciplines, purpose-built for Ludhiana&apos;s finest independent houses.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-4 md:auto-rows-[16rem]">
          {SPECIALTIES.map((item, i) => (
            <SpecialtyCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <p className="mt-6 text-center text-[11px] text-npgh-white/25">
          Reference imagery for illustrative purposes, sourced under the Unsplash License.
        </p>
      </div>
    </section>
  );
}
