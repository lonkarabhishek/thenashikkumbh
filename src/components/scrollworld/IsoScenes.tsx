import {
  IsoBox,
  IsoGround,
  IsoPerson,
  IsoPlate,
  IsoPyramid,
  IsoShadow,
  IsoShikhara,
  IsoSteps,
  IsoTent,
  IsoTree,
  iso,
} from "./IsoKit";

/**
 * Five isometric dioramas, little models of the Kumbh that the camera dives
 * into, one after another.
 *
 * Each scene is delivered as three layers so the engine can dolly them at
 * different rates: a backdrop, the model itself (kept as one coherent group so
 * its geometry never separates), and a few foreground objects that rush past
 * the lens. That's where the sense of depth comes from, not from taking the
 * model apart.
 */

/** Diorama footprint. Everything is authored on this square. */
const G = 260;

/** Fits the whole model in frame; dioramas float, so nothing is cropped. */
const DIORAMA_VB = "-262 -132 524 468";

function Model({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox={DIORAMA_VB}
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
      aria-hidden
      focusable="false"
    >
      {children}
    </svg>
  );
}

function Backdrop({
  id,
  stops,
  children,
}: {
  id: string;
  stops: [string, string][];
  children?: React.ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          {stops.map(([o, c]) => (
            <stop key={o} offset={o} stopColor={c} />
          ))}
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill={`url(#${id})`} />
      {children}
    </svg>
  );
}

function Foreground({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden
      focusable="false"
    >
      {children}
    </svg>
  );
}

/* ═══ 1 · Brahmagiri, the spring ══════════════════════════ */

function SourceBack() {
  return (
    <Backdrop
      id="iso1"
      stops={[
        ["0%", "#C7D5EC"],
        ["55%", "#E4EBF7"],
        ["100%", "#FBF0DE"],
      ]}
    >
      <circle cx="905" cy="180" r="60" fill="#F4B36C" opacity="0.7" />
      <g fill="#AFC0DD" opacity="0.45">
        <circle cx="230" cy="250" r="90" />
        <circle cx="330" cy="270" r="66" />
        <circle cx="1010" cy="330" r="74" />
      </g>
    </Backdrop>
  );
}

function SourceModel() {
  // A stepped cone: shrinking boxes stacked to a summit.
  const tiers = 7;
  const hill = Array.from({ length: tiers }, (_, i) => {
    const size = 150 - i * 18;
    const inset = (G - size) / 2;
    return { size, inset, z: i * 15 };
  });

  return (
    <Model>
      <IsoShadow w={G} d={G} />
      <IsoGround w={G} d={G} top="#D9C7A6" body="#8C7860" thickness={30} />

      {/* the three streams leaving the summit, cut into the slab */}
      <g>
        <IsoPlate x={110} y={126} w={40} d={134} color="#41A19C" />
        <IsoPlate x={24} y={112} w={92} d={26} color="#41A19C" />
        <IsoPlate x={148} y={110} w={96} d={26} color="#41A19C" />
      </g>

      <IsoTree x={44} y={214} scale={1.1} />
      <IsoTree x={214} y={196} scale={0.95} />
      <IsoTree x={30} y={64} scale={0.85} />

      {hill.map((tier, i) => (
        <IsoBox
          key={i}
          x={tier.inset}
          y={tier.inset}
          z={tier.z}
          w={tier.size}
          d={tier.size}
          h={15}
          color={i > 4 ? "#2F4A7D" : "#3D5C8C"}
          capped
        />
      ))}

      {/* the kund at the summit */}
      <IsoPlate x={118} y={118} z={105} w={24} d={24} color="#175452" />
      <IsoPlate x={121} y={121} z={106} w={18} d={18} color="#6FBDB8" />

      {/* The trident, the hill is treated as Shiva himself.
          The prongs straddle the x−y axis; putting them on x=y would collapse
          them onto the same screen column. */}
      {(() => {
        const shaftFoot = iso(130, 130, 104);
        const shaftTop = iso(130, 130, 182);
        const barL = iso(108, 152, 152);
        const barR = iso(152, 108, 152);
        const tipL = iso(108, 152, 180);
        const tipR = iso(152, 108, 180);
        return (
          <g stroke="#C9A227" strokeWidth="4.5" fill="none" strokeLinecap="round">
            <line x1={shaftFoot[0]} y1={shaftFoot[1]} x2={shaftTop[0]} y2={shaftTop[1]} />
            <line x1={barL[0]} y1={barL[1]} x2={barR[0]} y2={barR[1]} />
            <line x1={barL[0]} y1={barL[1]} x2={tipL[0]} y2={tipL[1]} />
            <line x1={barR[0]} y1={barR[1]} x2={tipR[0]} y2={tipR[1]} />
          </g>
        );
      })()}

      {/* pilgrims on the near corner of the slab, clear of the hill */}
      <IsoPerson x={56} y={212} scale={1.15} />
      <IsoPerson x={76} y={226} scale={1.15} />
      <IsoPerson x={186} y={222} scale={1.15} />
    </Model>
  );
}

