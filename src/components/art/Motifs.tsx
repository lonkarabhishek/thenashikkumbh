/**
 * Folk-art motif set.
 *
 * Every mark is a plain inline SVG that inherits `currentColor` unless it needs
 * two tones, so a motif can sit on cream or on indigo without a second variant.
 * Keep them geometric, these are drawn in the spirit of Warli and temple
 * woodcut, not rendered illustration.
 */

type MotifProps = {
  className?: string;
  title?: string;
};

const a11y = (title?: string) =>
  title
    ? { role: "img" as const, "aria-label": title }
    : { "aria-hidden": true as const, focusable: "false" as const };

/* ── Kalash, the pot the Kumbh is named for ─────────────── */
export function Kalash({ className = "w-8 h-8", title }: MotifProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...a11y(title)}>
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {/* coconut + mango leaves */}
        <path d="M32 6c-3.4 0-5.6 2.4-5.6 5.2 0 2.6 2.4 4.4 5.6 4.4s5.6-1.8 5.6-4.4C37.6 8.4 35.4 6 32 6Z" />
        <path d="M26.4 14.6c-4.6-.6-8 1-9.8 4.2 3.6 1.6 7.4 1.2 9.8-1.4M37.6 14.6c4.6-.6 8 1 9.8 4.2-3.6 1.6-7.4 1.2-9.8-1.4" />
        {/* pot rim */}
        <path d="M18 21h28l-2.6 5H20.6L18 21Z" />
        {/* pot body */}
        <path d="M21.4 26c-5 4.2-7.4 9.4-7.4 15.4C14 51 22 58 32 58s18-7 18-16.6c0-6-2.4-11.2-7.4-15.4" />
        {/* swastika-free centre band, a simple sun disc */}
        <circle cx="32" cy="42" r="5.4" />
        <path d="M32 32.4v3.2M32 48.4v3.2M22.6 42h3.2M38.2 42h3.2" />
      </g>
    </svg>
  );
}

/* ── Om ──────────────────────────────────────────────────── */
export function OmMark({ className = "w-8 h-8", title }: MotifProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...a11y(title)}>
      <text
        x="32"
        y="46"
        textAnchor="middle"
        fontSize="46"
        fill="currentColor"
        fontFamily="var(--font-devanagari), 'Noto Serif Devanagari', serif"
      >
        ॐ
      </text>
    </svg>
  );
}

/* ── Diya, oil lamp with flame ──────────────────────────── */
export function Diya({ className = "w-8 h-8", title }: MotifProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...a11y(title)}>
      <path
        d="M32 12c0 6.6 5.2 8 5.2 13.6 0 3.4-2.4 5.8-5.2 5.8s-5.2-2.4-5.2-5.8C26.8 20 32 18.6 32 12Z"
        fill="currentColor"
        opacity="0.9"
      />
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 38h44c0 8.4-9.8 13-22 13s-22-4.6-22-13Z" />
        <path d="M18 38c2.6-2.4 8-3.8 14-3.8s11.4 1.4 14 3.8" />
      </g>
    </svg>
  );
}

/* ── Trishul, the trident carried by the akhadas ────────── */
export function Trishul({ className = "w-8 h-8", title }: MotifProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...a11y(title)}>
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 6v52" />
        <path d="M18 8v10c0 5.6 5.6 8.6 14 8.6s14-3 14-8.6V8" />
        <path d="M18 8l-3.4 6M46 8l3.4 6M32 6l-3 5M32 6l3 5" />
        <path d="M25 44h14" />
      </g>
    </svg>
  );
}

/* ── Lotus ───────────────────────────────────────────────── */
export function Lotus({ className = "w-8 h-8", title }: MotifProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...a11y(title)}>
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 16c4.4 5.4 6.4 10.8 6.4 18H25.6c0-7.2 2-12.6 6.4-18Z" />
        <path d="M38.4 34c6-3.2 11.4-4 17.6-2.6-2.6 7.2-8 11.6-15.4 12.6M25.6 34c-6-3.2-11.4-4-17.6-2.6 2.6 7.2 8 11.6 15.4 12.6" />
        <path d="M8 31.4C14.6 36.8 22 44 32 44s17.4-7.2 24-12.6" />
      </g>
    </svg>
  );
}

/* ── Sun mandala, radial rays around a disc ─────────────── */
export function SunMandala({ className = "w-24 h-24", title }: MotifProps) {
  const rays = Array.from({ length: 32 }, (_, i) => {
    const angle = (i * 360) / 32;
    const long = i % 2 === 0;
    return (
      <line
        key={i}
        x1="60"
        y1={long ? 16 : 21}
        x2="60"
        y2="30"
        transform={`rotate(${angle} 60 60)`}
        strokeWidth={long ? 2 : 1.2}
      />
    );
  });

  return (
    <svg viewBox="0 0 120 120" className={className} {...a11y(title)}>
      <g stroke="currentColor" strokeLinecap="round" fill="none">
        {rays}
        <circle cx="60" cy="60" r="26" strokeWidth="1.6" />
        <circle cx="60" cy="60" r="20" strokeWidth="1" opacity="0.6" />
      </g>
    </svg>
  );
}

