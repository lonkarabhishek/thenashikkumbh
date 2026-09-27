"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Share2, RotateCcw, ArrowLeft, Trophy, MapPin } from "lucide-react";
import Link from "@/components/LocaleLink";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";
import type { Locale } from "@/i18n/translations";

/* ═══════════════════════════════════════════════════════════════════════════════
   KUMBH RUN - Portrait Milestone Pilgrimage Runner
   Run through the sacred places of Nashik Kumbh Mela! Each milestone is a real
   pilgrimage spot. Difficulty increases as you progress. Learn about each place!
   ═══════════════════════════════════════════════════════════════════════════════ */

// ─── Canvas Constants (Portrait) ────────────────────────────────────────────
const LW = 400;
const LH = 650;
const GROUND_Y = LH - 100;
const HUD_H = 70; // top area for score/milestone
const PLAYER_X = 70;
const PW = 30;
const PH = 44;
const GRAVITY = 0.7;
const JUMP_VEL = -12;
const DARSHAN_CHANCE = 0.35;

// ─── Milestone Data ─────────────────────────────────────────────────────────
interface MilestoneData {
  id: string;
  name: { en: string; hi: string; mr: string };
  distance: number;
  speed: number;
  spawnRate: number;
  maxObsH: number;
  emoji: string;
  accentHue: number;
  facts: { en: string; hi: string; mr: string }[];
}

