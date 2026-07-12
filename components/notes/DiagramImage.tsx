import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";

/**
 * Renders a finished diagram image within study notes. Use this once a
 * diagram has been generated from a DiagramPrompt's prompt text — swap
 * the DiagramPrompt for this component and pass the image path.
 */
export function DiagramImage({
  title,
  src,
  alt,
  width = 1200,
  height = 800,
}: {
  title: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  return (
    <div className="rounded-sm border border-graphite/10 dark:border-white/10 bg-paper-surface dark:bg-graphite-soft p-5">
      <div className="flex items-center gap-2 mb-3">
        <ImageIcon size={15} className="text-slate shrink-0" />
        <p className="text-sm font-medium text-graphite dark:text-paper">{title}</p>
      </div>
      <div className="rounded-xs overflow-hidden bg-white flex justify-center">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full max-w-2xl"
        />
      </div>
    </div>
  );
}
