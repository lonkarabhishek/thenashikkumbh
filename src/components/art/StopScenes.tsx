import { Shikhara, WarliFigure } from "./Motifs";

/**
 * One illustration per story stop, in the same flat screen-print language as
 * the rest of the site. Each picks out the single detail its story turns on —
 * the empty plinth where Kapaleshwar's Nandi should be, the shut gate at
 * Kalaram, the three small faces at Trimbakeshwar — so the card is a cue for
 * what you are about to hear rather than generic decoration.
 *
 * All share a 400×240 frame so they crop identically in a card.
 */

const W = 400;
const H = 240;

type ArtProps = { className?: string };

const PAPER = "#FBF6EC";
const INK = "#33271E";
const STONE = "#23395F";
const STONE_DARK = "#121D31";
const STEP_A = "#E2CEAC";
const STEP_B = "#EDDFC7";
const WATER = "#6FBDB8";
const WATER_DEEP = "#2E8B87";
const SAFFRON = "#E07B14";
const GOLD = "#C9A227";
const HILL = "#AFC0DD";

function Frame({ children, tint = PAPER }: { children: React.ReactNode; tint?: string }) {
  return (
    <>
      <rect width={W} height={H} fill={tint} />
      {children}
    </>
  );
}

/** A low sun disc with a few rays — used where a scene needs a horizon. */
function Sun({ cx, cy, r = 26 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 10} fill={SAFFRON} opacity="0.14" />
      <circle cx={cx} cy={cy} r={r} fill={SAFFRON} opacity="0.9" />
    </g>
  );
}

/** Descending ghat steps filling the lower part of a frame. */
function Steps({ top, count = 4, height = 14 }: { top: number; count?: number; height?: number }) {
  return (
    <g>
      {Array.from({ length: count }, (_, i) => (
        <rect
          key={i}
          x="0"
          y={top + i * height}
          width={W}
          height={height}
          fill={i % 2 === 0 ? STEP_A : STEP_B}
        />
      ))}
    </g>
  );
}

/* ── 1. Ram Kund — a son offering water ──────────────────── */
export function RamKundArt({ className }: ArtProps) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false">
      <Frame>
        <Sun cx={318} cy={52} r={22} />
        <g style={{ color: STONE }} opacity="0.85">
          <Shikhara x={64} baseY={116} width={40} height={72} />
          <Shikhara x={112} baseY={116} width={26} height={46} />
        </g>
        <rect x="0" y="116" width={W} height="10" fill={STEP_B} />
        <Steps top={126} count={4} />

        {/* the kund */}
        <rect x="0" y="182" width={W} height="58" fill={WATER} />
        <rect x="0" y="212" width={W} height="28" fill={WATER_DEEP} opacity="0.45" />
        <g stroke={PAPER} strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round">
          <path d="M28 200 q14-7 28 0 t28 0" />
          <path d="M256 218 q14-7 28 0 t28 0" />
        </g>

        {/* offering water from cupped hands */}
        <g style={{ color: INK }}>
          <WarliFigure x={168} y={182 - 33 * 1.5} scale={1.5} pose="pray" />
        </g>
        <g fill={WATER_DEEP}>
          <circle cx="196" cy="168" r="2.6" />
          <circle cx="200" cy="176" r="2" />
          <circle cx="194" cy="182" r="1.6" />
        </g>

        {/* a floating diya */}
        <g>
          <ellipse cx="316" cy="206" rx="14" ry="5" fill={STEP_B} />
          <path d="M316 199 c0 4 3 5 3 8a3 3 0 0 1-6 0c0-3 3-4 3-8Z" fill={SAFFRON} />
        </g>
      </Frame>
    </svg>
  );
}

