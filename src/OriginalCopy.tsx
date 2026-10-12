import copy from "./originalCopy.json";

type CopyBlock = {
  text: string;
  segments: { text: string; href?: string }[];
};
type CopySection = {
  title: string;
  source: string;
  note?: string;
  columns?: string;
  blocks: CopyBlock[];
};
const sectionsByPage: Record<string, CopySection[]> = copy;
const labels: Record<string, string> = {
  "/about": "more about chaüs",
  "/menu": "the full menu",
  "/catering": "catering details",
  "/community": "more around chaüs",
  "/sustainability": "our commitments & Bean Fund",
  "/visit": "coffee vouchers",
  "/policies": "past updates",
};

function Paragraph({ block }: { block: CopyBlock }) {
  if (block.text.includes("•") && block.segments.every((segment) => !segment.href)) {
    const [intro, ...items] = block.text.split("•");
    return <>
      {intro.trim() && <p>{intro.trim()}</p>}
      <ul>{items.filter((item) => item.trim()).map((item, index) => <li key={index}>{item.trim()}</li>)}</ul>
    </>;
  }
  // Replace the old menu's visual dot leaders with readable, wrapping rows.
  const menuRow = block.text.split(/\.{2,}/).map((part) => part.trim()).filter(Boolean);
  if (menuRow.length > 1) {
    return (
      <div className="original-menu-row">
        <span>{menuRow[0]}</span>
        <span>{menuRow.slice(1).join(" / ")}</span>
      </div>
    );
  }
  const prices = [...block.text.matchAll(/(Carafe|Baby Cambro|Cambro|1\/2 Dozen|One Dozen)\s*(\$\d+(?:\.\d+)?)/g)];
  if (prices.length) {
    return (
      <div className="original-price-list">
        {prices.map(([text, label, price], index) => (
          <div className="original-menu-row" key={`${text}-${index}`}>
            <span>{label}</span><span>{price}</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <p>
      {block.segments.map((segment, index) => segment.href ? (
        <a key={index} href={segment.href} target="_blank" rel="noopener noreferrer">
          {segment.text}
        </a>
      ) : segment.text)}
    </p>
  );
}

export function OriginalCopy({ page }: { page: string }) {
  const sections = sectionsByPage[page];
  if (!sections) return null;
  return (
    <section className="container original-copy" aria-label="More about Coffeehouse">
      <details className="original-copy-folder">
        <summary>
          <span>{labels[page]}</span>
        </summary>
        <div className="original-copy-content">
          {sections.map((section) => (
            <details className="original-copy-section" key={section.title}>
              <summary>{section.title}</summary>
              <div className="original-copy-body">
                {section.note && <p className="original-copy-note">{section.note}</p>}
                {section.columns && <p className="original-copy-columns">{section.columns}</p>}
                {section.blocks.map((block, index) => <Paragraph key={index} block={block} />)}
              </div>
            </details>
          ))}
        </div>
      </details>
    </section>
  );
}