function SourceFront() {
  return (
    <Foreground>
      <g stroke="#33271E" strokeWidth="3" fill="none" opacity="0.35" strokeLinecap="round">
        <path d="M150 120 q18-15 36 0 q18-15 36 0" />
        <path d="M980 150 q16-13 32 0 q16-13 32 0" />
      </g>
      <path d="M0 800 L0 690 C120 660 190 730 300 706 L340 800 Z" fill="#6B5847" opacity="0.9" />
      <path d="M1200 800 L1200 668 C1080 640 1010 720 900 692 L862 800 Z" fill="#6B5847" opacity="0.9" />
    </Foreground>
  );
}

/* ═══ 2 · Trimbakeshwar, the temple ═══════════════════════ */

function TempleBack() {
  return (
    <Backdrop
      id="iso2"
      stops={[
        ["0%", "#FBF6EC"],
        ["58%", "#FCE9D2"],
        ["100%", "#F6C489"],
      ]}
    >
      <circle cx="600" cy="270" r="150" fill="#EE9739" opacity="0.16" />
      <circle cx="600" cy="270" r="96" fill="#EE9739" opacity="0.42" />
      <path
        d="M0 560 L200 440 L360 540 L540 420 L740 545 L920 445 L1100 555 L1200 505 L1200 800 L0 800 Z"
        fill="#AFC0DD"
        opacity="0.6"
      />
    </Backdrop>
  );
}

function TempleModel() {
  return (
    <Model>
      <IsoShadow w={G} d={G} />
      <IsoGround w={G} d={G} top="#EDDFC7" body="#B3A28C" thickness={30} />

      {/* courtyard wall */}
      <IsoBox x={0} y={0} w={G} d={10} h={16} color="#D6C9B8" />
      <IsoBox x={0} y={0} w={10} d={G} h={16} color="#D6C9B8" />

      {/* the Kushavarta tank, sunk into the near corner */}
      <IsoPlate x={22} y={158} w={86} d={80} color="#B3A28C" />
      <IsoBox x={28} y={164} z={-14} w={74} d={68} h={14} color="#C7B79E" capped={false} />
      <IsoPlate x={28} y={164} z={-14} w={74} d={68} color="#2E8B87" />
      <IsoPlate x={34} y={170} z={-13} w={62} d={56} color="#41A19C" />

      <IsoPerson x={20} y={150} />
      <IsoPerson x={112} y={166} />

      {/* the temple platform and its spires */}
      <IsoBox x={112} y={40} w={126} d={126} h={18} color="#C7B79E" />
      <IsoShikhara x={140} y={68} z={18} base={70} h={116} color="#2F4A7D" flag="#E07B14" />
      <IsoShikhara x={118} y={46} z={18} base={26} h={44} color="#3D5C8C" />
      <IsoShikhara x={210} y={46} z={18} base={26} h={44} color="#3D5C8C" />
      <IsoShikhara x={118} y={138} z={18} base={26} h={44} color="#3D5C8C" />

      <IsoTree x={70} y={44} scale={0.9} />
      <IsoTree x={246} y={190} scale={1.05} />
      <IsoPerson x={150} y={186} />
      <IsoPerson x={170} y={196} />
      <IsoPerson x={196} y={182} />
    </Model>
  );
}

function TempleFront() {
  return (
    <Foreground>
      <g fill="#C9A227" opacity="0.5">
        <circle cx="120" cy="640" r="7" />
        <circle cx="1080" cy="600" r="6" />
        <circle cx="250" cy="740" r="5" />
      </g>
      <path d="M0 800 L0 716 C110 690 176 754 286 730 L318 800 Z" fill="#B3A28C" opacity="0.8" />
      <path d="M1200 800 L1200 700 C1090 676 1024 742 916 716 L884 800 Z" fill="#B3A28C" opacity="0.8" />
    </Foreground>
  );
}

