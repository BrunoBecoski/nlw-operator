import { faker } from "@faker-js/faker";
import { db } from "./index";
import { analysisItems, roasts } from "./schema";

const languages = [
  "javascript",
  "typescript",
  "python",
  "java",
  "go",
  "rust",
  "c",
  "cpp",
  "ruby",
  "php",
];

const sampleCodeSnippets: Record<string, string[]> = {
  javascript: [
    `function add(a, b) { return a + b; }`,
    `const x = 1; const y = 2; console.log(x + y);`,
    `for(let i=0; i<10; i++) { console.log(i); }`,
    `const arr = [1,2,3]; arr.forEach(x => console.log(x));`,
  ],
  typescript: [
    `function greet(name: string): string { return \`Hello, \${name}\`; }`,
    `interface User { id: number; name: string; }`,
    `const x: number = 10;`,
    `type Result = { success: boolean; data?: any };`,
  ],
  python: [
    `def add(a, b): return a + b`,
    `for i in range(10): print(i)`,
    `x = [1, 2, 3]\ny = [4, 5, 6]`,
    `class User: def __init__(self, name): self.name = name`,
  ],
  java: [
    `public class Main { public static void main(String[] args) {} }`,
    `int x = 10;`,
    `for(int i=0; i<10; i++) { System.out.println(i); }`,
  ],
  go: [
    `func add(a, b int) int { return a + b }`,
    `package main`,
    `var x int = 10`,
  ],
  rust: [
    `fn main() { println!("Hello"); }`,
    `let x = 10;`,
    `fn add(a: i32, b: i32) -> i32 { a + b }`,
  ],
};

const roastQuotes = [
  "I've seen better code in a fortune cookie",
  "This code is so bad it could crash a quantum computer",
  "My grandmother codes better than this",
  "This is why we can't have nice things",
  "Did you write this at 3am on a Tuesday?",
  "The linter is crying right now",
  "This belongs in a museum of bad decisions",
  "Even my pet goldfish is disappointed",
  "This is technically legal code, so there's that",
  "Stack Overflow called, they want their copy-paste back",
];

const analysisTitles = {
  critical: [
    "No error handling",
    "SQL injection vulnerability",
    "Memory leak detected",
    "Deprecated function usage",
    "Security risk found",
  ],
  warning: [
    "Missing type annotations",
    "Consider using const instead of var",
    "Function too long",
    "Magic numbers detected",
    "Duplicated code block",
  ],
  good: [
    "Good naming convention",
    "Proper error handling",
    "Clean separation of concerns",
    "Efficient algorithm choice",
    "Well-documented function",
  ],
};

type Verdict =
  | "needs_serious_help"
  | "rough_around_edges"
  | "decent_code"
  | "solid_work"
  | "exceptional";
type Severity = "critical" | "warning" | "good";

function getRandomCode(language: string): string {
  const snippets =
    sampleCodeSnippets[language] ?? sampleCodeSnippets.javascript;
  return faker.helpers.arrayElement(snippets);
}

function getVerdictFromScore(score: number): Verdict {
  if (score <= 2) return "needs_serious_help";
  if (score <= 4) return "rough_around_edges";
  if (score <= 6) return "decent_code";
  if (score <= 8) return "solid_work";
  return "exceptional";
}

async function seed() {
  console.log("🌱 Seeding database...");

  const roastData: (typeof roasts.$inferInsert)[] = [];

  for (let i = 0; i < 100; i++) {
    const language = faker.helpers.arrayElement(languages);
    const score =
      Math.round(
        faker.number.float({ min: 0, max: 10, fractionDigits: 1 }) * 10,
      ) / 10;
    const verdict = getVerdictFromScore(score);

    roastData.push({
      code: getRandomCode(language),
      language,
      lineCount: faker.number.int({ min: 1, max: 50 }),
      roastMode: faker.datatype.boolean(),
      score,
      verdict,
      roastQuote: faker.helpers.arrayElement(roastQuotes),
      suggestedFix: `// Suggested fix for ${language} code`,
    });
  }

  await db.insert(roasts).values(roastData);

  const insertedRoasts = await db.select().from(roasts);

  const analysisData: (typeof analysisItems.$inferInsert)[] = [];

  for (const roast of insertedRoasts) {
    const itemCount = faker.number.int({ min: 2, max: 5 });

    for (let i = 0; i < itemCount; i++) {
      const severity = faker.helpers.arrayElement([
        "critical",
        "warning",
        "good",
      ] as const) as Severity;
      const titles = analysisTitles[severity] as string[];
      analysisData.push({
        roastId: roast.id,
        severity,
        title: faker.helpers.arrayElement(titles),
        description: faker.lorem.sentence(),
        order: i,
      });
    }
  }

  await db.insert(analysisItems).values(analysisData);

  console.log(
    `✅ Seeded ${insertedRoasts.length} roasts and ${analysisData.length} analysis items`,
  );
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
