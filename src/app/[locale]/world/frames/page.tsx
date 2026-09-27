import type { Metadata } from "next";
import { worldScenes } from "@/components/scrollworld/IsoScenes";

export const metadata: Metadata = {
  title: "Scroll world: scene sheet",
  robots: { index: false, follow: false },
};

const LABELS = [
  "1 · Brahmagiri: the spring",
  "2 · Trimbakeshwar: the temple",
  "3 · Panchavati: the ghats",
  "4 · Sadhugram: the tent city",
  "5 · Shahi Snan: before dawn",
];

/**
 * A still of every scroll-world scene, composited at rest. Useful for reviewing
 * the art without having to fly through it.
 */
export default function WorldFramesPage({
  searchParams,
}: {
  searchParams: { only?: string };
}) {
  const only = Number(searchParams.only);
  const shown = worldScenes
    .map((scene, i) => ({ scene, i }))
    .filter(({ i }) => !Number.isFinite(only) || i === only - 1);

  return (
    <div className="bg-cream-100 pt-24">
      <div className="section-container pb-16">
        <h1 className="text-title">Scroll world: scene sheet</h1>
        <p className="mt-3 text-temple-500">
          Each frame below is one scene at rest. In the live page the camera dollies
          through all three depth layers of each, then flows into the next.
        </p>

        <div className="mt-10 space-y-10">
          {shown.map(({ scene, i }) => {
            const { Far, Mid, Near } = scene;
            return (
              <figure key={scene.id}>
                <div
                  className="relative aspect-[16/9] w-full overflow-hidden rounded-card border border-temple-200"
                  style={{ backgroundColor: scene.bg }}
                >
                  <div className="absolute inset-0">
                    <Far />
                  </div>
                  <div className="absolute inset-0">
                    <Mid />
                  </div>
                  <div className="absolute inset-0">
                    <Near />
                  </div>
                </div>
                <figcaption className="mt-3 text-sm font-semibold text-temple-700">
                  {LABELS[i]}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  );
}