/* ── 2. Kapaleshwar — the missing Nandi ──────────────────── */
export function KapaleshwarArt({ className }: ArtProps) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false">
      <Frame tint="#FCE9D2">
        <g style={{ color: STONE }}>
          <Shikhara x={244} baseY={168} width={86} height={128} />
        </g>
        {/* sanctum doorway, on the axis the bull would face down */}
        <path d="M228 168 v-40 a16 16 0 0 1 32 0 v40 Z" fill={STONE_DARK} />
        <rect x="180" y="168" width={128} height="12" fill={STONE} opacity="0.8" />

        <rect x="0" y="180" width={W} height="60" fill={STEP_A} />
        <rect x="0" y="180" width={W} height="3" fill="#D6C9B8" />

        {/* the empty plinth — drawn as an outline because nothing sits on it */}
        <rect
          x="96"
          y="186"
          width="76"
          height="26"
          rx="4"
          fill="none"
          stroke={INK}
          strokeWidth="2.4"
          strokeDasharray="6 6"
          opacity="0.55"
        />
        <text
          x="134"
          y="228"
          textAnchor="middle"
          fontSize="15"
          fill={INK}
          opacity="0.4"
          fontStyle="italic"
        >
          —
        </text>

        {/* the cow who told Shiva where to bathe — a filled silhouette, which
            reads better than outline at card size */}
        <g fill={INK}>
          {/* body and haunch */}
          <path d="M30 156 c0-9 8-15 20-15 h30 c10 0 16 5 18 12 l2 9 c1 6-3 10-9 10 h-52 c-7 0-9-4-9-10Z" />
          {/* neck and head */}
          <path d="M92 150 c8-2 13-6 16-12 l3-7 c1-3 5-4 7-1 l4 6 c2 3 1 6-2 8 l-9 6 c-4 3-9 5-14 5Z" />
          {/* horns */}
          <path d="M112 131 c-2-6-6-9-11-10 4-3 10-1 13 4Z" />
          <path d="M120 130 c2-6 6-10 12-11 -3-4-10-3-14 3Z" />
          {/* legs */}
          <rect x="38" y="172" width="7" height="26" rx="3" />
          <rect x="54" y="172" width="7" height="26" rx="3" />
          <rect x="74" y="172" width="7" height="26" rx="3" />
          <rect x="88" y="172" width="7" height="26" rx="3" />
          {/* tail */}
          <path d="M30 150 c-8 2-11 12-8 22 l4-1 c-2-8 0-15 6-17Z" />
        </g>
        <circle cx="118" cy="145" r="2" fill={PAPER} />
      </Frame>
    </svg>
  );
}

/* ── 3. Kalaram — the door that stayed shut ──────────────── */
export function KalaramArt({ className }: ArtProps) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false">
      <Frame>
        <g style={{ color: STONE_DARK }}>
          <Shikhara x={200} baseY={150} width={92} height={132} />
        </g>
        <g stroke={SAFFRON} strokeWidth="2.4" fill={SAFFRON}>
          <path d="M200 20 v-14" />
          <path d="M200 6 l24 7 l-24 7 Z" />
        </g>

        {/* courtyard colonnade — eighty-four pillars, suggested */}
        <rect x="40" y="150" width={320} height="8" fill={STONE_DARK} />
        <g stroke={STONE} strokeWidth="4" strokeLinecap="round">
          {[52, 76, 100, 124, 276, 300, 324, 348].map((x) => (
            <path key={x} d={`M${x} 158 v34`} />
          ))}
        </g>

        {/* the shut gate */}
        <rect x="168" y="158" width={64} height={40} fill={STONE} />
        <rect x="168" y="158" width={64} height={40} fill="none" stroke={STONE_DARK} strokeWidth="3" />
        <path d="M200 158 v40" stroke={STONE_DARK} strokeWidth="3" />
        <rect x="176" y="174" width={48} height="5" rx="2.5" fill={GOLD} />

        <rect x="0" y="198" width={W} height="42" fill={STEP_A} />
        <rect x="0" y="198" width={W} height="3" fill="#D6C9B8" />

        {/* the crowd that was kept outside */}
        <g style={{ color: INK }}>
          {[70, 104, 138, 262, 296, 330].map((x, i) => (
            <WarliFigure
              key={x}
              x={x}
              y={198 - 33 * 1.15}
              scale={1.15}
              pose={i % 2 === 0 ? "pray" : "walk"}
            />
          ))}
        </g>
      </Frame>
    </svg>
  );
}