/* ── Warli figure, the folk stick-and-triangle human ────── */
export function WarliFigure({
  x = 0,
  y = 0,
  scale = 1,
  pose = "walk",
}: {
  x?: number;
  y?: number;
  scale?: number;
  pose?: "walk" | "pray" | "dance" | "carry";
}) {
  const arms =
    pose === "pray"
      ? "M-5 9 L0 3 L5 9"
      : pose === "dance"
        ? "M-9 4 L0 9 L9 4"
        : pose === "carry"
          ? "M-8 6 L0 9 L8 6 M-8 6 L-8 1 M8 6 L8 1"
          : "M-8 14 L0 9 L7 13";

  const legs =
    pose === "dance"
      ? "M0 21 L-7 33 M0 21 L7 33"
      : pose === "pray"
        ? "M0 21 L-4 33 M0 21 L4 33"
        : "M0 21 L-6 33 M0 21 L6 33";

  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6 / scale}
      strokeLinecap="round"
    >
      <circle cx="0" cy="-4" r="4" />
      {/* twin triangles, the Warli torso */}
      <path d="M0 0 L-7 10 L7 10 Z" />
      <path d="M0 21 L-7 11 L7 11 Z" />
      <path d={arms} />
      <path d={legs} />
    </g>
  );
}

/* ── Shikhara, a temple spire, used to build skylines ───── */
export function Shikhara({
  x,
  baseY,
  width,
  height,
  showKalash = true,
}: {
  x: number;
  baseY: number;
  width: number;
  height: number;
  showKalash?: boolean;
}) {
  const hw = width / 2;
  const topY = baseY - height;
  const neck = hw * 0.36;
  const shoulderY = topY + height * 0.17;

  // A shikhara, not an onion: near-vertical lower walls, a gentle inward
  // curve, and a flat shoulder wide enough to carry the amalaka.
  const d = [
    `M ${x - hw} ${baseY}`,
    `L ${x - hw} ${baseY - height * 0.1}`,
    `C ${x - hw * 0.97} ${baseY - height * 0.42}, ${x - neck * 1.3} ${baseY - height * 0.72}, ${x - neck} ${shoulderY}`,
    `L ${x + neck} ${shoulderY}`,
    `C ${x + neck * 1.3} ${baseY - height * 0.72}, ${x + hw * 0.97} ${baseY - height * 0.42}, ${x + hw} ${baseY - height * 0.1}`,
    `L ${x + hw} ${baseY}`,
    "Z",
  ].join(" ");

  // Tier bands, drawn in light so they read on any fill colour.
  const tiers = [0.24, 0.42, 0.58].map((f) => {
    const y = baseY - height * f;
    const halfWidth = hw * (1 - f * 0.72);
    return { y, halfWidth };
  });

  return (
    <g>
      <path d={d} fill="currentColor" />

      {tiers.map((tier) => (
        <rect
          key={tier.y}
          x={x - tier.halfWidth}
          y={tier.y}
          width={tier.halfWidth * 2}
          height={Math.max(1, height * 0.012)}
          fill="#FBF6EC"
          opacity="0.16"
        />
      ))}

      {/* amalaka disc, then the finial kalash */}
      <ellipse cx={x} cy={shoulderY} rx={neck * 1.45} ry={height * 0.032} fill="currentColor" />
      <ellipse cx={x} cy={shoulderY - height * 0.05} rx={neck * 0.95} ry={height * 0.026} fill="currentColor" />
      {showKalash && (
        <>
          <rect
            x={x - hw * 0.05}
            y={topY + height * 0.03}
            width={hw * 0.1}
            height={height * 0.09}
            fill="currentColor"
          />
          <circle cx={x} cy={topY + height * 0.02} r={hw * 0.13} fill="currentColor" />
          <path
            d={`M ${x} ${topY + height * 0.02} L ${x} ${topY - height * 0.04}`}
            stroke="currentColor"
            strokeWidth={Math.max(1, hw * 0.05)}
            strokeLinecap="round"
          />
        </>
      )}
    </g>
  );
}

/* ── Pattachitra-style border strip ──────────────────────── */
export function BorderStrip({ className = "w-full h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 16" className={className} preserveAspectRatio="none" aria-hidden focusable="false">
      <defs>
        <pattern id="patta" width="24" height="16" patternUnits="userSpaceOnUse">
          <path
            d="M0 8 Q6 1 12 8 T24 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
            opacity="0.75"
          />
          <circle cx="12" cy="8" r="1.5" fill="currentColor" opacity="0.55" />
          <circle cx="0" cy="8" r="1" fill="currentColor" opacity="0.35" />
        </pattern>
      </defs>
      <rect width="240" height="16" fill="url(#patta)" />
    </svg>
  );
}

/* ── Wave rule, a slim Godavari divider ─────────────────── */
export function WaveRule({ className = "w-full h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 24" className={className} preserveAspectRatio="none" aria-hidden focusable="false">
      <path d="M0 14 Q25 4 50 14 T100 14 T150 14 T200 14 T250 14 T300 14 T350 14 T400 14" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.7" />
      <path d="M0 20 Q25 11 50 20 T100 20 T150 20 T200 20 T250 20 T300 20 T350 20 T400 20" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
    </svg>
  );
}
