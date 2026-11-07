"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { galleryOrder, photos } from "@/content/images";

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const [dir, setDir] = useState(1);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const n = galleryOrder.length;

  const go = useCallback((d: number) => {
    setDir(d);
    setIndex((i) => (i === null ? i : (i + d + n) % n));
  }, [n]);

  const close = useCallback(() => {
    setIndex(null);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (index === null) return;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [index, go, close]);

  const current = index === null ? null : photos[galleryOrder[index]];

  return (
    <>
      {/* Masonry: every photo keeps its own proportions, so nothing is cropped and there are no gaps. */}
      <ul className="columns-2 gap-3 md:columns-3 md:gap-4">
        {galleryOrder.map((key, i) => (
          <motion.li
            key={key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.06 }}
            className="mb-3 break-inside-avoid md:mb-4"
          >
            <button
              type="button"
              className="group relative block w-full overflow-hidden text-left"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setDir(1);
                setIndex(i);
              }}
            >
              <Photo name={key} zoom sizes="(min-width: 768px) 33vw, 50vw" />
            </button>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {current && index !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${current.caption}, image ${index + 1} of ${n}`}
            className="fixed inset-0 z-[60] flex flex-col bg-charcoal/96 text-ivory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <div className="flex items-center justify-between px-5 py-4 md:px-8">
              <p className="eyebrow text-ivory/70">
                {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} · {current.caption}
              </p>
              <button ref={closeRef} type="button" onClick={close} aria-label="Close gallery" className="flex h-11 w-11 items-center justify-center">
                <X aria-hidden className="h-6 w-6" strokeWidth={1.4} />
              </button>
            </div>
            <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-6 md:px-24">
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.div
                  key={galleryOrder[index]}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -60 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full max-w-5xl"
                  style={{ aspectRatio: `${current.width} / ${current.height}`, maxHeight: "78svh" }}
                >
                  <Photo name={galleryOrder[index]} fill sizes="90vw" />
                </motion.div>
              </AnimatePresence>
              <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-ivory/25 bg-charcoal/40 transition-colors hover:bg-ivory hover:text-charcoal md:left-6">
                <ChevronLeft aria-hidden className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next image" className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-ivory/25 bg-charcoal/40 transition-colors hover:bg-ivory hover:text-charcoal md:right-6">
                <ChevronRight aria-hidden className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