/* ── 4. Sita Gufa — five banyans, one small door ─────────── */
export function SitaGufaArt({ className }: ArtProps) {
  const trees = [56, 128, 200, 272, 344];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false">
      <Frame tint="#F7F3ED">
        <g>
          {trees.map((x, i) => {
            const r = i === 2 ? 44 : 34;
            return (
              <g key={x}>
                <circle cx={x} cy={78} r={r} fill="#6FBDB8" opacity={i === 2 ? 0.4 : 0.3} />
                <circle cx={x - 14} cy={92} r={r * 0.6} fill="#2E8B87" opacity="0.22" />
                <circle cx={x + 15} cy={90} r={r * 0.55} fill="#2E8B87" opacity="0.22" />
                <rect x={x - 5} y={94} width="10" height={78} fill="#6B5847" />
                {/* aerial roots */}
                <g stroke="#6B5847" strokeWidth="1.6" opacity="0.55" strokeLinecap="round">
                  <path d={`M${x - 22} 100 v40`} />
                  <path d={`M${x + 20} 104 v34`} />
                </g>
              </g>
            );
          })}
        </g>

        <rect x="0" y="172" width={W} height="68" fill={STEP_A} />
        <rect x="0" y="172" width={W} height="3" fill="#D6C9B8" />

        {/* the cave mouth — deliberately small */}
        <path d="M180 172 v-26 a20 20 0 0 1 40 0 v26 Z" fill={STONE_DARK} />
        <rect x="176" y="172" width={48} height="7" fill="#B3A28C" />
        <rect x="172" y="179" width={56} height="7" fill="#D6C9B8" />

        {/* someone turning sideways to get in */}
        <g style={{ color: INK }}>
          <WarliFigure x={252} y={172 - 33 * 1.2} scale={1.2} pose="walk" />
        </g>
      </Frame>
    </svg>
  );
}

/* ── 5. Godavari Ghats — the crowd at the water ──────────── */
export function GodavariGhatsArt({ className }: ArtProps) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false">
      <Frame tint="#FCE9D2">
        <Sun cx={200} cy={44} r={24} />
        <g style={{ color: STONE }} opacity="0.75">
          <Shikhara x={58} baseY={104} width={34} height={58} />
          <Shikhara x={330} baseY={104} width={40} height={68} />
        </g>
        <rect x="0" y="104" width={W} height="8" fill={STEP_B} />
        <Steps top={112} count={4} height={13} />

        <g style={{ color: INK }}>
          {[
            [40, 125],
            [78, 125],
            [150, 151],
            [186, 151],
            [222, 151],
            [300, 138],
            [340, 164],
          ].map(([x, groundY], i) => (
            <WarliFigure
              key={`${x}-${groundY}`}
              x={x}
              y={groundY - 33 * 0.95}
              scale={0.95}
              pose={i % 3 === 0 ? "pray" : "walk"}
            />
          ))}
        </g>

        <rect x="0" y="164" width={W} height="76" fill={WATER} />
        <rect x="0" y="200" width={W} height="40" fill={WATER_DEEP} opacity="0.5" />
        <g stroke={PAPER} strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round">
          <path d="M40 186 q14-7 28 0 t28 0" />
          <path d="M250 214 q14-7 28 0 t28 0" />
        </g>
        <g>
          {[
            [110, 194],
            [214, 212],
            [318, 190],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <ellipse cx={x} cy={y} rx="12" ry="4.5" fill={STEP_B} />
              <path d={`M${x} ${y - 6} c0 3.5 2.6 4.5 2.6 7a2.6 2.6 0 0 1-5.2 0c0-2.5 2.6-3.5 2.6-7Z`} fill={SAFFRON} />
            </g>
          ))}
        </g>
      </Frame>
    </svg>
  );
}

