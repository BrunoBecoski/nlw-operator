import { codeToHtml } from "shiki";

export interface CodeBlockProps {
  code: string;
  lang?: string;
}

export async function CodeBlock({ code, lang = "javascript" }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang,
    theme: "vesper",
  });

  return (
    <div className="rounded-md border border-border-primary overflow-hidden w-full max-w-[560px]">
      <div className="flex items-center gap-3 h-10 px-4 border-b border-border-primary bg-bg-surface">
        <span className="h-2.5 w-2.5 rounded-full bg-accent-red" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-amber" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-green" />
        <div className="flex-1" />
        <span className="text-text-tertiary font-mono text-xs">
          code.{lang}
        </span>
      </div>
      {/* eslint-disable-next-line react/no-dangerously-set-inner-html */}
      <div
        className="bg-bg-input p-3 overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: html }}
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "13px",
        }}
      />
    </div>
  );
}
