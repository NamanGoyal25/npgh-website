"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, Gem } from "lucide-react";
import { BUSINESS, WHATSAPP_PREFILLED } from "@/lib/constants";

export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/8 bg-obsidian py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="glass-panel-strong iridescent-border relative overflow-hidden rounded-3xl px-6 py-12 sm:px-12"
        >
          <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-iridescent-cyan/10 blur-[100px]" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-iridescent-amber/10 blur-[100px]" />

          <div className="relative z-10 grid gap-10 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Gem className="h-4 w-4 text-iridescent-cyan" />
                </span>
                <span className="text-sm font-semibold tracking-wide text-white">
                  {BUSINESS.name}
                </span>
              </div>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/50">
                {BUSINESS.tagline} — Prop. {BUSINESS.founder}. Three decades of
                precision in wholesale aluminium and bespoke decorative glass,
                built for architects, contractors, and dealers across Punjab.
              </p>

              <div className="mt-6 flex items-start gap-2.5 text-sm text-white/50">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/30" />
                <span>{BUSINESS.address}</span>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 md:items-end">
              <a
                href={BUSINESS.telUrl}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-white/10 md:w-auto"
              >
                <Phone className="h-4 w-4" />
                {BUSINESS.phoneDisplay}
              </a>
              <a
                href={WHATSAPP_PREFILLED(
                  "Hello NPGH, I'd like to enquire about glass/aluminium products."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-iridescent-cyan via-white to-iridescent-amber bg-[length:200%_auto] px-6 py-4 text-sm font-semibold text-obsidian shadow-amber-glow transition-all hover:bg-[position:100%_0] md:w-auto"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 text-xs text-white/30 sm:flex-row">
          <span>
            &copy; {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </span>
          <span>Dugri Road, Ludhiana, Punjab 141002</span>
        </div>
      </div>
    </footer>
  );
}