/* ═══ 3 · Panchavati, the ghats ═══════════════════════════ */

function GhatsBack() {
  return (
    <Backdrop
      id="iso3"
      stops={[
        ["0%", "#FCE9D2"],
        ["55%", "#F8D0A3"],
        ["100%", "#EFAE68"],
      ]}
    >
      <circle cx="600" cy="290" r="118" fill="#E07B14" opacity="0.6" />
      <g stroke="#EE9739" strokeLinecap="round" opacity="0.4">
        {Array.from({ length: 26 }, (_, i) => (
          <line
            key={i}
            x1="600"
            y1="146"
            x2="600"
            y2="172"
            strokeWidth={i % 2 === 0 ? 3 : 1.6}
            transform={`rotate(${(i * 360) / 26} 600 290)`}
          />
        ))}
      </g>
    </Backdrop>
  );
}

function GhatsModel() {
  const crowdUpper: [number, number][] = [
    [40, 46],
    [64, 40],
    [92, 52],
    [150, 44],
    [186, 50],
    [220, 42],
  ];
  const crowdSteps: [number, number][] = [
    [46, 110],
    [78, 122],
    [112, 132],
    [150, 118],
    [186, 128],
    [214, 112],
    [64, 146],
    [128, 152],
    [196, 148],
  ];

  return (
    <Model>
      <IsoShadow w={G} d={G} />
      <IsoGround w={G} d={G} top="#EDDFC7" body="#B3A28C" thickness={30} />

      {/* temple terrace at the back of the model */}
      <IsoBox x={0} y={0} w={G} d={34} h={22} color="#D6C9B8" />
      <IsoShikhara x={26} y={2} z={22} base={44} h={78} color="#2F4A7D" />
      <IsoShikhara x={104} y={0} z={22} base={58} h={104} color="#23395F" flag="#E07B14" />
      <IsoShikhara x={192} y={2} z={22} base={40} h={70} color="#2F4A7D" />

      {/* arched pavilions along the wall */}
      {[8, 232].map((x) => (
        <g key={x}>
          <IsoBox x={x} y={40} z={0} w={20} d={20} h={26} color="#C7B79E" />
          <IsoPyramid x={x - 2} y={38} z={26} w={24} d={24} h={18} color="#2F4A7D" />
        </g>
      ))}

      {crowdUpper.map(([x, y]) => (
        <IsoPerson key={`u-${x}-${y}`} x={x} y={y} z={22} scale={0.9} />
      ))}

      {/* the ghat steps down to the water */}
      <IsoSteps x={0} y={64} z={0} w={G} count={7} tread={11} rise={5} color="#E2CEAC" />

      {crowdSteps.map(([x, y], i) => (
        <IsoPerson
          key={`s-${x}-${y}`}
          x={x}
          y={y}
          z={-Math.floor((y - 64) / 11 + 1) * 5}
          scale={1}
          color={i % 3 === 0 ? "#7C1D1A" : "#33271E"}
        />
      ))}

      {/* the Godavari filling the near third of the slab */}
      <IsoPlate x={0} y={141} z={-35} w={G} d={119} color="#2E8B87" />
      <IsoPlate x={0} y={141} z={-34} w={G} d={54} color="#41A19C" />

      {/* lamps set afloat */}
      {[
        [60, 176],
        [128, 206],
        [206, 184],
      ].map(([x, y]) => {
        const [cx, cy] = iso(x, y, -34);
        return (
          <g key={`d-${x}`}>
            <ellipse cx={cx} cy={cy} rx="8" ry="4" fill="#EDDFC7" />
            <circle cx={cx} cy={cy - 5} r="3" fill="#E07B14" />
          </g>
        );
      })}
    </Model>
  );
}

function GhatsFront() {
  return (
    <Foreground>
      <g fill="#E07B14" opacity="0.55">
        <circle cx="150" cy="600" r="9" />
        <circle cx="1050" cy="560" r="7" />
        <circle cx="320" cy="700" r="6" />
        <circle cx="900" cy="720" r="8" />
      </g>
    </Foreground>
  );
}

/* ═══ 4 · Sadhugram, the city that is taken down ══════════ */

function CampBack() {
  return (
    <Backdrop
      id="iso4"
      stops={[
        ["0%", "#F7F3ED"],
        ["60%", "#EDE3D2"],
        ["100%", "#E2CEAC"],
      ]}
    >
      <circle cx="300" cy="200" r="52" fill="#F4B36C" opacity="0.5" />
      <g stroke="#B3A28C" strokeWidth="3" fill="none" opacity="0.4" strokeLinecap="round">
        <path d="M820 170 q16-13 32 0 q16-13 32 0" />
        <path d="M900 230 q12-10 24 0 q12-10 24 0" />
      </g>
    </Backdrop>
  );
}

