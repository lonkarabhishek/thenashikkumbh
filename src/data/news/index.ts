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
import { article as police } from "./police-housing-127-halls";
import { article as banks } from "./banks-cash-limit-mobile-atms";
import { article as roads } from "./eighteen-roads-asphalting-november";
import { article as icu } from "./health-icu-posts-ghats";
import { article as ramayana } from "./ramayana-theme-park-nmc";
import { article as trimbakHospital } from "./trimbakeshwar-hospital-new-site";
import { article as ramjhula } from "./ramjhula-ram-figure-proposal";
import { article as samarth } from "./swami-samarth-kendra-protest";
import { article as godavariSample } from "./godavari-water-sampled-high-court";

/** News posts published from the 6 and 7 October 2026 briefings, one file each. */
export const latestNews: BlogArticle[] = [
  // 7 October 2026
  police,
  banks,
  icu,
  roads,
  trimbakHospital,
  ramayana,
  ramjhula,
  samarth,
  godavariSample,
  // 6 October 2026
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