/* ── 6. Kushavarta — the tank that holds the river ───────── */
export function KushavartaArt({ className }: ArtProps) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false">
      <Frame tint="#EDF7F6">
        <g style={{ color: STONE }} opacity="0.7">
          <Shikhara x={330} baseY={92} width={40} height={68} />
        </g>
        <rect x="0" y="92" width={W} height="148" fill="#E2CEAC" opacity="0.55" />

        {/* concentric steps down into the tank */}
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={64 + i * 18}
            y={104 + i * 13}
            width={272 - i * 36}
            height={112 - i * 26}
            rx="3"
            fill={i % 2 === 0 ? STEP_B : STEP_A}
            stroke="#D6C9B8"
            strokeWidth="1.5"
          />
        ))}
        <rect x={118} y={143} width={164} height={60} rx="2" fill={WATER} />
        <rect x={118} y={175} width={164} height={28} rx="2" fill={WATER_DEEP} opacity="0.45" />
        <g stroke={PAPER} strokeWidth="1.8" fill="none" opacity="0.6" strokeLinecap="round">
          <path d="M146 162 q12-6 24 0 t24 0" />
          <path d="M212 188 q12-6 24 0 t24 0" />
        </g>

        {/* the spout the Godavari arrives through */}
        <rect x="186" y="118" width="28" height="12" rx="3" fill={STONE} />
        <g fill={WATER_DEEP}>
          <circle cx="200" cy="136" r="2.6" />
          <circle cx="200" cy="145" r="2" />
        </g>

        {/* kusha grass, which is what tied the river down */}
        <g stroke="#1F6E6B" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8">
          {[52, 348].map((x) => (
            <g key={x}>
              <path d={`M${x} 214 c-4-16-2-26 2-34`} />
              <path d={`M${x} 214 c4-14 8-22 14-28`} />
              <path d={`M${x} 214 c-8-12-14-18-20-22`} />
            </g>
          ))}
        </g>
      </Frame>
    </svg>
  );
}

/* ── 7. Trimbakeshwar — three faces in a hollow ──────────── */
export function TrimbakeshwarArt({ className }: ArtProps) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false">
      <Frame>
        <path d="M0 118 L70 62 L140 118 Z" fill={HILL} opacity="0.7" />
        <path d="M258 118 L330 56 L400 118 Z" fill={HILL} opacity="0.7" />
        <g style={{ color: STONE }}>
          <Shikhara x={200} baseY={130} width={88} height={116} />
        </g>
        <rect x="120" y="130" width={160} height="12" fill={STONE} opacity="0.85" />
        <rect x="0" y="142" width={W} height="98" fill={STEP_A} />
        <rect x="0" y="142" width={W} height="3" fill="#D6C9B8" />

        {/* you look down into the linga, not up at it */}
        <ellipse cx="200" cy="192" rx="58" ry="30" fill={STONE_DARK} />
        <ellipse cx="200" cy="190" rx="46" ry="22" fill="#0B1220" />
        <g fill={GOLD}>
          <circle cx="184" cy="190" r="7" />
          <circle cx="200" cy="184" r="7" />
          <circle cx="216" cy="190" r="7" />
        </g>

        {/* the abhishek */}
        <g fill={WATER}>
          <circle cx="200" cy="160" r="2.6" opacity="0.8" />
          <circle cx="200" cy="170" r="2" opacity="0.6" />
        </g>

        <g style={{ color: INK }}>
          <WarliFigure x={62} y={142 - 33 * 1.1} scale={1.1} pose="pray" />
          <WarliFigure x={340} y={142 - 33 * 1.1} scale={1.1} pose="pray" />
        </g>
      </Frame>
    </svg>
  );
}

