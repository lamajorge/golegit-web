import type { Block } from "@/lib/notion";
import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

// ─────────────────────────────────────────────────────────────
// Rich text inline con anotaciones
// ─────────────────────────────────────────────────────────────
function RichText({ items }: { items: RichTextItemResponse[] }) {
  return (
    <>
      {items.map((item, i) => {
        const { bold, italic, strikethrough, code, underline, color } = item.annotations;
        let text: React.ReactNode = item.plain_text;

        if (code) text = <code className="bg-gray-100 text-brand-700 text-[0.85em] px-1.5 py-0.5 rounded font-mono">{text}</code>;
        if (bold) text = <strong className="font-semibold text-ink">{text}</strong>;
        if (italic) text = <em>{text}</em>;
        if (strikethrough) text = <s>{text}</s>;
        if (underline) text = <u>{text}</u>;

        const colorMap: Record<string, string> = {
          green: "text-brand-700",
          red: "text-red-600",
          blue: "text-blue-600",
          gray: "text-ink-muted",
          yellow: "text-amber-600",
        };
        const colorCls = colorMap[color.replace("_background", "")] ?? "";

        if (item.href) {
          return (
            <a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
              className={`underline underline-offset-2 text-brand-700 hover:text-brand-800 ${colorCls}`}>
              {text}
            </a>
          );
        }

        return <span key={i} className={colorCls}>{text}</span>;
      })}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Agrupador de listas consecutivas
// ─────────────────────────────────────────────────────────────
interface ListGroup { _isGroup: true; type: "bulleted" | "numbered"; items: Block[] }
type Renderable = Block | ListGroup;

function isListGroup(r: Renderable): r is ListGroup {
  return "_isGroup" in r && (r as ListGroup)._isGroup === true;
}

function groupBlocks(blocks: Block[]): Renderable[] {
  const result: Renderable[] = [];
  let current: ListGroup | null = null;

  for (const block of blocks) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const btype = (block as any).type as string;
    const isBulleted = btype === "bulleted_list_item";
    const isNumbered = btype === "numbered_list_item";

    if (isBulleted || isNumbered) {
      const type: "bulleted" | "numbered" = isBulleted ? "bulleted" : "numbered";
      if (current !== null && current.type === type) {
        current.items.push(block);
      } else {
        if (current !== null) result.push(current);
        current = { _isGroup: true, type, items: [block] };
      }
    } else {
      if (current !== null) { result.push(current); current = null; }
      result.push(block);
    }
  }
  if (current !== null) result.push(current);
  return result;
}

// ─────────────────────────────────────────────────────────────
// Renderizador de un bloque individual
// ─────────────────────────────────────────────────────────────
function renderBlock(block: Block, key: number) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const b = block as any;

  switch (block.type) {
    case "paragraph":
      return b.paragraph.rich_text.length === 0
        ? <div key={key} className="h-4" />
        : <p key={key} className="text-ink-muted leading-relaxed mb-4">
            <RichText items={b.paragraph.rich_text} />
          </p>;

    case "heading_1":
      return <h2 key={key} className="text-2xl font-light text-ink mt-10 mb-4 leading-tight"
        style={{ fontFamily: "var(--font-fraunces)" }}>
        <RichText items={b.heading_1.rich_text} />
      </h2>;

    case "heading_2":
      return <h3 key={key} className="text-xl font-medium text-ink mt-8 mb-3">
        <RichText items={b.heading_2.rich_text} />
      </h3>;

    case "heading_3":
      return <h4 key={key} className="text-base font-semibold text-ink mt-6 mb-2">
        <RichText items={b.heading_3.rich_text} />
      </h4>;

    case "quote":
      return <blockquote key={key} className="border-l-3 border-brand-500 pl-4 my-6 italic text-ink-muted">
        <RichText items={b.quote.rich_text} />
      </blockquote>;

    case "callout": {
      const callRich = b.callout.rich_text as RichTextItemResponse[];
      // Si el callout contiene un link → render como CTA prominente (botón verde grande).
      // Patrón Notion: crear un callout, escribir el texto y agregarle un link.
      // Útil para destacar acciones tipo "Genera el anexo gratis aquí →".
      const linkItem = callRich.find(r => !!r.href);
      if (linkItem?.href) {
        const label = callRich.map(r => r.plain_text).join("").trim();
        return (
          <a
            key={key}
            href={linkItem.href}
            className="not-prose group flex items-center gap-3 bg-brand-600 text-white rounded-2xl px-5 py-4 my-7 no-underline shadow-sm hover:bg-brand-700 hover:shadow-md transition-all"
          >
            {b.callout.icon?.emoji && (
              <span className="text-2xl flex-shrink-0">{b.callout.icon.emoji}</span>
            )}
            <span className="font-semibold text-base sm:text-lg leading-snug flex-1">
              {label}
            </span>
            <span className="text-xl flex-shrink-0 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        );
      }
      // Callout sin link → caja informativa estándar.
      return (
        <div key={key} className="flex gap-3 bg-brand-50 border border-brand-100 rounded-xl p-4 my-6">
          {b.callout.icon?.emoji && (
            <span className="text-xl flex-shrink-0 mt-0.5">{b.callout.icon.emoji}</span>
          )}
          <p className="text-sm text-ink-muted leading-relaxed">
            <RichText items={b.callout.rich_text} />
          </p>
        </div>
      );
    }

    case "bookmark": {
      const url = b.bookmark?.url;
      if (!url) return null;
      const caption = b.bookmark.caption?.map((t: RichTextItemResponse) => t.plain_text).join("").trim();
      return (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="not-prose group flex items-center gap-3 bg-brand-600 text-white rounded-2xl px-5 py-4 my-7 no-underline shadow-sm hover:bg-brand-700 hover:shadow-md transition-all"
        >
          <span className="text-xl flex-shrink-0">🔗</span>
          <span className="font-semibold text-base sm:text-lg leading-snug flex-1">
            {caption || url}
          </span>
          <span className="text-xl flex-shrink-0 group-hover:translate-x-1 transition-transform">→</span>
        </a>
      );
    }

    case "divider":
      return <hr key={key} className="my-8 border-gray-200" />;

    case "code":
      return <pre key={key} className="bg-gray-900 text-gray-100 text-sm rounded-xl p-5 my-6 overflow-x-auto leading-relaxed">
        <code>{b.code.rich_text.map((t: RichTextItemResponse) => t.plain_text).join("")}</code>
      </pre>;

    case "image": {
      const url = b.image.type === "external" ? b.image.external.url : b.image.file?.url;
      const caption = b.image.caption?.map((t: RichTextItemResponse) => t.plain_text).join("") ?? "";
      return url ? (
        <figure key={key} className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={caption} className="w-full rounded-2xl object-cover" />
          {caption && <figcaption className="text-center text-xs text-ink-light mt-2">{caption}</figcaption>}
        </figure>
      ) : null;
    }

    case "toggle":
      return <details key={key} className="my-4 border border-gray-200 rounded-xl overflow-hidden">
        <summary className="px-4 py-3 font-medium text-sm text-ink cursor-pointer select-none hover:bg-gray-50">
          <RichText items={b.toggle.rich_text} />
        </summary>
        <div className="px-4 py-3 text-ink-muted text-sm border-t border-gray-100">
          {/* Children no cargados en esta versión simple */}
        </div>
      </details>;

    default:
      return null;
  }
}

// ─────────────────────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────────────────────
export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  const grouped = groupBlocks(blocks);

  return (
    <div className="prose-custom">
      {grouped.map((item, i) => {
        if (isListGroup(item)) {
          if (item.type === "bulleted") {
            return (
              <ul key={i} className="list-none space-y-2 my-5">
                {item.items.map((block, j) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const b = block as any;
                  return (
                    <li key={j} className="flex items-start gap-2.5 text-ink-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0 mt-2" />
                      <span className="leading-relaxed"><RichText items={b.bulleted_list_item.rich_text} /></span>
                    </li>
                  );
                })}
              </ul>
            );
          } else {
            return (
              <ol key={i} className="space-y-2 my-5">
                {item.items.map((block, j) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const b = block as any;
                  return (
                    <li key={j} className="flex items-start gap-3 text-ink-muted">
                      <span className="w-6 h-6 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {j + 1}
                      </span>
                      <span className="leading-relaxed"><RichText items={b.numbered_list_item.rich_text} /></span>
                    </li>
                  );
                })}
              </ol>
            );
          }
        }
        return renderBlock(item as Block, i);
      })}
    </div>
  );
}