const MILESTONES: MilestoneData[] = [
  {
    id: "ramkund",
    name: { en: "Ramkund", hi: "रामकुंड", mr: "रामकुंड" },
    distance: 0,
    speed: 4.0,
    spawnRate: 90,
    maxObsH: 38,
    emoji: "🛕",
    accentHue: 35,
    facts: [
      { en: "Lord Rama bathed here during his exile", hi: "वनवास के दौरान भगवान राम ने यहाँ स्नान किया", mr: "वनवासात भगवान रामांनी येथे स्नान केले" },
      { en: "Ramkund is the holiest bathing ghat in Nashik", hi: "रामकुंड नासिक का सबसे पवित्र स्नान घाट है", mr: "रामकुंड नाशिकमधील सर्वात पवित्र स्नानघाट आहे" },
      { en: "Raja Dashrath's last rites were performed here", hi: "राजा दशरथ का अंतिम संस्कार यहाँ हुआ", mr: "राजा दशरथांचे अंत्यसंस्कार येथे झाले" },
    ],
  },
  {
    id: "kalaram",
    name: { en: "Kalaram Temple", hi: "कालाराम मंदिर", mr: "काळाराम मंदिर" },
    distance: 150,
    speed: 4.5,
    spawnRate: 80,
    maxObsH: 42,
    emoji: "🏛️",
    accentHue: 45,
    facts: [
      { en: "Built with black stone, unique in all of India", hi: "काले पत्थर से निर्मित, पूरे भारत में अनोखा", mr: "काळ्या दगडाने बांधलेले, संपूर्ण भारतात अनोखे" },
      { en: "Dr. B.R. Ambedkar led a historic satyagraha here in 1930", hi: "डॉ. अम्बेडकर ने 1930 में यहाँ ऐतिहासिक सत्याग्रह किया", mr: "डॉ. आंबेडकरांनी 1930 मध्ये येथे ऐतिहासिक सत्याग्रह केला" },
      { en: "The idol of Lord Rama is 2 feet tall, carved from black basalt", hi: "भगवान राम की मूर्ति 2 फीट ऊँची, काले बेसाल्ट से", mr: "भगवान रामांची मूर्ती 2 फूट उंच, काळ्या बेसाल्टची" },
    ],
  },
  {
    id: "sitagufaa",
    name: { en: "Sita Gufa", hi: "सीता गुफा", mr: "सीता गुफा" },
    distance: 400,
    speed: 5.0,
    spawnRate: 72,
    maxObsH: 46,
    emoji: "🕳️",
    accentHue: 25,
    facts: [
      { en: "Legend says Sita hid in this cave from the demon Ravana", hi: "किंवदंती है कि सीता ने रावण से यहाँ छिपी", mr: "आख्यायिकेनुसार सीता रावणापासून या गुफेत लपली" },
      { en: "The cave tunnel is believed to go underground", hi: "गुफा भूमिगत जाती है ऐसा माना जाता है", mr: "गुफा भूमिगत जाते असे मानतात" },
      { en: "Located near the five banyan trees of Panchavati", hi: "पंचवटी के पाँच बरगद पेड़ों के पास स्थित", mr: "पंचवटीच्या पाच वडांजवळ स्थित" },
    ],
  },
  {
    id: "kapaleshwar",
    name: { en: "Kapaleshwar Temple", hi: "कपालेश्वर मंदिर", mr: "कपालेश्वर मंदिर" },
    distance: 700,
    speed: 5.5,
    spawnRate: 65,
    maxObsH: 50,
    emoji: "🔱",
    accentHue: 310,
    facts: [
      { en: "Ancient Shiva temple near Ramkund on the Godavari bank", hi: "गोदावरी किनारे रामकुंड के पास प्राचीन शिव मंदिर", mr: "गोदावरी किनारी रामकुंडाजवळचे प्राचीन शिव मंदिर" },
      { en: "One of the oldest temples in Nashik, dating to Hemadpanthi era", hi: "हेमाडपंती काल का नासिक का सबसे पुराना मंदिर", mr: "हेमाडपंथी काळातील नाशिकमधील सर्वात जुने मंदिर" },
      { en: "Surrounded by other historic shrines at the riverbank", hi: "नदी किनारे अन्य ऐतिहासिक मंदिरों से घिरा", mr: "नदीकिनारी इतर ऐतिहासिक मंदिरांनी वेढलेले" },
    ],
  },
  {
    id: "tapovan",
    name: { en: "Tapovan", hi: "तपोवन", mr: "तपोवन" },
    distance: 1000,
    speed: 6.0,
    spawnRate: 60,
    maxObsH: 52,
    emoji: "🧘",
    accentHue: 120,
    facts: [
      { en: "Ancient sages performed tapasya here by the Godavari", hi: "प्राचीन ऋषियों ने गोदावरी किनारे यहाँ तपस्या की", mr: "प्राचीन ऋषींनी गोदावरी किनारी येथे तपश्चर्या केली" },
      { en: "Laxman cut Shurpanakha's nose at this very spot", hi: "लक्ष्मण ने शूर्पणखा की नाक यहीं काटी थी", mr: "लक्ष्मणाने शूर्पणखेचे नाक येथेच कापले" },
      { en: "Peaceful riverside area ideal for meditation", hi: "ध्यान के लिए आदर्श शांत नदी किनारा", mr: "ध्यानासाठी आदर्श शांत नदीकिनारा" },
    ],
  },
  {
    id: "panchavati",
    name: { en: "Panchavati Ghat", hi: "पंचवटी घाट", mr: "पंचवटी घाट" },
    distance: 1400,
    speed: 6.5,
    spawnRate: 55,
    maxObsH: 55,
    emoji: "🌳",
    accentHue: 80,
    facts: [
      { en: "Named after 5 banyan trees where Rama, Sita & Laxman rested", hi: "5 बरगद पेड़ों के नाम पर जहाँ राम, सीता, लक्ष्मण ने विश्राम किया", mr: "5 वडांच्या नावावरून, जिथे राम, सीता, लक्ष्मणांनी विश्रांती घेतली" },
      { en: "The Shahi Snan processions pass through Panchavati", hi: "शाही स्नान की शोभायात्रा पंचवटी से गुजरती है", mr: "शाही स्नानाच्या मिरवणुका पंचवटीतून जातात" },
      { en: "One of the oldest and most sacred ghats on the Godavari", hi: "गोदावरी पर सबसे प्राचीन और पवित्र घाटों में से एक", mr: "गोदावरीवरील सर्वात प्राचीन आणि पवित्र घाटांपैकी एक" },
    ],
  },
  {
    id: "sundarnarayan",
    name: { en: "Sundar Narayan Temple", hi: "सुंदर नारायण मंदिर", mr: "सुंदर नारायण मंदिर" },
    distance: 1900,
    speed: 7.0,
    spawnRate: 50,
    maxObsH: 58,
    emoji: "🙏",
    accentHue: 60,
    facts: [
      { en: "Beautiful Vishnu temple with exquisite carvings near Ramkund", hi: "रामकुंड के पास सुंदर नक्काशी वाला विष्णु मंदिर", mr: "रामकुंडाजवळ सुंदर कोरीव विष्णू मंदिर" },
      { en: "Known for its stunning stone architecture and sculptures", hi: "इसकी शानदार पत्थर वास्तुकला और मूर्तियों के लिए प्रसिद्ध", mr: "त्याच्या अप्रतिम दगडी वास्तुकला आणि शिल्पांसाठी प्रसिद्ध" },
      { en: "One of the most photographed temples in Nashik", hi: "नासिक के सबसे अधिक फोटो खींचे जाने वाले मंदिरों में से एक", mr: "नाशिकमधील सर्वाधिक फोटो काढल्या जाणाऱ्या मंदिरांपैकी एक" },
    ],
  },
  {
    id: "someshwar",
    name: { en: "Someshwar Temple", hi: "सोमेश्वर मंदिर", mr: "सोमेश्वर मंदिर" },
    distance: 2500,
    speed: 7.5,
    spawnRate: 46,
    maxObsH: 60,
    emoji: "⛰️",
    accentHue: 200,
    facts: [
      { en: "Ancient Shiva temple near a beautiful waterfall", hi: "एक सुंदर झरने के पास प्राचीन शिव मंदिर", mr: "सुंदर धबधब्याजवळचे प्राचीन शिव मंदिर" },
      { en: "Someshwar waterfall is a popular spot during monsoon", hi: "सोमेश्वर झरना मानसून में लोकप्रिय है", mr: "सोमेश्वर धबधबा पावसाळ्यात लोकप्रिय आहे" },
      { en: "The temple is surrounded by lush green Sahyadri hills", hi: "मंदिर हरी-भरी सह्याद्री पहाड़ियों से घिरा है", mr: "मंदिर हिरव्यागार सह्याद्री टेकड्यांनी वेढलेले आहे" },
    ],
  },
  {
    id: "muktidham",
    name: { en: "Muktidham Temple", hi: "मुक्तिधाम मंदिर", mr: "मुक्तिधाम मंदिर" },
    distance: 3200,
    speed: 8.0,
    spawnRate: 42,
    maxObsH: 62,
    emoji: "🕌",
    accentHue: 170,
    facts: [
      { en: "Made entirely of white marble, replica of 12 Jyotirlingas", hi: "पूरा सफेद संगमरमर से बना, 12 ज्योतिर्लिंगों की प्रतिकृति", mr: "संपूर्ण पांढऱ्या संगमरवराचे, 12 ज्योतिर्लिंगांची प्रतिकृती" },
      { en: "Houses replicas of all 12 Jyotirlinga shrines under one roof", hi: "एक छत के नीचे सभी 12 ज्योतिर्लिंगों की प्रतिकृतियाँ", mr: "एकाच छताखाली सर्व 12 ज्योतिर्लिंगांच्या प्रतिकृती" },
      { en: "Verses from the Bhagavad Gita are inscribed on the walls", hi: "दीवारों पर भगवद्गीता के श्लोक अंकित हैं", mr: "भिंतींवर भगवद्गीतेचे श्लोक कोरलेले आहेत" },
    ],
  },
  {
    id: "trimbakeshwar",
    name: { en: "Trimbakeshwar", hi: "त्र्यंबकेश्वर", mr: "त्र्यंबकेश्वर" },
    distance: 4000,
    speed: 8.5,
    spawnRate: 38,
    maxObsH: 65,
    emoji: "🔥",
    accentHue: 280,
    facts: [
      { en: "One of the 12 sacred Jyotirlingas of Lord Shiva", hi: "भगवान शिव के 12 ज्योतिर्लिंगों में से एक", mr: "भगवान शिवांच्या 12 ज्योतिर्लिंगांपैकी एक" },
      { en: "The source of the holy Godavari River", hi: "पवित्र गोदावरी नदी का उद्गम स्थल", mr: "पवित्र गोदावरी नदीचे उगमस्थान" },
      { en: "30 km from Nashik - Shaiva Akhadas bathe here during Kumbh", hi: "नासिक से 30 किमी - कुंभ में शैव अखाड़े यहाँ स्नान करते हैं", mr: "नाशिकपासून 30 किमी - कुंभात शैव अखाडे येथे स्नान करतात" },
    ],
  },
  {
    id: "pandavleni",
    name: { en: "Pandav Leni Caves", hi: "पांडव लेनी गुफाएं", mr: "पांडव लेणी गुफा" },
    distance: 5000,
    speed: 9.0,
    spawnRate: 35,
    maxObsH: 68,
    emoji: "🏔️",
    accentHue: 30,
    facts: [
      { en: "24 ancient Buddhist caves carved between 1st century BC and 2nd century AD", hi: "पहली शताब्दी ईसा पूर्व से दूसरी शताब्दी ई. के बीच की 24 प्राचीन बौद्ध गुफाएँ", mr: "इसवीसन पूर्व 1ल्या शतकापासून इसवीसन 2ऱ्या शतकापर्यंतच्या 24 प्राचीन बौद्ध लेणी" },
      { en: "Also called Trirashmi Caves, located on a hilltop", hi: "त्रिरश्मी गुफाएँ भी कहा जाता है, पहाड़ी पर स्थित", mr: "त्रिरश्मी लेणी म्हणूनही ओळखल्या जातात, डोंगरमाथ्यावर" },
      { en: "Panoramic views of Nashik city from the cave entrances", hi: "गुफा प्रवेश से नासिक शहर का विहंगम दृश्य", mr: "लेणी प्रवेशद्वारातून नाशिक शहराचे विहंगम दृश्य" },
    ],
  },
  {
    id: "anjneri",
    name: { en: "Anjneri Hill", hi: "अंजनेरी पहाड़", mr: "अंजनेरी डोंगर" },
    distance: 6500,
    speed: 10.0,
    spawnRate: 32,
    maxObsH: 72,
    emoji: "🐒",
    accentHue: 50,
    facts: [
      { en: "Believed to be the birthplace of Lord Hanuman", hi: "भगवान हनुमान का जन्मस्थल माना जाता है", mr: "भगवान हनुमानांचे जन्मस्थान मानले जाते" },
      { en: "A challenging trek with stunning views of Nashik valley", hi: "नासिक घाटी के शानदार दृश्य के साथ चुनौतीपूर्ण ट्रेक", mr: "नाशिक खोऱ्याच्या अप्रतिम दृश्यासह आव्हानात्मक ट्रेक" },
      { en: "The hilltop has ancient Hanuman temple ruins", hi: "पहाड़ी पर प्राचीन हनुमान मंदिर के अवशेष हैं", mr: "डोंगरमाथ्यावर प्राचीन हनुमान मंदिराचे अवशेष आहेत" },
    ],
  },
];

