import HomePage from "@/components/home/HomePage";
import { blogArticles } from "@/data/blogData";
import { getPhoto, isPhotoAvailable } from "@/data/photos";

/** Photos for the home page's drifting strip, in display order. */
const GLIMPSES = [1, 41, 8, 26, 29, 32, 14, 44, 21, 13, 47, 31, 45, 3, 37, 10];

// Server wrapper: hands the client home page just the three newest
// headlines and the strip's photos, so post bodies and the full photo
// list are not bundled into its JavaScript.
export default function Page() {
  const news = blogArticles.slice(0, 3).map(({ slug, date, title }) => ({ slug, date, title }));
  const glimpses = GLIMPSES.filter(isPhotoAvailable)
    .map((id) => getPhoto(id)!)
    .map(({ id, file, alt, width, height, author, license }) => ({ id, file, alt, width, height, author, license }));
  return <HomePage news={news} glimpses={glimpses} />;
}
