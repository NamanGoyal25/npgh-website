"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, Plus, X } from "lucide-react";
import { BUSINESS, WHATSAPP_PREFILLED } from "@/lib/constants";

export default function FloatingCTA() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-end gap-3"
          >
            <a
              href={BUSINESS.telUrl}
              className="group flex items-center gap-3 rounded-full bg-white/95 py-3 pl-4 pr-4 text-sm font-medium text-obsidian shadow-glass-glow backdrop-blur-xl transition-transform hover:scale-105"
            >
              <span className="hidden sm:inline whitespace-nowrap">Call Now</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-obsidian text-white">
                <Phone className="h-4 w-4" strokeWidth={2} />
              </span>
            </a>

            <a
              href={WHATSAPP_PREFILLED(
                "Hello NPGH, I'd like to enquire about glass/aluminium products."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-full bg-[#25D366] py-3 pl-4 pr-4 text-sm font-medium text-obsidian shadow-[0_0_40px_-10px_rgba(37,211,102,0.6)] transition-transform hover:scale-105"
            >
              <span className="hidden sm:inline whitespace-nowrap text-obsidian/90">
                WhatsApp
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-obsidian text-[#25D366]">
                <MessageCircle className="h-4 w-4" strokeWidth={2} fill="currentColor" />
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close quick actions" : "Open quick actions"}
        whileTap={{ scale: 0.92 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-iridescent-cyan via-white to-iridescent-amber shadow-amber-glow"
      >
        <span className="absolute inset-0 rounded-full bg-white/40 blur-xl animate-glow-pulse" />
        <motion.span
          animate={{ rotate: open ? 135 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative"
        >
          {open ? (
            <X className="h-6 w-6 text-obsidian" strokeWidth={2.25} />
          ) : (
            <Plus className="h-6 w-6 text-obsidian" strokeWidth={2.25} />
          )}
        </motion.span>
      </motion.button>
    </div>
  );
}
