export const LANGUAGES = {
  javascript: {
    name: "JavaScript",
    shikiId: "javascript",
    hljsId: "javascript",
    aliases: ["js", "jsx"],
    src: () => import("shiki/langs/javascript.mjs"),
  },
  typescript: {
    name: "TypeScript",
    shikiId: "typescript",
    hljsId: "typescript",
    aliases: ["ts", "tsx"],
    src: () => import("shiki/langs/typescript.mjs"),
  },
  python: {
    name: "Python",
    shikiId: "python",
    hljsId: "python",
    aliases: ["py"],
    src: () => import("shiki/langs/python.mjs"),
  },
  go: {
    name: "Go",
    shikiId: "go",
    hljsId: "go",
    aliases: ["golang"],
    src: () => import("shiki/langs/go.mjs"),
  },
  rust: {
    name: "Rust",
    shikiId: "rust",
    hljsId: "rust",
    aliases: ["rs"],
    src: () => import("shiki/langs/rust.mjs"),
  },
  java: {
    name: "Java",
    shikiId: "java",
    hljsId: "java",
    aliases: [],
    src: () => import("shiki/langs/java.mjs"),
  },
  ruby: {
    name: "Ruby",
    shikiId: "ruby",
    hljsId: "ruby",
    aliases: ["rb"],
    src: () => import("shiki/langs/ruby.mjs"),
  },
  php: {
    name: "PHP",
    shikiId: "php",
    hljsId: "php",
    aliases: [],
    src: () => import("shiki/langs/php.mjs"),
  },
  sql: {
    name: "SQL",
    shikiId: "sql",
    hljsId: "sql",
    aliases: [],
    src: () => import("shiki/langs/sql.mjs"),
  },
  shell: {
    name: "Shell",
    shikiId: "bash",
    hljsId: "bash",
    aliases: ["sh", "bash", "zsh"],
    src: () => import("shiki/langs/bash.mjs"),
  },
  html: {
    name: "HTML",
    shikiId: "html",
    hljsId: "xml",
    aliases: ["htm"],
    src: () => import("shiki/langs/html.mjs"),
  },
  css: {
    name: "CSS",
    shikiId: "css",
    hljsId: "css",
    aliases: [],
    src: () => import("shiki/langs/css.mjs"),
  },
  json: {
    name: "JSON",
    shikiId: "json",
    hljsId: "json",
    aliases: [],
    src: () => import("shiki/langs/json.mjs"),
  },
  yaml: {
    name: "YAML",
    shikiId: "yaml",
    hljsId: "yaml",
    aliases: ["yml"],
    src: () => import("shiki/langs/yaml.mjs"),
  },
  markdown: {
    name: "Markdown",
    shikiId: "markdown",
    hljsId: "markdown",
    aliases: ["md"],
    src: () => import("shiki/langs/markdown.mjs"),
  },
  c: {
    name: "C",
    shikiId: "c",
    hljsId: "c",
    aliases: [],
    src: () => import("shiki/langs/c.mjs"),
  },
  cpp: {
    name: "C++",
    shikiId: "cpp",
    hljsId: "cpp",
    aliases: ["c++"],
    src: () => import("shiki/langs/cpp.mjs"),
  },
  csharp: {
    name: "C#",
    shikiId: "csharp",
    hljsId: "csharp",
    aliases: ["cs", "c#"],
    src: () => import("shiki/langs/csharp.mjs"),
  },
  swift: {
    name: "Swift",
    shikiId: "swift",
    hljsId: "swift",
    aliases: [],
    src: () => import("shiki/langs/swift.mjs"),
  },
  kotlin: {
    name: "Kotlin",
    shikiId: "kotlin",
    hljsId: "kotlin",
    aliases: ["kt"],
    src: () => import("shiki/langs/kotlin.mjs"),
  },
  dart: {
    name: "Dart",
    shikiId: "dart",
    hljsId: "dart",
    aliases: [],
    src: () => import("shiki/langs/dart.mjs"),
  },
} as const;

export type LanguageKey = keyof typeof LANGUAGES;

export const LANGUAGE_LIST = Object.values(LANGUAGES);

export function getLanguageByHljsId(hljsId: string): LanguageKey | undefined {
  return (Object.keys(LANGUAGES) as LanguageKey[]).find(
    (key) => LANGUAGES[key].hljsId === hljsId,
  );
}

export function getLanguageByShikiId(shikiId: string): LanguageKey | undefined {
  return (Object.keys(LANGUAGES) as LanguageKey[]).find(
    (key) => LANGUAGES[key].shikiId === shikiId,
  );
}