function CampModel() {
  const rows = [0, 1, 2, 3];
  const cols = [0, 1, 2, 3];

  return (
    <Model>
      <IsoShadow w={G} d={G} />
      <IsoGround w={G} d={G} top="#D9C7A6" body="#8C7860" thickness={30} />

      {/* the roads that get cut first */}
      <IsoPlate x={0} y={122} w={G} d={18} color="#B09A78" />
      <IsoPlate x={122} y={0} w={18} d={G} color="#B09A78" />

      {/* the grid of tents */}
      {rows.map((r) =>
        cols.map((c) => {
          const x = 16 + c * 60 + (c > 1 ? 18 : 0);
          const y = 16 + r * 60 + (r > 1 ? 18 : 0);
          const big = r === 1 && c === 2;
          return (
            <g key={`${r}-${c}`}>
              <IsoTent
                x={x}
                y={y}
                size={big ? 44 : 32}
                h={big ? 40 : 26}
                color={big ? "#FEFCF8" : "#FBF6EC"}
              />
              {big && (
                <g>
                  <line
                    x1={iso(x + 22, y + 22, 40)[0]}
                    y1={iso(x + 22, y + 22, 40)[1]}
                    x2={iso(x + 22, y + 22, 74)[0]}
                    y2={iso(x + 22, y + 22, 74)[1]}
                    stroke="#9E4F09"
                    strokeWidth="2.4"
                  />
                  <polygon
                    points={[iso(x + 22, y + 22, 74), iso(x + 22, y - 8, 66), iso(x + 22, y + 22, 58)]
                      .map(([a, b]) => `${a},${b}`)
                      .join(" ")}
                    fill="#E07B14"
                  />
                </g>
              )}
            </g>
          );
        })
      )}

      {/* light poles strung along the main road */}
      {[40, 130, 220].map((x) => {
        const [lx, ly] = iso(x + 1.5, 129.5, 44);
        return (
          <g key={`pole-${x}`}>
            <IsoBox x={x} y={128} w={3} d={3} h={40} color="#6B5847" />
            <circle cx={lx} cy={ly} r="4.5" fill="#DFCC78" />
            <circle cx={lx} cy={ly} r="9" fill="#DFCC78" opacity="0.25" />
          </g>
        );
      })}

      <IsoPerson x={70} y={131} scale={1} />
      <IsoPerson x={160} y={134} scale={1} />
      <IsoPerson x={131} y={200} scale={1} />
      <IsoTree x={244} y={244} scale={1} color="#41A19C" />
    </Model>
  );
}

function CampFront() {
  return (
    <Foreground>
      <g stroke="#8C7860" strokeWidth="4" fill="none" opacity="0.6" strokeLinecap="round">
        <path d="M0 760 C160 730 300 770 460 748" />
      </g>
      <g fill="#DFCC78" opacity="0.5">
        <circle cx="200" cy="620" r="6" />
        <circle cx="1000" cy="650" r="7" />
      </g>
    </Foreground>
  );
}

/* ═══ 5 · Shahi Snan, before dawn ═════════════════════════ */

function SnanBack() {
  return (
    <Backdrop
      id="iso5"
      stops={[
        ["0%", "#0B1220"],
        ["42%", "#1A2B48"],
        ["76%", "#7C3B0A"],
        ["100%", "#C4650B"],
      ]}
    >
      <g fill="#FBF6EC" opacity="0.8">
        {[
          [160, 96],
          [340, 60],
          [560, 130],
          [780, 80],
          [1010, 140],
          [1130, 70],
        ].map(([x, y], i) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={i % 2 === 0 ? 2.8 : 1.9} />
        ))}
      </g>
      <ellipse cx="600" cy="560" rx="360" ry="96" fill="#E07B14" opacity="0.26" />
    </Backdrop>
  );
}

