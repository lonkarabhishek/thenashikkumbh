"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, RotateCcw, ArrowLeft, Trophy } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";

/* ═══════════════════════════════════════════════════════════════════════════════
   KUMBH RUN — Endless Runner Canvas Game
   A pilgrim runs along the sacred ghats of Godavari, jumping over obstacles
   and collecting diyas. Inspired by Chrome Dino / Subway Surfers.
   ═══════════════════════════════════════════════════════════════════════════════ */

// ─── Game Constants ──────────────────────────────────────────────────────────
const LW = 800; // logical width
const LH = 450; // logical height
const GROUND_Y = LH - 80;
const PLAYER_X = 100;
const PW = 32; // player width
const PH = 48; // player height
const GRAVITY = 0.65;
const JUMP_VEL = -12.5;
const INIT_SPEED = 4.5;
const MAX_SPEED = 11;
const SPAWN_INTERVAL = 100; // base frames between obstacles
const DIYA_CHANCE = 0.45;

// ─── Types ───────────────────────────────────────────────────────────────────
interface Obs {
  x: number;
  w: number;
  h: number;
  passed: boolean;
}
interface Diya {
  x: number;
  y: number;
  collected: boolean;
}
interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}
interface Star {
  x: number;
  y: number;
  r: number;
  flicker: number;
}
interface Temple {
  x: number;
  w: number;
  h: number;
}

interface GS {
  status: "idle" | "playing" | "over";
  py: number; // player Y
  pvy: number; // player velocity Y
  jumping: boolean;
  obs: Obs[];
  diyas: Diya[];
  sparks: Spark[];
  score: number;
  diyaN: number;
  speed: number;
  frame: number;
  gOff: number; // ground offset
  stars: Star[];
  temples: Temple[];
  shake: number;
  runFrame: number; // for running animation
}

function initState(): GS {
  const stars: Star[] = [];
  for (let i = 0; i < 40; i++) {
    stars.push({
      x: Math.random() * LW,
      y: Math.random() * (GROUND_Y - 60),
      r: 0.5 + Math.random() * 1.5,
      flicker: Math.random() * Math.PI * 2,
    });
  }
  const temples: Temple[] = [];
  for (let i = 0; i < 5; i++) {
    temples.push({
      x: i * 200 + Math.random() * 80,
      w: 40 + Math.random() * 60,
      h: 60 + Math.random() * 80,
    });
  }
  return {
    status: "idle",
    py: GROUND_Y - PH,
    pvy: 0,
    jumping: false,
    obs: [],
    diyas: [],
    sparks: [],
    score: 0,
    diyaN: 0,
    speed: INIT_SPEED,
    frame: 0,
    gOff: 0,
    stars,
    temples,
    shake: 0,
    runFrame: 0,
  };
}

