import { Shikhara, WarliFigure } from "./Motifs";

/**
 * Full illustrated scenes, drawn as flat screen-prints: a limited palette,
 * crisp edges, no gradients doing the heavy lifting. They carry the pages
 * where photographs used to, and weigh a few kilobytes each.
 *
 * Gradient/ pattern ids are namespaced with `uid` so two scenes can coexist.
 */

/* ── Hero: the ghats at dawn ─────────────────────────────── */
export function GhatPanorama({
  className = "w-full h-auto",
  uid = "ghat",
}: {
  className?: string;
  uid?: string;
}) {
  const steps = [0, 1, 2, 3, 4];

  return (
    <svg viewBox="0 0 1200 620" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBF6EC" />
          <stop offset="55%" stopColor="#FCE9D2" />
          <stop offset="100%" stopColor="#F8D0A3" />
        </linearGradient>
        <linearGradient id={`${uid}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6FBDB8" />
          <stop offset="100%" stopColor="#2E8B87" />
        </linearGradient>
      </defs>

      <rect width="1200" height="620" fill={`url(#${uid}-sky)`} />

      {/* Sun and its ray mandala */}
      <g transform="translate(600 208)">
        <g stroke="#EE9739" strokeLinecap="round" opacity="0.5">
          {Array.from({ length: 36 }, (_, i) => (
            <line
              key={i}
              x1="0"
              y1={i % 2 === 0 ? -152 : -140}
              x2="0"
              y2="-112"
              strokeWidth={i % 2 === 0 ? 2.4 : 1.2}
              transform={`rotate(${(i * 360) / 36})`}
            />
          ))}
        </g>
        <circle r="98" fill="#EE9739" opacity="0.16" />
        <circle r="78" fill="#EE9739" />
      </g>

      {/* Birds */}
      <g stroke="#33271E" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.45">
        <path d="M180 128q10-9 20 0q10-9 20 0" />
        <path d="M244 168q7-6 14 0q7-6 14 0" />
        <path d="M962 148q9-8 18 0q9-8 18 0" />
        <path d="M1030 110q7-6 14 0q7-6 14 0" />
      </g>

      {/* Brahmagiri hills behind the town */}
      <path
        d="M0 330 L90 266 L152 302 L252 230 L362 300 L432 272 L522 320 L642 258 L742 310 L862 248 L982 306 L1082 270 L1200 316 L1200 400 L0 400 Z"
        fill="#AFC0DD"
      />
      <path
        d="M0 358 L142 312 L262 352 L382 306 L522 354 L662 318 L822 358 L962 322 L1100 354 L1200 338 L1200 404 L0 404 Z"
        fill="#7E97C3"
        opacity="0.75"
      />

      {/* Temple skyline */}
      <g style={{ color: "#23395F" }}>
        <Shikhara x={188} baseY={396} width={78} height={132} />
        <Shikhara x={262} baseY={396} width={48} height={86} />
        <Shikhara x={600} baseY={396} width={124} height={214} />
        <Shikhara x={512} baseY={396} width={58} height={104} />
        <Shikhara x={688} baseY={396} width={58} height={104} />
        <Shikhara x={946} baseY={396} width={88} height={152} />
        <Shikhara x={1022} baseY={396} width={46} height={82} />
      </g>

      {/* Flags on the tallest spire */}
      <g stroke="#C4650B" strokeWidth="2.5" fill="#E07B14">
        <path d="M600 182 L600 150" />
        <path d="M600 152 L636 162 L600 172 Z" />
      </g>

      {/* Ghat retaining wall */}
      <rect x="0" y="396" width="1200" height="30" fill="#EDDFC7" />
      <rect x="0" y="396" width="1200" height="3" fill="#D6C9B8" />

      {/* Arched pavilions along the wall */}
      <g fill="#23395F" opacity="0.9">
        {[70, 340, 830, 1120].map((x) => (
          <g key={x}>
            <path d={`M${x - 26} 396 L${x - 26} 372 a26 26 0 0 1 52 0 L${x + 26} 396 Z`} />
            <path d={`M${x - 32} 372 L${x + 32} 372 L${x} 344 Z`} />
          </g>
        ))}
      </g>

      {/* Ghat steps */}
      {steps.map((i) => (
        <g key={i}>
          <rect
            x="0"
            y={426 + i * 22}
            width="1200"
            height="22"
            fill={i % 2 === 0 ? "#E2CEAC" : "#EDDFC7"}
          />
          <rect x="0" y={426 + i * 22} width="1200" height="1.5" fill="#D6C9B8" />
        </g>
      ))}

      {/* Pilgrims on the steps. A figure's feet sit at y + 33·scale, so each is
          offset back from the step it stands on. */}
      <g style={{ color: "#33271E" }}>
        {(
          [
            [126, 448, "walk"],
            [182, 448, "carry"],
            [318, 514, "pray"],
            [380, 514, "pray"],
            [442, 514, "walk"],
            [726, 470, "dance"],
            [790, 470, "walk"],
            [886, 536, "pray"],
            [952, 536, "pray"],
            [1082, 448, "walk"],
            [1030, 492, "carry"],
          ] as const
        ).map(([x, groundY, pose], i) => {
          const scale = 1.18 + (i % 3) * 0.09;
          return (
            <WarliFigure
              key={`${x}-${groundY}`}
              x={x}
              y={groundY - 33 * scale}
              scale={scale}
              pose={pose}
            />
          );
        })}
      </g>

      {/* The Godavari */}
      <rect x="0" y="536" width="1200" height="84" fill={`url(#${uid}-water)`} />

      {/* Sun reflection, breaking up as it comes towards the near bank */}
      <g fill="#F4B36C">
        {[
          [554, 58, 0.3],
          [578, 40, 0.2],
          [600, 24, 0.13],
        ].map(([y, half, opacity]) => (
          <rect
            key={y}
            x={600 - half}
            y={y}
            width={half * 2}
            height="5"
            rx="2.5"
            opacity={opacity}
          />
        ))}
      </g>

      {/* Ripples */}
      <g stroke="#FEFCF8" strokeWidth="1.6" fill="none" opacity="0.55" strokeLinecap="round">
        <path d="M40 558 q18-8 36 0 t36 0" />
        <path d="M210 592 q18-8 36 0 t36 0" />
        <path d="M900 556 q18-8 36 0 t36 0" />
        <path d="M1040 594 q18-8 36 0 t36 0" />
        <path d="M420 604 q18-8 36 0 t36 0" />
      </g>

      {/* Floating diyas */}
      <g>
        {[
          [150, 574],
          [330, 556],
          [790, 580],
          [990, 560],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <ellipse cx={x} cy={y} rx="13" ry="5" fill="#EDDFC7" />
            <path d={`M${x} ${y - 6} c0 4 3 5 3 8a3 3 0 0 1-6 0c0-3 3-4 3-8Z`} fill="#E07B14" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ── Compact skyline band, for section headers ───────────── */
export function TempleSkyline({
  className = "w-full h-auto",
  tone = "#23395F",
}: {
  className?: string;
  tone?: string;
}) {
  return (
    <svg viewBox="0 0 1200 160" className={className} preserveAspectRatio="none" aria-hidden focusable="false">
      <g fill={tone} style={{ color: tone }}>
        <Shikhara x={120} baseY={160} width={62} height={104} />
        <Shikhara x={180} baseY={160} width={38} height={68} />
        <Shikhara x={420} baseY={160} width={84} height={140} />
        <Shikhara x={488} baseY={160} width={44} height={76} />
        <Shikhara x={760} baseY={160} width={54} height={94} />
        <Shikhara x={1010} baseY={160} width={72} height={122} />
        <Shikhara x={1074} baseY={160} width={40} height={70} />
        <rect x="0" y="146" width="1200" height="14" />
      </g>
    </svg>
  );
}

/* ── River band — a section divider you can stack on cream ─ */
export function RiverBand({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 90" className={className} preserveAspectRatio="none" aria-hidden focusable="false">
      <path d="M0 34 C180 8 300 60 480 40 C660 20 780 66 960 46 C1080 32 1140 44 1200 38 L1200 90 L0 90 Z" fill="#A6D8D4" />
      <path d="M0 52 C200 30 320 74 500 58 C680 42 800 80 980 62 C1090 52 1150 60 1200 56 L1200 90 L0 90 Z" fill="#2E8B87" />
      <g stroke="#FEFCF8" strokeWidth="1.6" fill="none" opacity="0.5" strokeLinecap="round">
        <path d="M120 74 q16-7 32 0 t32 0" />
        <path d="M520 78 q16-7 32 0 t32 0" />
        <path d="M900 76 q16-7 32 0 t32 0" />
      </g>
    </svg>
  );
}

/* ── Samudra Manthan — why the Kumbh happens at all ──────── */
export function SamudraManthan({
  className = "w-full h-auto",
  uid = "manthan",
}: {
  className?: string;
  uid?: string;
}) {
  return (
    <svg viewBox="0 0 640 420" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id={`${uid}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6FBDB8" />
          <stop offset="100%" stopColor="#1F6E6B" />
        </linearGradient>
      </defs>

      <rect width="640" height="420" fill="#FBF6EC" />

      {/* halo around the rising pot */}
      <circle cx="320" cy="128" r="104" fill="#EE9739" opacity="0.13" />
      <circle
        cx="320"
        cy="128"
        r="120"
        fill="none"
        stroke="#D2B94F"
        strokeWidth="1.4"
        strokeDasharray="3 9"
        opacity="0.7"
      />

      {/* Mount Mandara — the churning rod */}
      <path d="M320 108 L238 300 L402 300 Z" fill="#23395F" />
      <path d="M258 178 L200 300 L316 300 Z" fill="#2F4A7D" />
      <path d="M386 192 L338 300 L436 300 Z" fill="#2F4A7D" />

      {/* Vasuki, the serpent rope, wound once round the mountain */}
      <g fill="none" strokeLinecap="round">
        <path
          d="M96 250 C168 226 214 262 262 244 C300 230 340 230 378 244 C426 262 472 226 544 250"
          stroke="#9E4F09"
          strokeWidth="10"
        />
        <path
          d="M96 250 C168 226 214 262 262 244 C300 230 340 230 378 244 C426 262 472 226 544 250"
          stroke="#F4B36C"
          strokeWidth="3"
          strokeDasharray="2 15"
          opacity="0.9"
        />
      </g>
      {/* serpent head, turned back towards the pull */}
      <g fill="#9E4F09">
        <path d="M96 250 c-14-8-28-4-33 5 -5 9 3 18 15 18 8 0 15-4 18-10Z" />
        <circle cx="76" cy="256" r="2.6" fill="#FBF6EC" />
      </g>

      {/* the amrit kalash, clear of the peak so it reads as risen from it */}
      <g transform="translate(320 26)">
        <path d="M-9 -10 c-4 0-7 3-7 6s3 6 7 6h18c4 0 7-3 7-6s-3-6-7-6Z" fill="#E07B14" />
        <path d="M-22 4 h44 l-4 8 h-36 Z" fill="#C9A227" />
        <path d="M-18 12 c-7 6-11 13-11 22 0 13 13 22 29 22 s29-9 29-22c0-9-4-16-11-22" fill="#C9A227" />
        <circle cy="33" r="7" fill="#FBF6EC" opacity="0.9" />
      </g>

      {/* four drops — the four Kumbh cities */}
      <g fill="#E07B14">
        {[
          [176, 128],
          [464, 128],
          [140, 196],
          [500, 196],
        ].map(([x, y]) => (
          <path
            key={`${x}-${y}`}
            d={`M${x} ${y} c6 9 9 13 9 17a9 9 0 0 1-18 0c0-4 3-8 9-17Z`}
          />
        ))}
      </g>

      {/* devas pulling one end, asuras the other */}
      <g style={{ color: "#33271E" }}>
        {[52, 100, 148, 492, 540, 588].map((x) => (
          <WarliFigure key={x} x={x} y={300 - 66} scale={2} pose="carry" />
        ))}
      </g>

      {/* the ocean of milk */}
      <path
        d="M0 302 C120 284 200 320 320 304 C440 288 520 322 640 306 L640 420 L0 420 Z"
        fill={`url(#${uid}-sea)`}
      />
      <g stroke="#FEFCF8" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round">
        <path d="M64 352 q18-9 36 0 t36 0" />
        <path d="M292 372 q18-9 36 0 t36 0" />
        <path d="M492 356 q18-9 36 0 t36 0" />
      </g>
    </svg>
  );
}

/* ── A pilgrim walking with the audio guide ──────────────── */
export function WalkingPilgrim({ className = "w-full h-auto" }: { className?: string }) {
  const groundY = 236;
  const scale = 3.1;
  const originY = groundY - 33 * scale;
  const originX = 196;
  // Head and right hand, in scene coordinates, from the WarliFigure geometry.
  const head = { x: originX, y: originY - 4 * scale };
  const hand = { x: originX + 7 * scale, y: originY + 13 * scale };

  return (
    <svg viewBox="0 0 420 320" className={className} aria-hidden focusable="false">
      <circle cx="210" cy="158" r="126" fill="#FCE9D2" />

      {/* the town she is walking through */}
      <g style={{ color: "#AFC0DD" }} opacity="0.9">
        <Shikhara x={112} baseY={236} width={40} height={72} />
        <Shikhara x={306} baseY={236} width={52} height={94} />
        <Shikhara x={348} baseY={236} width={30} height={52} />
      </g>

      <path d="M76 236 h268" stroke="#D6C9B8" strokeWidth="3" strokeLinecap="round" />

      {/* the walker, in the same folk hand as the rest of the site */}
      <g style={{ color: "#33271E" }}>
        <WarliFigure x={originX} y={originY} scale={scale} pose="walk" />
      </g>

      {/* headphones — a band over the crown and a pad at each ear, so they read
          as headphones rather than eyes */}
      <g fill="none" stroke="#23395F" strokeWidth="3" strokeLinecap="round">
        <path d={`M ${head.x - 17} ${head.y} A 17 17 0 0 1 ${head.x + 17} ${head.y}`} />
      </g>
      <g fill="#23395F">
        <rect x={head.x - 20} y={head.y - 3} width="6" height="11" rx="3" />
        <rect x={head.x + 14} y={head.y - 3} width="6" height="11" rx="3" />
        <rect x={hand.x - 7} y={hand.y - 11} width="15" height="24" rx="3.5" />
      </g>
      <path
        d={`M ${head.x + 17} ${head.y + 8} C ${head.x + 24} ${head.y + 30}, ${hand.x - 4} ${hand.y - 30}, ${hand.x} ${hand.y - 12}`}
        fill="none"
        stroke="#23395F"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* the story arriving */}
      <g stroke="#E07B14" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d={`M ${head.x + 30} ${head.y - 11} A 15 15 0 0 1 ${head.x + 30} ${head.y + 11}`} />
        <path
          d={`M ${head.x + 42} ${head.y - 19} A 26 26 0 0 1 ${head.x + 42} ${head.y + 19}`}
          opacity="0.6"
        />
        <path
          d={`M ${head.x + 54} ${head.y - 27} A 37 37 0 0 1 ${head.x + 54} ${head.y + 27}`}
          opacity="0.32"
        />
      </g>

      {/* two small marks of what she is hearing about, drawn inline so they
          stay in this SVG's coordinate space */}
      <g stroke="#C9A227" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.8">
        {/* a lotus */}
        <g transform="translate(104 96)">
          <path d="M0 -14 c5 6 7 12 7 20h-14c0-8 2-14 7-20Z" />
          <path d="M7 6 c8-4 15-5 23-3-4 10-11 15-21 17M-7 6 c-8-4-15-5-23-3 4 10 11 15 21 17" />
        </g>
        {/* a diya */}
        <g transform="translate(318 92)">
          <path d="M0 -16 c0 5 4 6 4 10a4 4 0 0 1-8 0c0-4 4-5 4-10Z" fill="#E07B14" stroke="none" />
          <path d="M-16 2h32c0 6-7 9-16 9s-16-3-16-9Z" />
        </g>
      </g>
    </svg>
  );
}

/* ── Akhada procession strip ─────────────────────────────── */
export function ProcessionBand({ className = "w-full h-auto" }: { className?: string }) {
  const marchers = [40, 96, 152, 208, 264, 320, 376, 432, 488, 544, 600, 656, 712, 768, 824, 880, 936, 992, 1048, 1104, 1160];

  return (
    <svg viewBox="0 0 1200 120" className={className} preserveAspectRatio="xMidYMax slice" aria-hidden focusable="false">
      <g style={{ color: "#33271E" }} opacity="0.85">
        {marchers.map((x, i) => (
          <WarliFigure
            key={x}
            x={x}
            y={54}
            scale={1.05}
            pose={i % 4 === 0 ? "carry" : i % 3 === 0 ? "dance" : "walk"}
          />
        ))}
      </g>
      {/* banners raised above the line */}
      <g>
        {[96, 320, 600, 880, 1104].map((x) => (
          <g key={x}>
            <path d={`M${x} 44 L${x} 10`} stroke="#9E4F09" strokeWidth="2.5" />
            <path d={`M${x} 12 L${x + 30} 20 L${x} 28 Z`} fill="#E07B14" />
          </g>
        ))}
      </g>
      <path d="M0 118 h1200" stroke="#D6C9B8" strokeWidth="3" />
    </svg>
  );
}
