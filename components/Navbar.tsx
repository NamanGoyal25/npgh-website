"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Gem } from "lucide-react";
import { BUSINESS, NAV_LINKS, WHATSAPP_PREFILLED } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
          scrolled ? "pt-3" : "pt-5"
        }`}
      >
        <div
          className={`glass-panel flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-500 ${
            scrolled
              ? "shadow-glass-glow border-white/10"
              : "border-white/5 bg-white/[0.02]"
          }`}
        >
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2.5 shrink-0 group">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-iridescent-cyan/20 via-iridescent-violet/20 to-iridescent-amber/20 border border-white/10">
              <Gem className="h-4 w-4 text-iridescent-cyan transition-transform duration-500 group-hover:rotate-12" />
              <span className="absolute inset-0 rounded-xl bg-iridescent-cyan/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-sm font-semibold tracking-wide text-white">
                NPGH
              </span>
              <span className="hidden sm:block text-[10px] tracking-[0.15em] text-white/50 uppercase">
                New Punjab Glass House
              </span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm text-white/70 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <a
              href={WHATSAPP_PREFILLED(
                "Hello NPGH, I'd like to request a quote for glass/aluminium work."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative hidden sm:inline-flex items-center gap-1.5 overflow-hidden rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-obsidian shadow-amber-glow transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <span className="relative">Get Quote</span>
              <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="glass-panel mt-2 rounded-2xl p-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={WHATSAPP_PREFILLED(
                    "Hello NPGH, I'd like to request a quote for glass/aluminium work."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-white px-4 py-3 text-sm font-medium text-obsidian"
                >
                  Get Quote <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