/* ── 8. Gangadwar — the climb to the spring ──────────────── */
export function GangadwarArt({ className }: ArtProps) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false">
      <Frame tint="#F7F3ED">
        <path d="M0 240 L0 150 C90 120 150 70 220 30 L400 30 L400 240 Z" fill={HILL} opacity="0.55" />
        <path d="M0 240 L0 186 C100 160 170 116 246 74 L400 74 L400 240 Z" fill={HILL} opacity="0.75" />

        {/* the stair */}
        <g stroke="#8C7860" strokeWidth="3" strokeLinecap="round" opacity="0.9">
          {Array.from({ length: 13 }, (_, i) => {
            const x = 40 + i * 24;
            const y = 214 - i * 12;
            return <path key={i} d={`M${x} ${y} h22`} />;
          })}
        </g>

        {/* the doorway at the top */}
        <path d="M330 66 v-26 a16 16 0 0 1 32 0 v26 Z" fill={STONE} />
        <path d="M338 66 v-20 a8 8 0 0 1 16 0 v20 Z" fill={STONE_DARK} />

        {/* stone cow-mouth spout and its basin */}
        <path d="M292 96 h26 l-6 12 h-20 Z" fill={STONE} />
        <g fill={WATER_DEEP}>
          <circle cx="302" cy="116" r="2.6" />
          <circle cx="302" cy="126" r="2" />
        </g>
        <ellipse cx="302" cy="140" rx="24" ry="9" fill={WATER} />

        <g style={{ color: INK }}>
          <WarliFigure x={112} y={182 - 33} scale={1} pose="walk" />
          <WarliFigure x={182} y={146 - 33} scale={1} pose="walk" />
        </g>
      </Frame>
    </svg>
  );
}

/* ── 9. Brahmagiri — one spring, three rivers ────────────── */
export function BrahmagiriArt({ className }: ArtProps) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false">
      <Frame tint="#EEF2F9">
        <Sun cx={200} cy={40} r={22} />
        <path d="M200 44 L52 200 L348 200 Z" fill={STONE} />
        <path d="M200 44 L128 200 L52 200 Z" fill="#2F4A7D" />
        <rect x="0" y="200" width={W} height="40" fill="#D6C9B8" />

        {/* the trident that stands for the hill being Shiva */}
        <g stroke={GOLD} strokeWidth="2.6" fill="none" strokeLinecap="round">
          <path d="M200 44 v-22" />
          <path d="M190 30 v-12 M210 30 v-12 M200 22 v-10" />
          <path d="M188 30 h24" />
        </g>

        {/* three streams leaving in three directions */}
        <g stroke={WATER_DEEP} strokeWidth="4" fill="none" strokeLinecap="round">
          <path d="M196 96 C170 130 150 168 118 210" />
          <path d="M204 96 C214 138 216 172 212 214" />
          <path d="M208 100 C244 132 274 166 306 208" />
        </g>
        <g stroke={WATER} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.9">
          <path d="M196 96 C170 130 150 168 118 210" />
          <path d="M204 96 C214 138 216 172 212 214" />
          <path d="M208 100 C244 132 274 166 306 208" />
        </g>

        <text x="112" y="228" textAnchor="middle" fontSize="13" fill="#1F6E6B" fontWeight="600">
          गोदावरी
        </text>
      </Frame>
    </svg>
  );
}

