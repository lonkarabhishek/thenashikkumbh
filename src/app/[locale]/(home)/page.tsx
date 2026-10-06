import HomePage from "@/components/home/HomePage";
import { blogArticles } from "@/data/blogData";

// Server wrapper: hands the client home page just the three newest
// headlines, so post bodies are not bundled into its JavaScript.
export default function Page() {
  const news = blogArticles.slice(0, 3).map(({ slug, date, title }) => ({ slug, date, title }));
  return <HomePage news={news} />;
}
