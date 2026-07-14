import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

/**
 * Renders a supplied study-note diagram when one is available. The title is
 * intentionally used as the stable key because it is already authored beside
 * each prompt in the note content. Any future prompt without an image keeps
 * the original visible scaffold instead of failing silently.
 */
type DiagramAsset = {
  src: string;
  alt: string;
};

function assetFor(title: string, prompt: string): DiagramAsset | undefined {
  // Match both authored fields so existing notes work even where a short
  // heading such as “Diagram” was used.
  const key = `${title} ${prompt}`.toLowerCase();

  if (key.includes("animal")) {
    return {
      src: "/images/biology/animal-cell.png",
      alt: "Labelled diagram of a generalised animal cell showing its nucleus, cytoplasm, cell membrane, mitochondria and ribosomes.",
    };
  }

  if (key.includes("plant")) {
    return {
      src: "/images/biology/plant-cell.png",
      alt: "Labelled diagram of a generalised plant cell showing its nucleus, cytoplasm, cell membrane, mitochondria, ribosomes, chloroplasts, permanent vacuole and cell wall.",
    };
  }

  if (key.includes("specialised") || key.includes("specialized")) {
    return {
      src: "/images/biology/specialised-cells.png",
      alt: "Comparison of sperm, nerve, muscle, root hair, xylem and phloem cells.",
    };
  }

  if (key.includes("microscope")) {
    return {
      src: "/images/biology/microscope-comparison.png",
      alt: "Side-by-side comparison of light and electron microscopes, showing their relative magnification and resolution.",
    };
  }

  return undefined;
}

export function DiagramPrompt({
  title,
  prompt,
}: {
  title: string;
  prompt: string;
}) {
  const asset = assetFor(title, prompt);

  if (asset) {
    return (
      <figure className="my-8 overflow-hidden rounded-sm border border-graphite/10 bg-paper dark:border-white/15 dark:bg-graphite">
        <Image
          src={asset.src}
          alt={asset.alt}
          width={1408}
          height={768}
          className="h-auto w-full bg-white object-contain"
        />
        <figcaption className="border-t border-graphite/10 px-4 py-3 text-sm font-medium text-graphite dark:border-white/15 dark:text-paper">
          {title}
        </figcaption>
      </figure>
    );
  }

  return (
    <section className="my-8 rounded-sm border border-dashed border-amber/40 bg-amber-light/30 p-5 dark:bg-amber/10">
      <div className="flex flex-wrap items-center gap-2">
        <ImageIcon className="h-4 w-4 text-amber" aria-hidden="true" />
        <p className="font-medium text-graphite dark:text-paper">{title}</p>
        <Badge tone="amber">Vector illustration — not generated yet</Badge>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate">{prompt}</p>
    </section>
  );
}
