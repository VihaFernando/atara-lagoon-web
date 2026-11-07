import Image from "next/image";
import { photos, type PhotoKey, type PhotoSlot } from "@/content/images";

const tones: Record<PhotoSlot["tone"], { bg: string; line: string; text: string }> = {
  lagoon: { bg: "#1d544d", line: "rgba(233,223,204,0.18)", text: "rgba(247,244,236,0.78)" },
  forest: { bg: "#2b5444", line: "rgba(165,180,160,0.25)", text: "rgba(247,244,236,0.75)" },
  sand: { bg: "#ddd0b6", line: "rgba(23,76,70,0.16)", text: "rgba(37,42,39,0.7)" },
  dusk: { bg: "#3c4a43", line: "rgba(185,154,105,0.28)", text: "rgba(247,244,236,0.75)" },
};

/** Organic lagoon contour lines — a decorative texture, not an illustration of the property. */
export function Contours({ color, className = "" }: { color: string; className?: string }) {
  const paths = Array.from({ length: 9 }, (_, i) => {
    const y = 40 + i * 42;
    const a = 18 + (i % 3) * 9;
    return `M-20 ${y} C 120 ${y - a}, 220 ${y + a}, 340 ${y - a / 2} S 560 ${y + a}, 660 ${y - a / 3}`;
  });
  return (
    <svg aria-hidden="true" viewBox="0 0 640 420" preserveAspectRatio="xMidYMid slice" className={`absolute inset-0 h-full w-full ${className}`}>
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={color} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}

interface PhotoProps {
  name: PhotoKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Fill the parent box (parent must be positioned with a size). */
  fill?: boolean;
  zoom?: boolean;
  showCaption?: boolean;
}

export function Photo({ name, className = "", sizes = "100vw", priority, fill, zoom, showCaption = true }: PhotoProps) {
  const p = photos[name];
  const ratio = fill ? undefined : { aspectRatio: `${p.width} / ${p.height}` };
  const zoomCls = zoom ? "transition-transform duration-[1.2s] ease-[var(--ease-soft)] group-hover:scale-[1.04]" : "";

  if (p.available) {
    return (
      <div className={`relative overflow-hidden ${fill ? "h-full w-full" : ""} ${className}`} style={ratio}>
        <Image
          src={p.file}
          alt={p.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${zoomCls}`}
        />
      </div>
    );
  }

  const t = tones[p.tone];
  return (
    <div
      role="img"
      aria-label={`Photograph to be supplied: ${p.alt}`}
      className={`relative overflow-hidden ${fill ? "h-full w-full" : ""} ${className}`}
      style={{ ...ratio, backgroundColor: t.bg }}
    >
      <div className={`absolute inset-0 ${zoomCls}`}>
        <Contours color={t.line} />
      </div>
      {showCaption && (
        <span className="eyebrow absolute bottom-4 left-4 right-4 !text-[0.62rem]" style={{ color: t.text }}>
          {p.caption} <span className="opacity-60">· photograph forthcoming</span>
        </span>
      )}
    </div>
  );
}