// ─── Drawing helpers ─────────────────────────────────────────────────────────
function drawBg(ctx: CanvasRenderingContext2D, g: GS) {
  // Sky gradient
  const grad = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
  grad.addColorStop(0, "#0D0906");
  grad.addColorStop(0.5, "#1a0f08");
  grad.addColorStop(1, "#231510");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, LW, GROUND_Y);

  // Stars
  for (const s of g.stars) {
    const alpha = 0.3 + 0.3 * Math.sin(g.frame * 0.02 + s.flicker);
    ctx.fillStyle = `rgba(255,215,0,${alpha})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Temple silhouettes (parallax)
  ctx.fillStyle = "rgba(212,168,67,0.04)";
  for (const t of g.temples) {
    const tx = ((t.x - g.frame * 0.3) % (LW + 100) + LW + 100) % (LW + 100) - 50;
    // Temple body
    ctx.fillRect(tx, GROUND_Y - t.h, t.w, t.h);
    // Temple spire (triangle)
    ctx.beginPath();
    ctx.moveTo(tx - 5, GROUND_Y - t.h);
    ctx.lineTo(tx + t.w / 2, GROUND_Y - t.h - t.h * 0.5);
    ctx.lineTo(tx + t.w + 5, GROUND_Y - t.h);
    ctx.fill();
    // Kalash on top
    ctx.beginPath();
    ctx.arc(tx + t.w / 2, GROUND_Y - t.h - t.h * 0.5 - 6, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // River strip
  const riverGrad = ctx.createLinearGradient(0, GROUND_Y, 0, GROUND_Y + 20);
  riverGrad.addColorStop(0, "rgba(20,60,100,0.3)");
  riverGrad.addColorStop(1, "rgba(10,30,60,0.1)");
  ctx.fillStyle = riverGrad;
  ctx.fillRect(0, GROUND_Y, LW, 20);

  // River shimmer
  ctx.fillStyle = "rgba(100,180,255,0.06)";
  for (let i = 0; i < 8; i++) {
    const wx = ((i * 110 - g.frame * 1.5) % LW + LW) % LW;
    ctx.fillRect(wx, GROUND_Y + 4, 40, 2);
  }
}

function drawGround(ctx: CanvasRenderingContext2D, g: GS) {
  // Main ground
  const grad = ctx.createLinearGradient(0, GROUND_Y + 20, 0, LH);
  grad.addColorStop(0, "#3d2817");
  grad.addColorStop(1, "#1a0f07");
  ctx.fillStyle = grad;
  ctx.fillRect(0, GROUND_Y + 20, LW, LH - GROUND_Y - 20);

  // Ground top line
  ctx.fillStyle = "rgba(212,168,67,0.15)";
  ctx.fillRect(0, GROUND_Y + 19, LW, 2);

  // Ground detail (dashes)
  ctx.fillStyle = "rgba(212,168,67,0.06)";
  for (let i = 0; i < 25; i++) {
    const dx = ((i * 40 - g.gOff) % (LW + 40) + LW + 40) % (LW + 40) - 20;
    ctx.fillRect(dx, GROUND_Y + 30, 20, 2);
  }
}

function drawPlayer(ctx: CanvasRenderingContext2D, g: GS) {
  const px = PLAYER_X;
  const py = g.py;
  const bobY = g.jumping ? 0 : Math.sin(g.runFrame * 0.3) * 2;

  ctx.save();
  ctx.translate(px, py + bobY);

  // Shadow on ground
  if (!g.jumping) {
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.beginPath();
    ctx.ellipse(PW / 2, PH + 2, PW * 0.6, 4, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Body (saffron robe)
  ctx.fillStyle = "#FF8C00";
  const bodyY = 16;
  ctx.beginPath();
  ctx.roundRect(4, bodyY, PW - 8, PH - bodyY - 4, 4);
  ctx.fill();

  // Dhoti (white lower)
  ctx.fillStyle = "#F5F0E0";
  ctx.beginPath();
  ctx.roundRect(4, PH - 16, PW - 8, 12, [0, 0, 4, 4]);
  ctx.fill();

  // Head
  ctx.fillStyle = "#D4956B";
  ctx.beginPath();
  ctx.arc(PW / 2, 12, 10, 0, Math.PI * 2);
  ctx.fill();

  // Tilak
  ctx.fillStyle = "#D4A843";
  ctx.fillRect(PW / 2 - 2, 6, 4, 6);

  // Legs animation (running)
  if (!g.jumping) {
    const legPhase = Math.sin(g.runFrame * 0.4);
    ctx.fillStyle = "#D4956B";
    // Left leg
    ctx.fillRect(8, PH - 6, 5, 6 + legPhase * 3);
    // Right leg
    ctx.fillRect(PW - 13, PH - 6, 5, 6 - legPhase * 3);
  }

  ctx.restore();
}

function drawObs(ctx: CanvasRenderingContext2D, obs: Obs) {
  const x = obs.x;
  const y = GROUND_Y + 20 - obs.h;
  const w = obs.w;
  const h = obs.h;

  // Pillar body
  ctx.fillStyle = "#4a3520";
  ctx.fillRect(x, y, w, h);

  // Pillar top (decorative)
  ctx.fillStyle = "#5a4530";
  ctx.fillRect(x - 3, y, w + 6, 6);

  // Pillar cap (triangle)
  ctx.fillStyle = "#D4A843";
  ctx.beginPath();
  ctx.moveTo(x - 2, y);
  ctx.lineTo(x + w / 2, y - 10);
  ctx.lineTo(x + w + 2, y);
  ctx.fill();

  // Gold stripe
  ctx.fillStyle = "rgba(212,168,67,0.3)";
  ctx.fillRect(x + w / 2 - 2, y + 6, 4, h - 6);
}

function drawDiya(ctx: CanvasRenderingContext2D, diya: Diya, frame: number) {
  if (diya.collected) return;
  const x = diya.x;
  const y = diya.y + Math.sin(frame * 0.06 + diya.x) * 4;

  // Glow
  ctx.save();
  ctx.shadowColor = "#FFD700";
  ctx.shadowBlur = 15;
  ctx.fillStyle = "#FFD700";
  ctx.beginPath();
  ctx.arc(x, y, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Flame
  ctx.fillStyle = "#FF6B00";
  ctx.beginPath();
  ctx.moveTo(x - 3, y - 6);
  ctx.quadraticCurveTo(x, y - 14 - Math.sin(frame * 0.15) * 3, x + 3, y - 6);
  ctx.fill();

  // Base (small cup)
  ctx.fillStyle = "#B8860B";
  ctx.beginPath();
  ctx.moveTo(x - 6, y + 2);
  ctx.lineTo(x - 4, y + 8);
  ctx.lineTo(x + 4, y + 8);
  ctx.lineTo(x + 6, y + 2);
  ctx.closePath();
  ctx.fill();
}

function drawSparks(ctx: CanvasRenderingContext2D, sparks: Spark[]) {
  for (const s of sparks) {
    const alpha = s.life / 30;
    ctx.fillStyle =
      s.color === "#FFD700"
        ? `rgba(255,215,0,${alpha})`
        : `rgba(255,100,0,${alpha})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size * alpha, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawScore(ctx: CanvasRenderingContext2D, score: number, diyas: number) {
  ctx.save();
  ctx.font = "bold 28px sans-serif";
  ctx.fillStyle = "#FFD700";
  ctx.shadowColor = "rgba(255,215,0,0.4)";
  ctx.shadowBlur = 10;
  ctx.textAlign = "right";
  ctx.fillText(String(score), LW - 20, 40);

  if (diyas > 0) {
    ctx.font = "bold 18px sans-serif";
    ctx.fillStyle = "#FFD700";
    ctx.fillText(`🪔 ×${diyas}`, LW - 20, 65);
  }
  ctx.restore();
}

function drawFrame(ctx: CanvasRenderingContext2D, g: GS) {
  ctx.save();

  // Screen shake
  if (g.shake > 0) {
    const sx = (Math.random() - 0.5) * g.shake;
    const sy = (Math.random() - 0.5) * g.shake;
    ctx.translate(sx, sy);
  }

  // Clear
  ctx.clearRect(-10, -10, LW + 20, LH + 20);

  drawBg(ctx, g);
  drawGround(ctx, g);

  // Draw obstacles
  for (const o of g.obs) {
    drawObs(ctx, o);
  }

  // Draw diyas
  for (const d of g.diyas) {
    drawDiya(ctx, d, g.frame);
  }

  // Draw player
  drawPlayer(ctx, g);

  // Draw particles
  drawSparks(ctx, g.sparks);

  // Draw score
  const totalScore = g.score + g.diyaN * 5;
  drawScore(ctx, totalScore, g.diyaN);

  ctx.restore();
}

// ─── Page Component ──────────────────────────────────────────────────────────
export default function KumbhRunPage() {
  const { t } = useLanguage();
  const kr = translations.kumbhRunPage;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gsRef = useRef<GS>(initState());
  const rafRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const [gameStatus, setGameStatus] = useState<"idle" | "playing" | "over">("idle");
  const [finalScore, setFinalScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [copied, setCopied] = useState(false);

  // Load high score
  useEffect(() => {
    try {
      const best = parseInt(localStorage.getItem("kumbhrun_best") || "0");
      setHighScore(best);
    } catch { /* */ }
  }, []);

  // Setup canvas scaling
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();

    // Maintain aspect ratio
    const aspect = LW / LH;
    let cw = rect.width;
    let ch = cw / aspect;
    if (ch > rect.height) {
      ch = rect.height;
      cw = ch * aspect;
    }

    canvas.style.width = `${cw}px`;
    canvas.style.height = `${ch}px`;
    canvas.width = LW * dpr;
    canvas.height = LH * dpr;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  useEffect(() => {
    setupCanvas();
    window.addEventListener("resize", setupCanvas);
    return () => window.removeEventListener("resize", setupCanvas);
  }, [setupCanvas]);

  // Draw initial idle frame
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) drawFrame(ctx, gsRef.current);
  }, []);

  // Game loop
  const gameLoop = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const g = gsRef.current;

    if (g.status !== "playing") {
      drawFrame(ctx, g);
      return;
    }

    g.frame++;
    g.runFrame++;
    g.speed = Math.min(MAX_SPEED, INIT_SPEED + g.frame * 0.0015);
    g.gOff = (g.gOff + g.speed) % 40;

    // Player physics
    g.pvy += GRAVITY;
    g.py += g.pvy;
    if (g.py >= GROUND_Y - PH) {
      g.py = GROUND_Y - PH;
      g.pvy = 0;
      g.jumping = false;
    }

    // Spawn obstacles
    const spawnRate = Math.max(50, Math.floor(SPAWN_INTERVAL / (g.speed / INIT_SPEED)));
    if (g.frame % spawnRate === 0) {
      const h = 28 + Math.random() * 42;
      const w = 25 + Math.random() * 20;
      g.obs.push({ x: LW + 50, w, h, passed: false });

      if (Math.random() < DIYA_CHANCE) {
        g.diyas.push({
          x: LW + 50 + w / 2,
          y: GROUND_Y - h - 30 - Math.random() * 40,
          collected: false,
        });
      }
    }

    // Move obstacles
    for (const o of g.obs) {
      o.x -= g.speed;
      if (!o.passed && o.x + o.w < PLAYER_X) {
        o.passed = true;
      }
    }
    for (const d of g.diyas) {
      d.x -= g.speed;
    }

    // Cleanup offscreen
    g.obs = g.obs.filter((o) => o.x > -100);
    g.diyas = g.diyas.filter((d) => d.x > -60);

    // Collision — player bounding box (slightly forgiving)
    const px1 = PLAYER_X + 6;
    const px2 = PLAYER_X + PW - 6;
    const py2 = g.py + PH;

    for (const o of g.obs) {
      const ox1 = o.x + 3;
      const ox2 = o.x + o.w - 3;
      const oy = GROUND_Y + 20 - o.h;

      if (px2 > ox1 && px1 < ox2 && py2 > oy) {
        // Hit!
        g.status = "over";
        g.shake = 12;

        // Explosion sparks
        for (let i = 0; i < 12; i++) {
          g.sparks.push({
            x: PLAYER_X + PW / 2,
            y: g.py + PH / 2,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8 - 3,
            life: 25 + Math.random() * 15,
            color: "#FF6B00",
            size: 3 + Math.random() * 4,
          });
        }

        const total = Math.floor(g.frame / 5) + g.diyaN * 5;
        setFinalScore(total);
        setGameStatus("over");

        try {
          const best = parseInt(localStorage.getItem("kumbhrun_best") || "0");
          if (total > best) {
            localStorage.setItem("kumbhrun_best", String(total));
            setHighScore(total);
          }
        } catch { /* */ }
        break;
      }
    }

    // Diya collection
    for (const d of g.diyas) {
      if (d.collected) continue;
      const dy = d.y + Math.sin(g.frame * 0.06 + d.x) * 4;
      if (
        PLAYER_X + PW > d.x - 12 &&
        PLAYER_X < d.x + 12 &&
        g.py < dy + 14 &&
        g.py + PH > dy - 14
      ) {
        d.collected = true;
        g.diyaN++;

        for (let i = 0; i < 8; i++) {
          g.sparks.push({
            x: d.x,
            y: dy,
            vx: (Math.random() - 0.5) * 5,
            vy: (Math.random() - 0.5) * 5 - 2,
            life: 20 + Math.random() * 10,
            color: "#FFD700",
            size: 2 + Math.random() * 3,
          });
        }
      }
    }

    // Update sparks
    g.sparks = g.sparks.filter((s) => {
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.15;
      s.life--;
      return s.life > 0;
    });

    // Shake decay
    if (g.shake > 0) g.shake *= 0.85;

    // Running score
    g.score = Math.floor(g.frame / 5);

    // Draw
    drawFrame(ctx, g);

    if (g.status === "playing") {
      rafRef.current = requestAnimationFrame(gameLoop);
    } else {
      // Draw one more frame with game over state (shake etc)
      drawFrame(ctx, g);
    }
  }, []);

  // Start game
  const startGame = useCallback(() => {
    gsRef.current = initState();
    gsRef.current.status = "playing";
    setGameStatus("playing");
    setCopied(false);
    rafRef.current = requestAnimationFrame(gameLoop);
  }, [gameLoop]);

  // Jump
  const jump = useCallback(() => {
    const g = gsRef.current;
    if (g.status === "idle") {
      startGame();
      return;
    }
    if (g.status === "over") return;
    if (!g.jumping) {
      g.pvy = JUMP_VEL;
      g.jumping = true;
    }
  }, [startGame]);

  // Input handlers
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [jump]);

  // Cleanup animation frame
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Share
  const handleShare = useCallback(() => {
    const g = gsRef.current;
    const total = finalScore;
    const diyas = g.diyaN;
    const text = `कुंभ Run 🏃 Score: ${total} 🪔×${diyas}\nthenashikkumbh.com/kumbhrun`;

    if (navigator.share) {
      navigator.share({ text }).catch(() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, [finalScore]);

  return (
    <div className="section-dark flex min-h-screen flex-col">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid rgba(212,168,67,0.1)" }}
      >
        <Link
          href="/games"
          className="inline-flex items-center gap-1 text-sm font-medium text-cream-300/60 hover:text-[#D4A843] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t(kr.backToGames)}
        </Link>
        <h1
          className="font-heading text-lg font-bold"
          style={{ color: "#D4A843" }}
        >
          {t(kr.title)}
        </h1>
        <div className="flex items-center gap-1 text-sm text-cream-300/40">
          <Trophy className="h-3.5 w-3.5" style={{ color: "#D4A843" }} />
          {highScore}
        </div>
      </div>

      {/* Game Container */}
      <div ref={containerRef} className="relative flex flex-1 items-center justify-center bg-[#0D0906] p-2">
        <canvas
          ref={canvasRef}
          className="block cursor-pointer rounded-lg"
          style={{ maxWidth: "100%", maxHeight: "100%", touchAction: "none" }}
          onPointerDown={(e) => {
            e.preventDefault();
            jump();
          }}
        />

        {/* Idle Overlay */}
        <AnimatePresence>
          {gameStatus === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ background: "rgba(13,9,6,0.7)" }}
              onPointerDown={(e) => {
                e.preventDefault();
                startGame();
              }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <p
                  className="mb-2 font-devanagari text-4xl"
                  style={{ color: "#D4A843", textShadow: "0 0 20px rgba(212,168,67,0.4)" }}
                >
                  कुंभ रन
                </p>
                <h2
                  className="mb-6 font-heading text-3xl font-bold md:text-5xl"
                  style={{ color: "#FFD700" }}
                >
                  {t(kr.title)}
                </h2>
                <motion.p
                  className="text-lg text-cream-300/60"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {t(kr.tapToStart)}
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Over Overlay */}
        <AnimatePresence>
          {gameStatus === "over" && (
            <motion.div
              key="over"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ background: "rgba(13,9,6,0.8)" }}
            >
              <motion.div
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="text-center"
              >
                <h2
                  className="mb-2 font-heading text-2xl font-bold md:text-4xl"
                  style={{ color: "#FFD700" }}
                >
                  {t(kr.gameOver)}
                </h2>
                <p
                  className="mb-1 font-heading text-5xl font-bold md:text-7xl"
                  style={{ color: "#D4A843" }}
                >
                  {finalScore}
                </p>
                <p className="mb-1 text-lg text-cream-300/50">
                  🪔 ×{gsRef.current.diyaN}
                </p>
                {finalScore >= highScore && finalScore > 0 && (
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mb-4 text-sm font-bold text-amber-400"
                  >
                    {t(kr.newBest)}
                  </motion.p>
                )}

                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    onClick={startGame}
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[#0D0906] transition-all hover:scale-[1.03] active:scale-[0.97]"
                    style={{
                      background: "linear-gradient(135deg, #D4A843, #FFD700)",
                      boxShadow: "0 4px 20px rgba(212,168,67,0.3)",
                    }}
                  >
                    <RotateCcw className="h-4 w-4" />
                    {t(kr.playAgain)}
                  </button>
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium text-cream-100 transition-all hover:bg-white/5"
                    style={{ borderColor: "rgba(212,168,67,0.3)" }}
                  >
                    <Share2 className="h-4 w-4" />
                    {copied ? t(translations.gamesPage.dailyCopied) : t(kr.share)}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom hint */}
      {gameStatus === "playing" && (
        <div className="py-2 text-center text-xs text-cream-300/30">
          {t(kr.hint)}
        </div>
      )}
    </div>
  );
}
