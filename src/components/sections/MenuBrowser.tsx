"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { displayPrice, menu } from "@/content/offerings";

/**
 * Tabbed menu. All categories are also rendered server-side (hidden panels use the
 * `hidden` attribute rather than being omitted) so every dish is in the initial HTML.
 */
export function MenuBrowser() {
  const [active, setActive] = useState(menu[0].id);

  return (
    <div className="grid gap-10 md:grid-cols-12">
      <div role="tablist" aria-label="Menu categories" aria-orientation="vertical" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:col-span-4 md:mx-0 md:flex-col md:gap-0 md:overflow-visible md:px-0">
        {menu.map((c, i) => {
          const selected = c.id === active;
          return (
            <button
              key={c.id}
              role="tab"
              id={`tab-${c.id}`}
              aria-selected={selected}
              aria-controls={`panel-${c.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(c.id)}
              onKeyDown={(e) => {
                if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
                e.preventDefault();
                const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
                const next = menu[(i + dir + menu.length) % menu.length].id;
                setActive(next);
                document.getElementById(`tab-${next}`)?.focus();
              }}
              className={`group relative shrink-0 whitespace-nowrap border px-4 py-3 text-left transition-colors md:border-0 md:border-b md:px-0 md:py-5 ${
                selected ? "border-lagoon bg-lagoon text-ivory md:bg-transparent md:text-lagoon" : "border-charcoal/20 text-charcoal/75 hover:text-charcoal md:border-charcoal/15"
              }`}
            >
              <span className="eyebrow mr-4 hidden !text-[0.6rem] md:inline">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-serif text-xl md:text-3xl">{c.name}</span>
              {selected && <motion.span layoutId="menu-bar" className="absolute bottom-[-1px] left-0 hidden h-px w-full bg-lagoon md:block" />}
            </button>
          );
        })}
      </div>

      <div className="md:col-span-7 md:col-start-6">
        {menu.map((c) => (
          <div key={c.id} role="tabpanel" id={`panel-${c.id}`} aria-labelledby={`tab-${c.id}`} hidden={c.id !== active}>
            <motion.ul
              initial={false}
              animate={c.id === active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {c.items.map((item) => {
                const price = displayPrice(item);
                return (
                  <li key={item.name} className="flex items-baseline gap-4 border-b border-dashed border-charcoal/20 py-5">
                    <span className="font-serif text-2xl md:text-[1.7rem]">{item.name}</span>
                    <span aria-hidden className="flex-1" />
                    <span className="shrink-0 text-sm text-charcoal/75">{price ?? "Price on request"}</span>
                  </li>
                );
              })}
            </motion.ul>
          </div>
        ))}
      </div>
    </div>
  );
}
