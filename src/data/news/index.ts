import type { BlogArticle } from "@/data/blogData";
import { article as dhwajarohan } from "./dhwajarohan-programme-2026";
import { article as kushavarta } from "./kushavarta-closed-renovation";
import { article as budget } from "./budget-update-2026";
import { article as ringRoad } from "./ring-road-update";
import { article as ramkund } from "./ramkund-works-delay";
import { article as stp } from "./godavari-stp-project";
import { article as commandCentre } from "./third-command-centre-cctv";
import { article as health } from "./health-plan-260-crore";
import { article as disaster } from "./fire-disaster-plan-92-crore";
import { article as tents } from "./private-tent-city-sop";
import { article as homestays } from "./homestays-airbnb";
import { article as overseas } from "./overseas-visitors";
import { article as ghats } from "./twelve-new-ghats";

/** News posts published from the 6 October 2026 briefing, one file each. */
export const latestNews: BlogArticle[] = [
  dhwajarohan,
  kushavarta,
  ramkund,
  commandCentre,
  overseas,
  tents,
  health,
  stp,
  ringRoad,
  budget,
  disaster,
  homestays,
  ghats,
];
