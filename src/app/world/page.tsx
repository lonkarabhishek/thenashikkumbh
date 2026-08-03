import type { Metadata } from "next";
import ScrollWorld from "@/components/scrollworld/ScrollWorld";

export const metadata: Metadata = {
  title: "The World of the Nashik Kumbh — scroll to fly through it",
  description:
    "Scroll from the spring on Brahmagiri where the Godavari begins, down through Trimbakeshwar and the river, to the ghats of Panchavati and the Shahi Snan before dawn.",
  alternates: { canonical: "https://thenashikkumbh.com/world" },
  // Preview only for now — kept out of search until it is signed off.
  robots: { index: false, follow: true },
};

export default function WorldPage() {
  return <ScrollWorld />;
}
