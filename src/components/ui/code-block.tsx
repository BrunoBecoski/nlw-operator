import { codeToHtml } from "shiki";
import { tv } from "tailwind-variants";

export interface CodeBlockContentProps {
  code: string;
  lang?: string;
}

const codeBlockContent = tv({
  base: "bg-bg-input p-3 overflow-x-auto",
});

export async function CodeBlockContent({
  code,
  lang = "javascript",
}: CodeBlockContentProps) {
  const html = await codeToHtml(code, {
    lang,
    theme: "vesper",
  });

  return (
    <div
      className={codeBlockContent()}
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        fontFamily: "var(--font-mono), monospace",
        fontSize: "13px",
      }}
    />
  );
}

const codeBlockDots = tv({
  base: "h-2.5 w-2.5 rounded-full",
});

export interface CodeBlockDotsProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export function CodeBlockDots({ className, ...props }: CodeBlockDotsProps) {
  return <span className={codeBlockDots({ className })} {...props} />;
}

const codeBlockFilename = tv({
  base: "text-text-tertiary font-mono text-xs",
});

export interface CodeBlockFilenameProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  lang?: string;
}

export function CodeBlockFilename({
  className,
  lang = "javascript",
  ...props
}: CodeBlockFilenameProps) {
  return (
    <span className={codeBlockFilename({ className })} {...props}>
      code.{lang}
    </span>
  );
}

const codeBlockHeader = tv({
  base: "flex items-center gap-3 h-10 px-4 border-b border-border-primary bg-bg-surface",
});

export interface CodeBlockHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CodeBlockHeader({
  className,
  children,
  ...props
}: CodeBlockHeaderProps) {
  return (
    <div className={codeBlockHeader({ className })} {...props}>
      {children}
    </div>
  );
}

const codeBlockRoot = tv({
  base: "rounded-md border border-border-primary overflow-hidden w-full max-w-[560px]",
});

export interface CodeBlockRootProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CodeBlockRoot({
  className,
  children,
  ...props
}: CodeBlockRootProps) {
  return (
    <div className={codeBlockRoot({ className })} {...props}>
      {children}
    </div>
  );
}

export { codeBlockRoot };

export interface CodeBlockProps {
  code: string;
  lang?: string;
}

export function CodeBlock({ code, lang = "javascript" }: CodeBlockProps) {
  return (
    <CodeBlockRoot>
      <CodeBlockContent code={code} lang={lang} />
    </CodeBlockRoot>
  );
}
