import { DrinkArt } from "./Illustrations";
import { sitePath } from "./sitePath";

export function ChausMascot({ className = "" }: { className?: string }) {
  return (
    <img
      className={`chaus-mascot ${className}`}
      src={sitePath("/images/chaus-mascot-v2.webp")}
      alt=""
      width="1254"
      height="1254"
      loading="lazy"
    />
  );
}
export function FlavorArt({
  type = "cup",
  className = "",
  itemId,
}: {
  type?: string;
  className?: string;
  itemId?: string;
}) {
  const assets: Record<string, string> = {
    bee: "nutty-bee",
    flower: "honeysuckle",
    star: "milky-way",
  };
  const exact = ["nutty-bee", "honeysuckle", "milky-way"].includes(itemId || "")
    ? itemId
    : undefined;
  const asset = itemId ? exact : assets[type];
  return asset ? (
    <img
      className={`drink-art flavor-sticker ${className}`}
      src={sitePath(`/images/${asset}-v2.webp`)}
      alt=""
      loading="lazy"
      width="1254"
      height="1254"
    />
  ) : (
    <DrinkArt type={type} className={className} />
  );
}