/* ── 10. Sadhugram — a city built to be taken down ───────── */
export function SadhugramArt({ className }: ArtProps) {
  const rows = [
    { y: 118, scale: 0.7, xs: [44, 104, 164, 224, 284, 344] },
    { y: 158, scale: 0.9, xs: [26, 100, 174, 248, 322, 390] },
    { y: 206, scale: 1.15, xs: [50, 150, 250, 350] },
  ];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false">
      <Frame tint="#F7F3ED">
        <rect x="0" y="96" width={W} height="144" fill="#E2CEAC" opacity="0.5" />
        <path d="M0 96 h400" stroke="#D6C9B8" strokeWidth="2" />

        {rows.map((row) =>
          row.xs.map((x) => {
            const w = 34 * row.scale;
            const h = 26 * row.scale;
            return (
              <g key={`${row.y}-${x}`}>
                <path
                  d={`M${x} ${row.y - h} L${x - w / 2} ${row.y} L${x + w / 2} ${row.y} Z`}
                  fill={PAPER}
                  stroke="#B3A28C"
                  strokeWidth="1.6"
                />
                <path d={`M${x} ${row.y - h} v${h}`} stroke="#D6C9B8" strokeWidth="1.4" />
                <path
                  d={`M${x} ${row.y - h} l0 -${6 * row.scale}`}
                  stroke={SAFFRON}
                  strokeWidth="1.6"
                />
              </g>
            );
          })
        )}

        {/* the water line and power poles that make it a city */}
        <path d="M0 186 h400" stroke={WATER_DEEP} strokeWidth="3" opacity="0.5" strokeDasharray="14 8" />
        <g stroke="#6B5847" strokeWidth="2" strokeLinecap="round">
          {[80, 200, 320].map((x) => (
            <g key={x}>
              <path d={`M${x} 128 v-30`} />
              <path d={`M${x - 8} 100 h16`} />
            </g>
          ))}
          <path d="M80 100 L200 100 L320 100" strokeWidth="1.2" opacity="0.6" />
        </g>

        <g style={{ color: INK }}>
          <WarliFigure x={110} y={222 - 33 * 0.9} scale={0.9} pose="carry" />
          <WarliFigure x={300} y={222 - 33 * 0.9} scale={0.9} pose="walk" />
        </g>
      </Frame>
    </svg>
  );
}

/* ── 11. Akhada camps — flags, tridents, an unbroken fire ── */
export function AkhadaCampsArt({ className }: ArtProps) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false">
      <Frame tint="#FCE9D2">
        <rect x="0" y="150" width={W} height="90" fill="#E2CEAC" opacity="0.6" />
        <path d="M0 150 h400" stroke="#D6C9B8" strokeWidth="2" />

        {/* the akhada's tent */}
        <path d="M200 44 L92 150 L308 150 Z" fill={PAPER} stroke="#B3A28C" strokeWidth="2" />
        <path d="M200 44 v106" stroke="#D6C9B8" strokeWidth="1.8" />
        <path d="M170 150 v-34 a30 30 0 0 1 60 0 v34 Z" fill="#9E4F09" opacity="0.18" />

        {/* its flag */}
        <g>
          <path d="M200 44 v-26" stroke="#9E4F09" strokeWidth="2.6" />
          <path d="M200 18 l26 8 l-26 8 Z" fill={SAFFRON} />
        </g>

        {/* tridents planted outside */}
        <g stroke={STONE} strokeWidth="2.6" fill="none" strokeLinecap="round">
          {[48, 66, 352].map((x) => (
            <g key={x}>
              <path d={`M${x} 150 v-52`} />
              <path d={`M${x - 8} 110 v-14 M${x + 8} 110 v-14 M${x} 98 v-16`} />
              <path d={`M${x - 9} 110 h18`} />
            </g>
          ))}
        </g>

        {/* the dhuni, never allowed to go out */}
        <ellipse cx="200" cy="196" rx="34" ry="11" fill="#B3A28C" />
        <ellipse cx="200" cy="194" rx="24" ry="7" fill="#6B5847" />
        <path
          d="M200 172 c0 10 8 12 8 20a8 8 0 0 1-16 0c0-8 8-10 8-20Z"
          fill={SAFFRON}
        />
        <path d="M200 178 c0 6 4 7 4 12a4 4 0 0 1-8 0c0-5 4-6 4-12Z" fill={GOLD} />
        <g stroke="#8C7860" strokeWidth="1.8" fill="none" opacity="0.5" strokeLinecap="round">
          <path d="M212 166 c8-10 0-18 6-26" />
        </g>

        <g style={{ color: INK }}>
          <WarliFigure x={128} y={224 - 33 * 0.95} scale={0.95} pose="pray" />
          <WarliFigure x={276} y={224 - 33 * 0.95} scale={0.95} pose="pray" />
        </g>
      </Frame>
    </svg>
  );
}

