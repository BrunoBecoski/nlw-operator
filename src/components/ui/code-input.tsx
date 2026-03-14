import { tv } from "tailwind-variants";

const codeInputRoot = tv({
  base: "flex flex-col rounded-md border border-border-primary overflow-hidden",
});

export interface CodeInputRootProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CodeInputRoot({
  className,
  children,
  ...props
}: CodeInputRootProps) {
  return (
    <div className={codeInputRoot({ className })} {...props}>
      {children}
    </div>
  );
}

const codeInputHeader = tv({
  base: "flex items-center gap-3 h-10 px-4 border-b border-border-primary bg-bg-surface",
});

export interface CodeInputHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CodeInputHeader({
  className,
  children,
  ...props
}: CodeInputHeaderProps) {
  return (
    <div className={codeInputHeader({ className })} {...props}>
      {children}
    </div>
  );
}

const codeInputDots = tv({
  base: "flex items-center gap-2",
});

export interface CodeInputDotsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CodeInputDots({ className, ...props }: CodeInputDotsProps) {
  return (
    <div className={codeInputDots({ className })} {...props}>
      <span className="h-2.5 w-2.5 rounded-full bg-accent-red" />
      <span className="h-2.5 w-2.5 rounded-full bg-accent-amber" />
      <span className="h-2.5 w-2.5 rounded-full bg-accent-green" />
    </div>
  );
}

const codeInputFilename = tv({
  base: "text-text-tertiary font-mono text-xs",
});

export interface CodeInputFilenameProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  filename?: string;
}

export function CodeInputFilename({
  className,
  filename = "code.js",
  ...props
}: CodeInputFilenameProps) {
  return (
    <span className={codeInputFilename({ className })} {...props}>
      {filename}
    </span>
  );
}

const codeInputArea = tv({
  base: "w-full h-[360px] p-4 bg-bg-input font-mono text-sm text-text-primary placeholder:text-text-tertiary resize-none focus:outline-none",
});

export interface CodeInputAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function CodeInputArea({ className, ...props }: CodeInputAreaProps) {
  return <textarea className={codeInputArea({ className })} {...props} />;
}

export interface CodeInputProps {
  value?: string;
  onChange?: (value: string) => void;
  filename?: string;
  placeholder?: string;
}

export function CodeInput({
  value,
  onChange,
  filename = "code.js",
  placeholder = "// paste your garbage code here...",
}: CodeInputProps) {
  return (
    <CodeInputRoot>
      <CodeInputHeader>
        <CodeInputDots />
        <div className="flex-1" />
        <CodeInputFilename filename={filename} />
      </CodeInputHeader>
      <CodeInputArea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
      />
    </CodeInputRoot>
  );
}