// ─── Types ──────────────────────────────────────────────────────────────────
interface Obs {
  x: number;
  w: number;
  h: number;
  passed: boolean;
}
interface Darshan {
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

interface GS {
  status: "idle" | "playing" | "over";
  py: number;
  pvy: number;
  jumping: boolean;
  obs: Obs[];
  darshans: Darshan[];
  sparks: Spark[];
  distance: number;
  darshanN: number;
  speed: number;
  frame: number;
  gOff: number;
  stars: Star[];
  shake: number;
  runFrame: number;
  currentMilestone: number;
  milestoneJustReached: number;
  factIndex: number;
  factTimer: number;
}

function initState(): GS {
  const stars: Star[] = [];
  for (let i = 0; i < 50; i++) {
    stars.push({
      x: Math.random() * LW,
      y: HUD_H + Math.random() * (GROUND_Y - HUD_H - 80),
      r: 0.4 + Math.random() * 1.2,
      flicker: Math.random() * Math.PI * 2,
    });
  }
  return {
    status: "idle",
    py: GROUND_Y - PH,
    pvy: 0,
    jumping: false,
    obs: [],
    darshans: [],
    sparks: [],
    distance: 0,
    darshanN: 0,
    speed: MILESTONES[0].speed,
    frame: 0,
    gOff: 0,
    stars,
    shake: 0,
    runFrame: 0,
    currentMilestone: 0,
    milestoneJustReached: -1,
    factIndex: 0,
    factTimer: 0,
  };
}

function getCurrentMilestone(distance: number): number {
  for (let i = MILESTONES.length - 1; i >= 0; i--) {
    if (distance >= MILESTONES[i].distance) return i;
  }
  return 0;
}

function getNextMilestone(current: number): MilestoneData | null {
  return current < MILESTONES.length - 1 ? MILESTONES[current + 1] : null;
}

// ─── Drawing Helpers ────────────────────────────────────────────────────────

function drawBg(ctx: CanvasRenderingContext2D, g: GS) {
  const ms = MILESTONES[g.currentMilestone];
  const hue = ms.accentHue;

  // Sky gradient - subtle hue shift per milestone
  const grad = ctx.createLinearGradient(0, HUD_H, 0, GROUND_Y);
  grad.addColorStop(0, "#0B1220");
  grad.addColorStop(0.4, `hsl(${hue}, 15%, 6%)`);
  grad.addColorStop(1, `hsl(${hue}, 20%, 8%)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, HUD_H, LW, GROUND_Y - HUD_H);

  // Stars
  for (const s of g.stars) {
    const alpha = 0.25 + 0.25 * Math.sin(g.frame * 0.02 + s.flicker);
    ctx.fillStyle = `rgba(210,185,79,${alpha})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Background landmark silhouettes (parallax)
  ctx.fillStyle = `hsla(${hue}, 30%, 15%, 0.06)`;
  for (let i = 0; i < 6; i++) {
    const bx = ((i * 90 - g.frame * 0.2) % (LW + 100) + LW + 100) % (LW + 100) - 50;
    const bh = 50 + Math.sin(i * 1.7) * 30;
    const bw = 30 + Math.sin(i * 2.3) * 15;
    ctx.fillRect(bx, GROUND_Y - bh, bw, bh);
    // Spire
    ctx.beginPath();
    ctx.moveTo(bx - 3, GROUND_Y - bh);
    ctx.lineTo(bx + bw / 2, GROUND_Y - bh - bh * 0.4);
    ctx.lineTo(bx + bw + 3, GROUND_Y - bh);
    ctx.fill();
  }

  // River strip
  const riverGrad = ctx.createLinearGradient(0, GROUND_Y, 0, GROUND_Y + 16);
  riverGrad.addColorStop(0, "rgba(20,60,100,0.25)");
  riverGrad.addColorStop(1, "rgba(10,30,60,0.08)");
  ctx.fillStyle = riverGrad;
  ctx.fillRect(0, GROUND_Y, LW, 16);

  // River shimmer
  ctx.fillStyle = "rgba(100,180,255,0.05)";
  for (let i = 0; i < 6; i++) {
    const wx = ((i * 80 - g.frame * 1.2) % LW + LW) % LW;
    ctx.fillRect(wx, GROUND_Y + 3, 30, 2);
  }
}

function drawGround(ctx: CanvasRenderingContext2D, g: GS) {
  const ms = MILESTONES[g.currentMilestone];
  const hue = ms.accentHue;

  const grad = ctx.createLinearGradient(0, GROUND_Y + 16, 0, LH);
  grad.addColorStop(0, `hsl(${hue}, 25%, 12%)`);
  grad.addColorStop(1, "#0B1220");
  ctx.fillStyle = grad;
  ctx.fillRect(0, GROUND_Y + 16, LW, LH - GROUND_Y - 16);

  // Ground top line
  ctx.fillStyle = "rgba(201,162,39,0.12)";
  ctx.fillRect(0, GROUND_Y + 15, LW, 2);

  // Ground dashes
  ctx.fillStyle = "rgba(201,162,39,0.05)";
  for (let i = 0; i < 15; i++) {
    const dx = ((i * 30 - g.gOff) % (LW + 30) + LW + 30) % (LW + 30) - 15;
    ctx.fillRect(dx, GROUND_Y + 26, 15, 2);
  }
}

function drawPlayer(ctx: CanvasRenderingContext2D, g: GS) {
  const px = PLAYER_X;
  const py = g.py;
  const bobY = g.jumping ? 0 : Math.sin(g.runFrame * 0.3) * 2;

  ctx.save();
  ctx.translate(px, py + bobY);

  // Shadow
  if (!g.jumping) {
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.beginPath();
    ctx.ellipse(PW / 2, PH + 2, PW * 0.55, 3, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Body (saffron robe)
  ctx.fillStyle = "#FF8C00";
  ctx.beginPath();
  ctx.roundRect(4, 14, PW - 8, PH - 18, 3);
  ctx.fill();

  // Dhoti (white)
  ctx.fillStyle = "#F5F0E0";
  ctx.beginPath();
  ctx.roundRect(4, PH - 14, PW - 8, 10, [0, 0, 3, 3]);
  ctx.fill();

  // Head
  ctx.fillStyle = "#D4956B";
  ctx.beginPath();
  ctx.arc(PW / 2, 10, 9, 0, Math.PI * 2);
  ctx.fill();

  // Tilak
  ctx.fillStyle = "#C9A227";
  ctx.fillRect(PW / 2 - 1.5, 5, 3, 5);

  // Legs
  if (!g.jumping) {
    const lp = Math.sin(g.runFrame * 0.4);
    ctx.fillStyle = "#D4956B";
    ctx.fillRect(7, PH - 5, 4, 5 + lp * 3);
    ctx.fillRect(PW - 11, PH - 5, 4, 5 - lp * 3);
  }

  ctx.restore();
}

function drawObs(ctx: CanvasRenderingContext2D, obs: Obs) {
  const x = obs.x;
  const y = GROUND_Y + 16 - obs.h;
  const w = obs.w;
  const h = obs.h;

  ctx.fillStyle = "#4a3520";
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = "#5a4530";
  ctx.fillRect(x - 2, y, w + 4, 5);
  ctx.fillStyle = "#C9A227";
  ctx.beginPath();
  ctx.moveTo(x - 1, y);
  ctx.lineTo(x + w / 2, y - 8);
  ctx.lineTo(x + w + 1, y);
  ctx.fill();
  ctx.fillStyle = "rgba(201,162,39,0.25)";
  ctx.fillRect(x + w / 2 - 1.5, y + 5, 3, h - 5);
}

function drawDarshan(ctx: CanvasRenderingContext2D, d: Darshan, frame: number) {
  if (d.collected) return;
  const x = d.x;
  const y = d.y + Math.sin(frame * 0.06 + d.x) * 4;

  // Glowing prayer circle
  ctx.save();
  ctx.shadowColor = "#D2B94F";
  ctx.shadowBlur = 14;
  ctx.fillStyle = "#D2B94F";
  ctx.beginPath();
  ctx.arc(x, y, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Inner warm glow
  ctx.fillStyle = "rgba(255,140,0,0.5)";
  ctx.beginPath();
  ctx.arc(x, y, 6, 0, Math.PI * 2);
  ctx.fill();

  // Prayer hands drawn as simple icon
  ctx.fillStyle = "#0B1220";
  ctx.font = "bold 10px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🙏", x, y);
}

function drawSparks(ctx: CanvasRenderingContext2D, sparks: Spark[]) {
  for (const s of sparks) {
    const a = s.life / 30;
    ctx.fillStyle = s.color === "#D2B94F"
      ? `rgba(210,185,79,${a})`
      : `rgba(255,100,0,${a})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size * a, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawHUD(ctx: CanvasRenderingContext2D, g: GS, locale: Locale) {
  const ms = MILESTONES[g.currentMilestone];
  const next = getNextMilestone(g.currentMilestone);

  // HUD background
  const hGrad = ctx.createLinearGradient(0, 0, 0, HUD_H);
  hGrad.addColorStop(0, "rgba(11,18,32,0.95)");
  hGrad.addColorStop(1, "rgba(11,18,32,0.7)");
  ctx.fillStyle = hGrad;
  ctx.fillRect(0, 0, LW, HUD_H);
  ctx.fillStyle = "rgba(201,162,39,0.1)";
  ctx.fillRect(0, HUD_H - 1, LW, 1);

  // Distance (left)
  ctx.font = "bold 22px sans-serif";
  ctx.fillStyle = "#D2B94F";
  ctx.textAlign = "left";
  ctx.shadowColor = "rgba(210,185,79,0.3)";
  ctx.shadowBlur = 8;
  ctx.fillText(`${Math.floor(g.distance)}m`, 12, 32);
  ctx.shadowBlur = 0;

  // Darshans collected (left below distance)
  if (g.darshanN > 0) {
    ctx.font = "bold 14px sans-serif";
    ctx.fillStyle = "#D2B94F";
    ctx.fillText(`🙏 ×${g.darshanN}`, 12, 52);
  }

  // Current place (right)
  ctx.font = "bold 13px sans-serif";
  ctx.fillStyle = "#C9A227";
  ctx.textAlign = "right";
  ctx.fillText(`📍 ${ms.name[locale]}`, LW - 12, 28);

  // Next milestone progress
  if (next) {
    const progress = Math.min(1, (g.distance - ms.distance) / (next.distance - ms.distance));
    const remaining = Math.max(0, next.distance - Math.floor(g.distance));

    ctx.font = "11px sans-serif";
    ctx.fillStyle = "rgba(255,248,230,0.4)";
    ctx.fillText(
      `${locale === "en" ? "Next" : locale === "hi" ? "अगला" : "पुढील"}: ${next.name[locale]} - ${remaining}m`,
      LW - 12,
      46
    );

    // Progress bar
    const barW = 130;
    const barX = LW - 12 - barW;
    const barY = 54;
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(barX, barY, barW, 4);
    ctx.fillStyle = "rgba(201,162,39,0.5)";
    ctx.fillRect(barX, barY, barW * progress, 4);
    // Glow dot at progress end
    ctx.fillStyle = "#C9A227";
    ctx.beginPath();
    ctx.arc(barX + barW * progress, barY + 2, 3, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.font = "11px sans-serif";
    ctx.fillStyle = "rgba(201,162,39,0.5)";
    ctx.fillText(
      locale === "en" ? "Final Milestone!" : locale === "hi" ? "अंतिम मील का पत्थर!" : "अंतिम टप्पा!",
      LW - 12,
      46
    );
  }
}

function drawMilestoneArrival(ctx: CanvasRenderingContext2D, g: GS, locale: Locale) {
  if (g.milestoneJustReached < 0) return;

  const ms = MILESTONES[g.milestoneJustReached];
  const age = g.frame - g.factTimer; // reusing factTimer for arrival time
  if (age > 120) {
    g.milestoneJustReached = -1;
    return;
  }

  const alpha = age < 20 ? age / 20 : age > 100 ? (120 - age) / 20 : 1;
  const scale = age < 20 ? 0.8 + 0.2 * (age / 20) : 1;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(LW / 2, GROUND_Y / 2 + 30);
  ctx.scale(scale, scale);

  // Glow backdrop
  ctx.fillStyle = "rgba(11,18,32,0.6)";
  ctx.beginPath();
  ctx.roundRect(-110, -40, 220, 80, 12);
  ctx.fill();
  ctx.strokeStyle = "rgba(201,162,39,0.3)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Emoji
  ctx.font = "30px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(ms.emoji, 0, -8);

  // Name
  ctx.font = "bold 16px sans-serif";
  ctx.fillStyle = "#D2B94F";
  ctx.fillText(ms.name[locale], 0, 16);

  // Arrived text
  ctx.font = "11px sans-serif";
  ctx.fillStyle = "rgba(255,248,230,0.6)";
  ctx.fillText(
    locale === "en" ? "Milestone Reached!" : locale === "hi" ? "मील का पत्थर पहुँचे!" : "टप्पा गाठला!",
    0,
    32
  );

  ctx.restore();
}

function drawFrame(ctx: CanvasRenderingContext2D, g: GS, locale: Locale) {
  ctx.save();

  if (g.shake > 0) {
    ctx.translate((Math.random() - 0.5) * g.shake, (Math.random() - 0.5) * g.shake);
  }

  ctx.clearRect(-10, -10, LW + 20, LH + 20);

  drawBg(ctx, g);
  drawGround(ctx, g);

  for (const o of g.obs) drawObs(ctx, o);
  for (const d of g.darshans) drawDarshan(ctx, d, g.frame);
  drawPlayer(ctx, g);
  drawSparks(ctx, g.sparks);

  if (g.status === "playing" || g.status === "over") {
    drawHUD(ctx, g, locale);
    drawMilestoneArrival(ctx, g, locale);
  }

  ctx.restore();
}

// ─── Page Component ─────────────────────────────────────────────────────────
export default function KumbhRunPage() {
  const { t, locale } = useLanguage();
  const kr = translations.kumbhRunPage;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gsRef = useRef<GS>(initState());
  const rafRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const localeRef = useRef<Locale>(locale);
  localeRef.current = locale;

  const [gameStatus, setGameStatus] = useState<"idle" | "playing" | "over">("idle");
  const [finalScore, setFinalScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [copied, setCopied] = useState(false);
  const [currentFact, setCurrentFact] = useState<string>("");
  const [milestonesReached, setMilestonesReached] = useState<number[]>([]);

  useEffect(() => {
    try {
      const best = parseInt(localStorage.getItem("kumbhrun_best") || "0");
      setHighScore(best);
    } catch { /* */ }
  }, []);

  // Setup canvas - portrait optimized
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();

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

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) drawFrame(ctx, gsRef.current, localeRef.current);
  }, []);

  // Game loop
  const gameLoop = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const g = gsRef.current;

    if (g.status !== "playing") {
      drawFrame(ctx, g, localeRef.current);
      return;
    }

    g.frame++;
    g.runFrame++;

    // Get current milestone and update speed
    const prevMilestone = g.currentMilestone;
    g.currentMilestone = getCurrentMilestone(g.distance);
    const ms = MILESTONES[g.currentMilestone];
    g.speed = ms.speed;

    // Milestone just reached?
    if (g.currentMilestone > prevMilestone && g.currentMilestone > 0) {
      g.milestoneJustReached = g.currentMilestone;
      g.factTimer = g.frame;

      // Celebration sparks
      for (let i = 0; i < 20; i++) {
        g.sparks.push({
          x: LW / 2 + (Math.random() - 0.5) * 200,
          y: GROUND_Y / 2 + (Math.random() - 0.5) * 100,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          life: 30 + Math.random() * 20,
          color: "#D2B94F",
          size: 3 + Math.random() * 4,
        });
      }

      setMilestonesReached(prev => [...prev, g.currentMilestone]);
    }

    // Rotate facts every ~5 seconds (300 frames)
    if (g.frame % 300 === 0 || g.currentMilestone !== prevMilestone) {
      g.factIndex = (g.factIndex + 1) % ms.facts.length;
      setCurrentFact(ms.facts[g.factIndex][localeRef.current]);
    }

    // Distance (1 frame ~ speed * 0.3 meters)
    g.distance += g.speed * 0.3;
    g.gOff = (g.gOff + g.speed) % 30;

    // Player physics
    g.pvy += GRAVITY;
    g.py += g.pvy;
    if (g.py >= GROUND_Y - PH) {
      g.py = GROUND_Y - PH;
      g.pvy = 0;
      g.jumping = false;
    }

    // Spawn obstacles (rate from current milestone)
    const spawnRate = Math.max(40, Math.floor(ms.spawnRate / (g.speed / ms.speed)));
    if (g.frame % spawnRate === 0) {
      const h = 25 + Math.random() * ms.maxObsH * 0.6;
      const w = 20 + Math.random() * 16;
      g.obs.push({ x: LW + 30, w, h, passed: false });

      if (Math.random() < DARSHAN_CHANCE) {
        g.darshans.push({
          x: LW + 30 + w / 2,
          y: GROUND_Y - h - 25 - Math.random() * 35,
          collected: false,
        });
      }
    }

    // Move
    for (const o of g.obs) {
      o.x -= g.speed;
      if (!o.passed && o.x + o.w < PLAYER_X) o.passed = true;
    }
    for (const d of g.darshans) d.x -= g.speed;

    // Cleanup
    g.obs = g.obs.filter(o => o.x > -80);
    g.darshans = g.darshans.filter(d => d.x > -50);

    // Collision
    const px1 = PLAYER_X + 5;
    const px2 = PLAYER_X + PW - 5;
    const py2 = g.py + PH;

    for (const o of g.obs) {
      const ox1 = o.x + 3;
      const ox2 = o.x + o.w - 3;
      const oy = GROUND_Y + 16 - o.h;

      if (px2 > ox1 && px1 < ox2 && py2 > oy) {
        g.status = "over";
        g.shake = 10;

        for (let i = 0; i < 12; i++) {
          g.sparks.push({
            x: PLAYER_X + PW / 2,
            y: g.py + PH / 2,
            vx: (Math.random() - 0.5) * 7,
            vy: (Math.random() - 0.5) * 7 - 3,
            life: 25 + Math.random() * 15,
            color: "#FF6B00",
            size: 3 + Math.random() * 3,
          });
        }

        const total = Math.floor(g.distance) + g.darshanN * 10;
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

    // Darshan collection
    for (const d of g.darshans) {
      if (d.collected) continue;
      const dy = d.y + Math.sin(g.frame * 0.06 + d.x) * 4;
      if (
        PLAYER_X + PW > d.x - 10 &&
        PLAYER_X < d.x + 10 &&
        g.py < dy + 12 &&
        g.py + PH > dy - 12
      ) {
        d.collected = true;
        g.darshanN++;
        for (let i = 0; i < 6; i++) {
          g.sparks.push({
            x: d.x,
            y: dy,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4 - 2,
            life: 18 + Math.random() * 10,
            color: "#D2B94F",
            size: 2 + Math.random() * 2,
          });
        }
      }
    }

    // Sparks update
    g.sparks = g.sparks.filter(s => {
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.12;
      s.life--;
      return s.life > 0;
    });

    if (g.shake > 0) g.shake *= 0.85;

    drawFrame(ctx, g, localeRef.current);

    if (g.status === "playing") {
      rafRef.current = requestAnimationFrame(gameLoop);
    } else {
      drawFrame(ctx, g, localeRef.current);
    }
  }, []);

  const startGame = useCallback(() => {
    gsRef.current = initState();
    gsRef.current.status = "playing";
    setGameStatus("playing");
    setCopied(false);
    setMilestonesReached([0]);
    setCurrentFact(MILESTONES[0].facts[0][localeRef.current]);
    rafRef.current = requestAnimationFrame(gameLoop);
  }, [gameLoop]);

  const jump = useCallback(() => {
    const g = gsRef.current;
    if (g.status === "idle") { startGame(); return; }
    if (g.status === "over") return;
    if (!g.jumping) {
      g.pvy = JUMP_VEL;
      g.jumping = true;
    }
  }, [startGame]);

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

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  // Share with milestones
  const handleShare = useCallback(() => {
    const g = gsRef.current;
    const total = finalScore;
    const places = milestonesReached
      .map(i => `${MILESTONES[i].emoji} ${MILESTONES[i].name[localeRef.current]}`)
      .join(" → ");
    const nextMs = getNextMilestone(g.currentMilestone);
    const nextText = nextMs
      ? `\n🎯 ${localeRef.current === "en" ? "Next" : localeRef.current === "hi" ? "अगला" : "पुढील"}: ${nextMs.name[localeRef.current]}`
      : "";

    const darshanText = localeRef.current === "en"
      ? `🙏 I collected ${g.darshanN} Darshans! How many can you collect?`
      : localeRef.current === "hi"
      ? `🙏 मैंने ${g.darshanN} दर्शन किए! आप कितने कर सकते हैं?`
      : `🙏 मी ${g.darshanN} दर्शन घेतले! तुम्ही किती घेऊ शकता?`;

    const text = `🏃 ${localeRef.current === "mr" ? "कुंभ रन - नाशिक यात्रा!" : localeRef.current === "hi" ? "कुंभ रन - नासिक यात्रा!" : "Kumbh Run - Nashik Yatra!"}\n📍 ${places}${nextText}\n${darshanText}\n🏆 ${localeRef.current === "en" ? "Score" : "स्कोअर"}: ${total}\nthenashikkumbh.com/kumbhrun`;

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
  }, [finalScore, milestonesReached]);

  const placesVisited = milestonesReached.length;
  const totalPlaces = MILESTONES.length;

  return (
    <div className="section-dark flex min-h-screen flex-col">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid rgba(201,162,39,0.1)" }}
      >
        <Link
          href="/games"
          className="inline-flex items-center gap-1 text-sm font-medium text-cream-300/60 hover:text-[#C9A227] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t(kr.backToGames)}
        </Link>
        <h1 className="font-heading text-lg font-bold" style={{ color: "#C9A227" }}>
          {t(kr.title)}
        </h1>
        <div className="flex items-center gap-1 text-sm text-cream-300/40">
          <Trophy className="h-3.5 w-3.5" style={{ color: "#C9A227" }} />
          {highScore}
        </div>
      </div>

      {/* Fact ticker - shows during gameplay */}
      {gameStatus === "playing" && currentFact && (
        <div
          className="px-4 py-2 text-center text-xs leading-relaxed"
          style={{
            color: "rgba(255,248,230,0.55)",
            background: "rgba(201,162,39,0.04)",
            borderBottom: "1px solid rgba(201,162,39,0.06)",
          }}
        >
          💡 {currentFact}
        </div>
      )}

      {/* Game Container - fills available space */}
      <div
        ref={containerRef}
        className="relative flex flex-1 items-center justify-center bg-[#0B1220]"
        style={{ minHeight: 0 }}
      >
        <canvas
          ref={canvasRef}
          className="block cursor-pointer"
          style={{ maxWidth: "100%", maxHeight: "100%", touchAction: "none" }}
          onPointerDown={(e) => { e.preventDefault(); jump(); }}
        />

        {/* Idle Overlay */}
        {gameStatus === "idle" && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            style={{ background: "rgba(11,18,32,0.8)" }}
            onPointerDown={(e) => { e.preventDefault(); startGame(); }}
          >
            <div className="text-center">
              <p
                className="mb-1 font-devanagari text-3xl"
                style={{ color: "#C9A227", textShadow: "0 0 20px rgba(201,162,39,0.4)" }}
              >
                कुंभ रन
              </p>
              <h2 className="mb-3 font-heading text-2xl font-bold" style={{ color: "#D2B94F" }}>
                {t(kr.title)}
              </h2>
              <p className="mb-1 text-sm text-cream-300/50">
                {t(kr.subtitle)}
              </p>

              {/* Milestone preview */}
              <div className="mx-auto my-5 max-w-[280px] rounded-xl p-4"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(201,162,39,0.1)",
                }}
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "#C9A227" }}>
                  <MapPin className="mr-1 inline h-3 w-3" />
                  {t(kr.milestones)}
                </p>
                <div className="space-y-1.5 text-left">
                  {MILESTONES.map((ms, i) => (
                    <div key={ms.id} className="flex items-center gap-2 text-xs text-cream-300/40">
                      <span>{ms.emoji}</span>
                      <span className="flex-1">{ms.name[locale]}</span>
                      <span className="text-cream-300/20">{ms.distance}m</span>
                      <span className="text-cream-300/15">{"●".repeat(Math.min(i + 1, 5))}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-base text-cream-300/60">
                {t(kr.tapToStart)}
              </p>
            </div>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameStatus === "over" && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            style={{ background: "rgba(11,18,32,0.85)" }}
          >
            <div className="w-full max-w-[320px] text-center">
              <h2 className="mb-1 font-heading text-2xl font-bold" style={{ color: "#D2B94F" }}>
                {t(kr.gameOver)}
              </h2>
              <p className="mb-1 font-heading text-5xl font-bold" style={{ color: "#C9A227" }}>
                {finalScore}
              </p>
              <p className="mb-1 text-sm text-cream-300/50">
                🙏 {gsRef.current.darshanN} {locale === "en" ? "Darshans" : "दर्शन"} | {Math.floor(gsRef.current.distance)}m
              </p>
              {finalScore >= highScore && finalScore > 0 && (
                <p className="mb-2 text-sm font-bold text-amber-400">
                  {t(kr.newBest)}
                </p>
              )}

              {/* Milestones visited */}
              <div
                className="my-4 rounded-xl p-3 text-left"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(201,162,39,0.1)",
                }}
              >
                <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wider" style={{ color: "#C9A227" }}>
                  <MapPin className="mr-1 inline h-3 w-3" />
                  {t(kr.placesVisited)} ({placesVisited}/{totalPlaces})
                </p>
                <div className="space-y-1">
                  {MILESTONES.map((ms, i) => {
                    const visited = milestonesReached.includes(i);
                    return (
                      <div
                        key={ms.id}
                        className="flex items-center gap-2 text-xs"
                        style={{ color: visited ? "rgba(255,248,230,0.7)" : "rgba(255,248,230,0.15)" }}
                      >
                        <span>{ms.emoji}</span>
                        <span className="flex-1">{ms.name[locale]}</span>
                        {visited
                          ? <span style={{ color: "#C9A227" }}>✓</span>
                          : <span className="text-cream-300/15">{ms.distance}m</span>
                        }
                      </div>
                    );
                  })}
                </div>
                {placesVisited < totalPlaces && (
                  <p className="mt-2 text-center text-xs text-cream-300/30">
                    {t(kr.visitEncourage)}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={startGame}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-[#0B1220] transition-all hover:scale-[1.03] active:scale-[0.97]"
                  style={{
                    background: "linear-gradient(135deg, #C9A227, #D2B94F)",
                    boxShadow: "0 4px 20px rgba(201,162,39,0.3)",
                  }}
                >
                  <RotateCcw className="h-4 w-4" />
                  {t(kr.playAgain)}
                </button>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium text-cream-100 transition-all hover:bg-white/5"
                  style={{ borderColor: "rgba(201,162,39,0.3)" }}
                >
                  <Share2 className="h-4 w-4" />
                  {copied ? t(translations.gamesPage.dailyCopied) : t(kr.share)}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom hint */}
      {gameStatus === "playing" && (
        <div className="py-2 text-center text-xs text-cream-300/25">
          {t(kr.hint)}
        </div>
      )}
    </div>
  );
}