function SnanModel() {
  const dense: [number, number][] = [];
  for (let r = 0; r < 5; r += 1) {
    for (let c = 0; c < 7; c += 1) {
      dense.push([22 + c * 33 + (r % 2) * 14, 74 + r * 13]);
    }
  }

  return (
    <Model>
      <IsoShadow w={G} d={G} opacity={0.28} />
      <IsoGround w={G} d={G} top="#3A3226" body="#241B14" thickness={30} />

      <IsoBox x={0} y={0} w={G} d={34} h={22} color="#2A2A3E" />
      <IsoShikhara x={26} y={2} z={22} base={44} h={78} color="#141E33" />
      <IsoShikhara x={104} y={0} z={22} base={58} h={104} color="#0F1729" flag="#E07B14" />
      <IsoShikhara x={192} y={2} z={22} base={40} h={70} color="#141E33" />

      {/* akhada banners coming down to the water */}
      {[54, 108, 162, 214].map((x, i) => (
        <g key={`b-${x}`}>
          <line
            x1={iso(x, 46, 22)[0]}
            y1={iso(x, 46, 22)[1]}
            x2={iso(x, 46, 92 + i * 6)[0]}
            y2={iso(x, 46, 92 + i * 6)[1]}
            stroke="#9E4F09"
            strokeWidth="2.6"
          />
          <polygon
            points={[iso(x, 46, 92 + i * 6), iso(x, 18, 84 + i * 6), iso(x, 46, 76 + i * 6)]
              .map(([a, b]) => `${a},${b}`)
              .join(" ")}
            fill="#E07B14"
          />
        </g>
      ))}

      <IsoSteps x={0} y={64} z={0} w={G} count={7} tread={11} rise={5} color="#4A4034" />

      {dense.map(([x, y], i) => (
        <IsoPerson
          key={`p-${x}-${y}-${i}`}
          x={x}
          y={y}
          z={-Math.floor((y - 64) / 11 + 1) * 5}
          scale={0.95}
          color={i % 4 === 0 ? "#D9432F" : "#EDDFC7"}
        />
      ))}

      <IsoPlate x={0} y={141} z={-35} w={G} d={119} color="#0F3B39" />
      <IsoPlate x={0} y={141} z={-34} w={G} d={48} color="#175452" />

      {/* lamps, and their long reflections */}
      {[
        [48, 172],
        [104, 198],
        [168, 180],
        [216, 212],
      ].map(([x, y]) => {
        const [cx, cy] = iso(x, y, -34);
        return (
          <g key={`l-${x}-${y}`}>
            {/* glow on the water, kept flat so it reads as a reflection
                rather than something standing in the river */}
            <ellipse cx={cx} cy={cy + 5} rx="15" ry="6" fill="#E07B14" opacity="0.3" />
            <ellipse cx={cx} cy={cy} rx="9" ry="4" fill="#EDDFC7" />
            <circle cx={cx} cy={cy - 4} r="3" fill="#F4B36C" />
          </g>
        );
      })}
    </Model>
  );
}

function SnanFront() {
  return (
    <Foreground>
      <g fill="#F4B36C">
        <circle cx="140" cy="620" r="8" opacity="0.55" />
        <circle cx="1060" cy="580" r="9" opacity="0.5" />
        <circle cx="320" cy="726" r="6" opacity="0.45" />
        <circle cx="880" cy="700" r="7" opacity="0.5" />
      </g>
    </Foreground>
  );
}

/* ═══ Registry ═════════════════════════════════════════════ */

export interface WorldScene {
  id: string;
  bg: string;
  accent: string;
  copyTone: "light" | "dark";
  Far: () => JSX.Element;
  Mid: () => JSX.Element;
  Near: () => JSX.Element;
}

export const worldScenes: WorldScene[] = [
  {
    id: "source",
    bg: "#DCE5F3",
    accent: "#1F6E6B",
    copyTone: "dark",
    Far: SourceBack,
    Mid: SourceModel,
    Near: SourceFront,
  },
  {
    id: "temple",
    bg: "#FCE9D2",
    accent: "#C4650B",
    copyTone: "dark",
    Far: TempleBack,
    Mid: TempleModel,
    Near: TempleFront,
  },
  {
    id: "ghats",
    bg: "#F8D0A3",
    accent: "#9E4F09",
    copyTone: "dark",
    Far: GhatsBack,
    Mid: GhatsModel,
    Near: GhatsFront,
  },
  {
    id: "camp",
    bg: "#EDE3D2",
    accent: "#6B5847",
    copyTone: "dark",
    Far: CampBack,
    Mid: CampModel,
    Near: CampFront,
  },
  {
    id: "snan",
    bg: "#121D31",
    accent: "#F4B36C",
    copyTone: "light",
    Far: SnanBack,
    Mid: SnanModel,
    Near: SnanFront,
  },
];
