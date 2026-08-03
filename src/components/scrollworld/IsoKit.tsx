/**
 * A small isometric drawing kit.
 *
 * True 30° isometric: the x axis runs down-right, y runs down-left, z is up.
 * Everything is built from boxes, pyramids and plates so the dioramas read as
 * actual little models rather than flat shapes seen side-on.
 *
 * Painter's algorithm is manual — draw things in back-to-front order, meaning
 * ascending (x + y). Each helper draws its own faces in the right order.
 */

const ISO_X = 0.8660254;
const ISO_Y = 0.5;

export type P = [number, number];

export function iso(x: number, y: number, z: number): P {
  return [(x - y) * ISO_X, (x + y) * ISO_Y - z];
}

function pts(points: P[]): string {
  return points.map(([a, b]) => `${a.toFixed(2)},${b.toFixed(2)}`).join(" ");
}

/** Multiply a hex colour's channels, for cheap face shading. */
export function shade(hex: string, factor: number): string {
  const n = parseInt(hex.slice(1), 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const r = clamp(((n >> 16) & 255) * factor);
  const g = clamp(((n >> 8) & 255) * factor);
  const b = clamp((n & 255) * factor);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

/** Face brightness: top catches the light, the right face is deepest. */
const TOP = 1.1;
const LEFT = 0.8;
const RIGHT = 0.6;

export interface BoxProps {
  x?: number;
  y?: number;
  z?: number;
  w: number;
  d: number;
  h: number;
  color: string;
  /** Skip the top face when something sits flush on top of it. */
  capped?: boolean;
  opacity?: number;
}

export function IsoBox({ x = 0, y = 0, z = 0, w, d, h, color, capped = true, opacity }: BoxProps) {
  const top: P[] = [iso(x, y, z + h), iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x, y + d, z + h)];
  const left: P[] = [iso(x, y + d, z + h), iso(x + w, y + d, z + h), iso(x + w, y + d, z), iso(x, y + d, z)];
  const right: P[] = [iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x + w, y + d, z), iso(x + w, y, z)];

  return (
    <g opacity={opacity}>
      <polygon points={pts(left)} fill={shade(color, LEFT)} />
      <polygon points={pts(right)} fill={shade(color, RIGHT)} />
      {capped && <polygon points={pts(top)} fill={shade(color, TOP)} />}
    </g>
  );
}

/** A four-sided pyramid — tents, hills, spire caps. */
export function IsoPyramid({
  x = 0,
  y = 0,
  z = 0,
  w,
  d,
  h,
  color,
  opacity,
  /** Override face brightness — canvas and other pale materials need a
      gentler falloff or they read as grey. */
  shading = [LEFT, RIGHT],
}: Omit<BoxProps, "capped"> & { shading?: [number, number] }) {
  const apex = iso(x + w / 2, y + d / 2, z + h);
  const bl = iso(x, y + d, z);
  const br = iso(x + w, y + d, z);
  const rr = iso(x + w, y, z);

  return (
    <g opacity={opacity}>
      <polygon points={pts([bl, br, apex])} fill={shade(color, shading[0])} />
      <polygon points={pts([br, rr, apex])} fill={shade(color, shading[1])} />
    </g>
  );
}

/** A flat plate — ground, water, a step tread. */
export function IsoPlate({
  x = 0,
  y = 0,
  z = 0,
  w,
  d,
  color,
  opacity,
}: {
  x?: number;
  y?: number;
  z?: number;
  w: number;
  d: number;
  color: string;
  opacity?: number;
}) {
  const face: P[] = [iso(x, y, z), iso(x + w, y, z), iso(x + w, y + d, z), iso(x, y + d, z)];
  return <polygon points={pts(face)} fill={color} opacity={opacity} />;
}

/** The slab every diorama floats on: earth sides, a surface you can build on. */
export function IsoGround({
  w,
  d,
  thickness = 26,
  top = "#E2CEAC",
  body = "#8C7860",
}: {
  w: number;
  d: number;
  thickness?: number;
  top?: string;
  body?: string;
}) {
  return (
    <g>
      <IsoBox x={0} y={0} z={-thickness} w={w} d={d} h={thickness} color={body} capped={false} />
      <IsoPlate x={0} y={0} z={0} w={w} d={d} color={top} />
    </g>
  );
}

/** A stepped ghat running along the x axis, descending in y. */
export function IsoSteps({
  x = 0,
  y = 0,
  z = 0,
  w,
  count,
  tread = 9,
  rise = 5,
  color,
}: {
  x?: number;
  y?: number;
  z?: number;
  w: number;
  count: number;
  tread?: number;
  rise?: number;
  color: string;
}) {
  return (
    <g>
      {Array.from({ length: count }, (_, i) => (
        <IsoBox
          key={i}
          x={x}
          y={y + i * tread}
          z={z - (i + 1) * rise}
          w={w}
          d={tread}
          h={rise}
          color={i % 2 === 0 ? color : shade(color, 0.94)}
        />
      ))}
    </g>
  );
}

/**
 * A temple spire: tapering boxes, an amalaka disc and a finial. Reads as a
 * shikhara from the isometric angle without needing curved geometry.
 */
