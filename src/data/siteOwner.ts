/**
 * Who runs the site. Facts only: every field here was supplied by the owner.
 * Do not add a city, email, photo or social profile until the owner gives it.
 */
export const SITE_OWNER = {
  name: "Abhishek Lonkar",
  github: "https://github.com/lonkarabhishek",
  website: "https://workwithabhi.online",
  studio: "https://studio.workwithabhi.online",
  bio: {
    en: "Abhishek Lonkar runs The Nashik Kumbh. He is a business analyst (GTM analytics) and also runs studio.workwithabhi.online.",
    hi: "अभिषेक लोणकर द नाशिक कुंभ चलाते हैं। वे बिज़नेस एनालिस्ट (GTM एनालिटिक्स) हैं और studio.workwithabhi.online भी चलाते हैं।",
    mr: "अभिषेक लोणकर द नाशिक कुंभ चालवतात. ते बिझनेस ॲनालिस्ट (GTM ॲनालिटिक्स) आहेत आणि studio.workwithabhi.online हेही चालवतात.",
  },
} as const;

/** Only profiles confirmed to exist. */
export const OWNER_SAME_AS = [SITE_OWNER.github, SITE_OWNER.website, SITE_OWNER.studio];

/** Posts whose search intent is "Kumbh dates": /dates is the canonical answer. */
export const DATE_INTENT_SLUGS = ["amrit-snan-dates-confirmed-2027", "shahi-snan-renamed-amrit-snan"];