/* ── 12. Naga sadhus — ash, fire, and a trident ──────────── */
export function NagaSadhusArt({ className }: ArtProps) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false">
      <Frame tint="#F7F3ED">
        <circle cx="200" cy="112" r="86" fill={SAFFRON} opacity="0.1" />
        <rect x="0" y="196" width={W} height="44" fill="#E2CEAC" opacity="0.6" />
        <path d="M0 196 h400" stroke="#D6C9B8" strokeWidth="2" />

        {/* the trident, planted */}
        <g stroke={STONE} strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M312 196 v-108" />
          <path d="M300 102 v-18 M324 102 v-18 M312 88 v-20" />
          <path d="M298 102 h28" />
        </g>

        {/* the sadhu, seated */}
        <g stroke={INK} strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* jata, the matted top-knot */}
          <path d="M180 84 c-4-16 6-26 20-26 s24 10 20 26" fill="#8C7860" stroke="none" />
          <path d="M186 66 c2-10 8-14 14-14 M214 66 c-2-10-8-14-14-14" />
          <circle cx="200" cy="92" r="17" fill="#EBE3D8" />
          {/* body, ash-covered */}
          <path d="M200 109 L172 162 L228 162 Z" fill="#EBE3D8" />
          {/* crossed legs */}
          <path d="M156 178 C168 160 232 160 244 178 C232 190 168 190 156 178 Z" fill="#EBE3D8" />
          {/* arms resting on the knees */}
          <path d="M178 124 C160 136 158 156 164 172" />
          <path d="M222 124 C240 136 242 156 236 172" />
        </g>
        {/* rudraksha */}
        <g fill="#6B5847">
          {[-16, -8, 0, 8, 16].map((dx) => (
            <circle key={dx} cx={200 + dx} cy={114 + Math.abs(dx) * 0.35} r="2.6" />
          ))}
        </g>
        {/* tilak */}
        <g stroke={SAFFRON} strokeWidth="2" strokeLinecap="round">
          <path d="M195 84 v10 M200 83 v11 M205 84 v10" />
        </g>

        {/* the dhuni in front */}
        <ellipse cx="94" cy="186" rx="30" ry="10" fill="#B3A28C" />
        <ellipse cx="94" cy="184" rx="21" ry="6.5" fill="#6B5847" />
        <path d="M94 160 c0 11 9 13 9 22a9 9 0 0 1-18 0c0-9 9-11 9-22Z" fill={SAFFRON} />
        <path d="M94 167 c0 6.5 4.5 7.5 4.5 13a4.5 4.5 0 0 1-9 0c0-5.5 4.5-6.5 4.5-13Z" fill={GOLD} />
        <g stroke="#8C7860" strokeWidth="2" fill="none" opacity="0.45" strokeLinecap="round">
          <path d="M108 152 c10-12 0-22 8-32" />
          <path d="M80 148 c-9-10-1-19-7-27" />
        </g>
      </Frame>
    </svg>
  );
}

/* ── Dispatcher ──────────────────────────────────────────── */
const BY_STOP: Record<string, (props: ArtProps) => JSX.Element> = {
  ramkund: RamKundArt,
  kapaleshwar: KapaleshwarArt,
  kalaram: KalaramArt,
  "sita-gufa": SitaGufaArt,
  "godavari-ghats": GodavariGhatsArt,
  kushavarta: KushavartaArt,
  trimbakeshwar: TrimbakeshwarArt,
  gangadwar: GangadwarArt,
  brahmagiri: BrahmagiriArt,
  sadhugram: SadhugramArt,
  "akhada-camps": AkhadaCampsArt,
  "naga-sadhus": NagaSadhusArt,
};

/** The illustration for a stop, falling back to the ghats if one is missing. */
export function StopArt({ stopId, className }: { stopId: string; className?: string }) {
  const Art = BY_STOP[stopId] ?? GodavariGhatsArt;
  return <Art className={className} />;
}

export function hasStopArt(stopId: string): boolean {
  return stopId in BY_STOP;
}