export function IsoShikhara({
  x,
  y,
  z = 0,
  base,
  h,
  color,
  flag,
}: {
  x: number;
  y: number;
  z?: number;
  base: number;
  h: number;
  color: string;
  flag?: string;
}) {
  const tiers = 5;
  const segment = h / tiers;

  return (
    <g>
      {Array.from({ length: tiers }, (_, i) => {
        const shrink = 1 - i * 0.14;
        const size = base * shrink;
        const inset = (base - size) / 2;
        return (
          <IsoBox
            key={i}
            x={x + inset}
            y={y + inset}
            z={z + i * segment}
            w={size}
            d={size}
            h={segment}
            color={color}
            capped={i === tiers - 1}
          />
        );
      })}
      {/* amalaka + kalash */}
      <ellipse
        cx={iso(x + base / 2, y + base / 2, z + h)[0]}
        cy={iso(x + base / 2, y + base / 2, z + h)[1]}
        rx={base * 0.34}
        ry={base * 0.17}
        fill={shade(color, 1.18)}
      />
      <IsoBox
        x={x + base * 0.42}
        y={y + base * 0.42}
        z={z + h}
        w={base * 0.16}
        d={base * 0.16}
        h={base * 0.3}
        color={shade(color, 1.2)}
      />
      {flag && (
        <g>
          <line
            x1={iso(x + base / 2, y + base / 2, z + h + base * 0.3)[0]}
            y1={iso(x + base / 2, y + base / 2, z + h + base * 0.3)[1]}
            x2={iso(x + base / 2, y + base / 2, z + h + base * 0.95)[0]}
            y2={iso(x + base / 2, y + base / 2, z + h + base * 0.95)[1]}
            stroke="#9E4F09"
            strokeWidth="2.4"
          />
          <polygon
            points={pts([
              iso(x + base / 2, y + base / 2, z + h + base * 0.95),
              iso(x + base / 2, y + base / 2 - base * 0.7, z + h + base * 0.78),
              iso(x + base / 2, y + base / 2, z + h + base * 0.62),
            ])}
            fill={flag}
          />
        </g>
      )}
    </g>
  );
}

/** A conical tent. */
export function IsoTent({
  x,
  y,
  z = 0,
  size,
  h,
  color = "#FBF6EC",
}: {
  x: number;
  y: number;
  z?: number;
  size: number;
  h: number;
  color?: string;
}) {
  return (
    <g>
      <IsoPyramid x={x} y={y} z={z} w={size} d={size} h={h} color={color} shading={[1, 0.84]} />
      <line
        x1={iso(x + size / 2, y + size / 2, z + h)[0]}
        y1={iso(x + size / 2, y + size / 2, z + h)[1]}
        x2={iso(x + size / 2, y + size / 2, z + h + size * 0.34)[0]}
        y2={iso(x + size / 2, y + size / 2, z + h + size * 0.34)[1]}
        stroke="#C4650B"
        strokeWidth="1.6"
      />
    </g>
  );
}

/** A tree: trunk box plus a couple of canopy discs. */
export function IsoTree({
  x,
  y,
  z = 0,
  scale = 1,
  color = "#2E8B87",
}: {
  x: number;
  y: number;
  z?: number;
  scale?: number;
  color?: string;
}) {
  const trunkH = 10 * scale;
  const [cx, cy] = iso(x, y, z + trunkH + 7 * scale);
  return (
    <g>
      <IsoBox x={x - 1.4 * scale} y={y - 1.4 * scale} z={z} w={2.8 * scale} d={2.8 * scale} h={trunkH} color="#6B5847" />
      <circle cx={cx} cy={cy} r={9 * scale} fill={shade(color, 0.85)} />
      <circle cx={cx - 4 * scale} cy={cy - 4 * scale} r={7 * scale} fill={color} />
      <circle cx={cx + 5 * scale} cy={cy - 2 * scale} r={6 * scale} fill={shade(color, 1.12)} />
    </g>
  );
}

/**
 * A person. Deliberately tiny and simple — at diorama scale a figure is a few
 * pixels, and a blob of the right proportion reads better than detail.
 */
export function IsoPerson({
  x,
  y,
  z = 0,
  scale = 1,
  color = "#33271E",
}: {
  x: number;
  y: number;
  z?: number;
  scale?: number;
  color?: string;
}) {
  const [bx, by] = iso(x, y, z);
  // Body proportions read better a bit stouter than life at this scale;
  // a narrow figure just looks like a post.
  const h = 11 * scale;
  const w = 5 * scale;
  return (
    <g>
      <ellipse cx={bx} cy={by + 1} rx={w * 0.95} ry={w * 0.42} fill="#33271E" opacity="0.2" />
      <path
        d={`M${bx - w / 2} ${by} L${bx - w / 2} ${by - h + w * 0.5} Q${bx} ${by - h - w * 0.25} ${bx + w / 2} ${by - h + w * 0.5} L${bx + w / 2} ${by} Z`}
        fill={color}
      />
      <circle cx={bx} cy={by - h - w * 0.35} r={w * 0.48} fill={shade(color, 1.2)} />
    </g>
  );
}

/** Soft contact shadow under a floating diorama. */
export function IsoShadow({ w, d, opacity = 0.16 }: { w: number; d: number; opacity?: number }) {
  const [cx, cy] = iso(w / 2, d / 2, 0);
  return <ellipse cx={cx} cy={cy + 30} rx={(w + d) * 0.42} ry={(w + d) * 0.16} fill="#16110D" opacity={opacity} />;
}
