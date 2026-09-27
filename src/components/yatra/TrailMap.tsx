"use client";

import { useMemo } from "react";
import { Trail } from "@/data/yatraData";
import { Locale } from "@/i18n/translations";

/**
 * A schematic vector map of a trail.
 *
 * Real coordinates, equirectangular projection, aspect ratio preserved, with a
 * scale bar, so distances and bearings between stops are honest. Streets are
 * deliberately not drawn: we do not have licensed street geometry, and inventing
 * it on a government site would be worse than leaving it out. For turn-by-turn
 * the stop cards hand off to Google Maps.
 */

const VIEW_W = 800;
const VIEW_H = 520;
const PAD = 64;
/** Never zoom in tighter than this, or two close stops fill the whole frame. */
const MIN_SPAN_M = 320;

const ACCENT = {
  saffron: { line: "#E07B14", pin: "#C4650B", soft: "#FCE9D2" },
  river: { line: "#2E8B87", pin: "#1F6E6B", soft: "#D3ECEA" },
  indigo: { line: "#2F4A7D", pin: "#1A2B48", soft: "#D8E1F0" },
} as const;

type Point = { x: number; y: number };

function smoothPath(points: Point[]): string {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

/** Largest round distance whose on-screen length lands in a readable range. */
function pickScaleStep(metresPerUnit: number): number {
  const candidates = [50, 100, 200, 250, 500, 1000, 2000];
  for (const metres of candidates) {
    const units = metres / metresPerUnit;
    if (units >= 80 && units <= 220) return metres;
  }
  return candidates[candidates.length - 1];
}

export default function TrailMap({
  trail,
  locale,
  activeStopId,
  openStopId,
  userCoords,
  onSelectStop,
  caption,
  youAreHereLabel,
}: {
  trail: Trail;
  locale: Locale;
  activeStopId: string | null;
  openStopId: string | null;
  userCoords: { lat: number; lng: number } | null;
  onSelectStop: (stopId: string) => void;
  caption: string;
  youAreHereLabel: string;
}) {
  const accent = ACCENT[trail.accent];

  const { project, points, metresPerUnit } = useMemo(() => {
    const lats = trail.stops.map((s) => s.lat);
    const lngs = trail.stops.map((s) => s.lng);
    const lat0 = (Math.min(...lats) + Math.max(...lats)) / 2;
    const lng0 = (Math.min(...lngs) + Math.max(...lngs)) / 2;

    const R = 6_371_000;
    const toMetres = (lat: number, lng: number) => ({
      mx: ((lng - lng0) * Math.PI * R * Math.cos((lat0 * Math.PI) / 180)) / 180,
      my: -((lat - lat0) * Math.PI * R) / 180,
    });

    const metres = trail.stops.map((s) => toMetres(s.lat, s.lng));
    const spanX = Math.max(...metres.map((m) => m.mx)) - Math.min(...metres.map((m) => m.mx));
    const spanY = Math.max(...metres.map((m) => m.my)) - Math.min(...metres.map((m) => m.my));

    // One scale for both axes keeps the geometry true.
    const usableW = VIEW_W - PAD * 2;
    const usableH = VIEW_H - PAD * 2;
    const span = Math.max(spanX, spanY, MIN_SPAN_M);
    const unitsPerMetre = Math.min(usableW, usableH) / span;

    const projectPoint = (lat: number, lng: number): Point => {
      const { mx, my } = toMetres(lat, lng);
      return {
        x: VIEW_W / 2 + mx * unitsPerMetre,
        y: VIEW_H / 2 + my * unitsPerMetre,
      };
    };

    return {
      project: projectPoint,
      points: trail.stops.map((s) => projectPoint(s.lat, s.lng)),
      metresPerUnit: 1 / unitsPerMetre,
    };
  }, [trail.stops]);

  const route = smoothPath(points);

  /**
   * Greedy label placement. Some stops sit 40 m apart, which at this zoom puts
   * their labels on top of each other, so each label takes the first candidate
   * offset that does not collide with one already placed.
   */
  const labels = useMemo(() => {
    const placed: { x: number; y: number }[] = [];
    const candidates = [
      { dx: 0, dy: 22, anchor: "middle" as const },
      { dx: 0, dy: -46, anchor: "middle" as const },
      { dx: 26, dy: 4, anchor: "start" as const },
      { dx: -26, dy: 4, anchor: "end" as const },
      { dx: 0, dy: 42, anchor: "middle" as const },
    ];

    return points.map((point) => {
      const spot =
        candidates.find((candidate) => {
          const x = point.x + candidate.dx;
          const y = point.y + candidate.dy;
          return !placed.some((p) => Math.abs(p.x - x) < 150 && Math.abs(p.y - y) < 24);
        }) ?? candidates[candidates.length - 1];

      placed.push({ x: point.x + spot.dx, y: point.y + spot.dy });
      return spot;
    });
  }, [points]);
  const userPoint = userCoords ? project(userCoords.lat, userCoords.lng) : null;
  const userOnMap =
    userPoint !== null &&
    userPoint.x > 8 &&
    userPoint.x < VIEW_W - 8 &&
    userPoint.y > 8 &&
    userPoint.y < VIEW_H - 8;

  const scaleMetres = pickScaleStep(metresPerUnit);
  const scaleUnits = scaleMetres / metresPerUnit;
  const scaleLabel = scaleMetres >= 1000 ? `${scaleMetres / 1000} km` : `${scaleMetres} m`;

  return (
    <figure className="overflow-hidden rounded-card border border-temple-100 bg-cream-100">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="block w-full"
        role="img"
        aria-label={caption}
      >
        <defs>
          <pattern id={`grid-${trail.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M40 0 H0 V40"
              fill="none"
              stroke="#E2CEAC"
              strokeWidth="1"
              opacity="0.5"
            />
          </pattern>
        </defs>

        <rect width={VIEW_W} height={VIEW_H} fill="#FBF6EC" />
        <rect width={VIEW_W} height={VIEW_H} fill={`url(#grid-${trail.id})`} />

        {/* the walking route */}
        <path
          d={route}
          fill="none"
          stroke={accent.soft}
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={route}
          fill="none"
          stroke={accent.line}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1 11"
        />

        {/* the walker's live position */}
        {userOnMap && userPoint && (
          <g>
            <circle cx={userPoint.x} cy={userPoint.y} r="26" fill="#2F4A7D" opacity="0.12" />
            <circle
              cx={userPoint.x}
              cy={userPoint.y}
              r="9"
              fill="#2F4A7D"
              stroke="#FEFCF8"
              strokeWidth="3"
            />
            <text
              x={userPoint.x}
              y={userPoint.y + 30}
              textAnchor="middle"
              fontSize="15"
              fontWeight="600"
              fill="#23395F"
            >
              {youAreHereLabel}
            </text>
          </g>
        )}

        {/* stops */}
        {trail.stops.map((stop, i) => {
          const point = points[i];
          const isActive = stop.id === activeStopId;
          const isOpen = stop.id === openStopId;
          const emphasised = isActive || isOpen;

          return (
            <g
              key={stop.id}
              onClick={() => onSelectStop(stop.id)}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={stop.name[locale]}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectStop(stop.id);
                }
              }}
            >
              {isActive && (
                <circle cx={point.x} cy={point.y} r="30" fill={accent.line} opacity="0.16" />
              )}

              {/* teardrop pin */}
              <path
                d={`M ${point.x} ${point.y} c -13 -13 -19 -20 -19 -28 a 19 19 0 1 1 38 0 c 0 8 -6 15 -19 28 Z`}
                fill={emphasised ? accent.pin : "#FEFCF8"}
                stroke={accent.pin}
                strokeWidth="3"
              />
              <text
                x={point.x}
                y={point.y - 21}
                textAnchor="middle"
                fontSize="19"
                fontWeight="700"
                fill={emphasised ? "#FEFCF8" : accent.pin}
              >
                {i + 1}
              </text>

              <text
                x={point.x + labels[i].dx}
                y={point.y + labels[i].dy}
                textAnchor={labels[i].anchor}
                fontSize="16"
                fontWeight={emphasised ? 700 : 500}
                fill="#33271E"
                stroke="#FBF6EC"
                strokeWidth="4"
                paintOrder="stroke"
              >
                {stop.name[locale]}
              </text>
            </g>
          );
        })}

        {/* scale bar */}
        <g transform={`translate(28 ${VIEW_H - 30})`}>
          <line x1="0" y1="0" x2={scaleUnits} y2="0" stroke="#6B5847" strokeWidth="2.5" />
          <line x1="0" y1="-6" x2="0" y2="6" stroke="#6B5847" strokeWidth="2.5" />
          <line
            x1={scaleUnits}
            y1="-6"
            x2={scaleUnits}
            y2="6"
            stroke="#6B5847"
            strokeWidth="2.5"
          />
          <text x={scaleUnits / 2} y="-12" textAnchor="middle" fontSize="15" fill="#6B5847">
            {scaleLabel}
          </text>
        </g>

        {/* north arrow */}
        <g transform={`translate(${VIEW_W - 40} 40)`}>
          <path d="M0 -18 L7 8 L0 2 L-7 8 Z" fill="#6B5847" />
          <text x="0" y="24" textAnchor="middle" fontSize="14" fontWeight="700" fill="#6B5847">
            N
          </text>
        </g>
      </svg>

      <figcaption className="border-t border-temple-100 px-5 py-3 text-xs leading-relaxed text-temple-400">
        {caption}
      </figcaption>
    </figure>
  );
}
