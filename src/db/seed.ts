import { faker } from "@faker-js/faker";
import { db } from "./index";
import { analysisItems, roasts } from "./schema";

async function clearDatabase() {
  console.log("☢️  Clearing database...");
  await db.delete(analysisItems);
  await db.delete(roasts);
  console.log("✅ Database cleared");
}

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

const radiationQuotes = [
  "This code is more radioactive than Chernobyl after the cleanup",
  "Your variable names are leaking radiation everywhere",
  "Even Geiger counters are afraid of this code",
  "This is a nuclear meltdown waiting to happen",
  "The hazmat team has been dispatched to your codebase",
  "Warning: Extreme contamination levels detected",
  "This code requires Level 5 containment protocols",
  "The code review room needs to be evacuated",
  "Your indentation is worse than Three Mile Island",
  "Even the EPA would classify this as hazardous waste",
];

const analysisTitles = {
  critical: [
    "Critical radiation leak detected",
    "Unshielded security vulnerability",
    "Memory contamination imminent",
    "Deprecated reactor core usage",
    "Nuclear waste disposal violation",
  ],
  warning: [
    "Radiation levels approaching threshold",
    "Consider using shielded containers",
    "Core meltdown potential detected",
    "Unstable isotope count high",
    "Cross-contamination risk",
  ],
  good: [
    "Proper hazmat protocols followed",
    "Clean containment achieved",
    "Efficient shielding implementation",
    "Stable isotope structure",
    "Radiation levels within safe limits",
  ],
};

type Verdict =
  | "critical_contamination"
  | "moderate_radiation"
  | "containment_achieved"
  | "low_radiation"
  | "radiation_free";
type Severity = "critical" | "warning" | "good";

function getRandomCode(language: string): string {
  const snippets =
    sampleCodeSnippets[language] ?? sampleCodeSnippets.javascript;
  return faker.helpers.arrayElement(snippets);
}

function getSuggestedFix(code: string, language: string): string {
  const fixes: Record<string, () => string> = {
    javascript: () => {
      if (code.includes("for(let i=0")) {
        return `const numbers = Array.from({ length: 10 }, (_, i) => i);
numbers.forEach((num) => console.log(num));`;
      }
      if (code.includes("forEach")) {
        return `const arr = [1, 2, 3];
arr.forEach((x) => {
  console.log(x);
});`;
      }
      if (code.includes("console.log")) {
        return `const x = 1;
const y = 2;
const result = x + y;
console.log("Result:", result);`;
      }
      return `function add(a: number, b: number): number {
  return a + b;
}`;
    },
    typescript: () => {
      if (code.includes("any")) {
        return `interface Result<T> {
  success: boolean;
  data?: T;
}`;
      }
      if (code.includes("string")) {
        return `function greet(name: string): string {
  if (!name) {
    throw new Error("Name is required");
  }
  return \`Hello, \${name}!\`;
}`;
      }
      return code;
    },
    python: () => {
      if (code.includes("range(10)")) {
        return `def print_numbers():
    for i in range(10):
        print(i)

if __name__ == "__main__":
    print_numbers()`;
      }
      if (code.includes("=")) {
        return `def add(a, b):
    """Add two numbers."""
    return a + b

x = [1, 2, 3]
y = [4, 5, 6]
result = [a + b for a, b in zip(x, y)]`;
      }
      return code;
    },
    java: () => {
      if (code.includes("for(int i=0")) {
        return `for (int i = 0; i < 10; i++) {
    System.out.println(i);
}`;
      }
      if (code.includes("int x =")) {
        return `public class Main {
    public static void main(String[] args) {
        final int x = 10;
        System.out.println("Value: " + x);
    }
}`;
      }
      return code;
    },
    go: () => {
      if (code.includes("func add")) {
        return `func add(a, b int) int {
\treturn a + b
}

func main() {
\tresult := add(1, 2)
\tfmt.Println(result)
}`;
      }
      return code;
    },
    rust: () => {
      if (code.includes("fn add")) {
        return `fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn main() {
    let result = add(2, 3);
    println!("Result: {}", result);
}`;
      }
      if (code.includes("println!")) {
        return `fn main() {
    let message = "Hello, World!";
    println!("{}", message);
}`;
      }
      return code;
    },
  };

  const fixFn = fixes[language] ?? (() => code);
  return fixFn();
}

function getVerdictFromScore(score: number): Verdict {
  if (score <= 2) return "critical_contamination";
  if (score <= 4) return "moderate_radiation";
  if (score <= 6) return "containment_achieved";
  if (score <= 8) return "low_radiation";
  return "radiation_free";
}

async function seed() {
  console.log("☢️  Seeding database...");

  await clearDatabase();

  const roastData: (typeof roasts.$inferInsert)[] = [];

  for (let i = 0; i < 10; i++) {
    const language = faker.helpers.arrayElement(languages);
    const score = faker.number.float({ min: 1, max: 10, fractionDigits: 1 });
    const verdict = getVerdictFromScore(score);

    const originalCode = getRandomCode(language);
    roastData.push({
      code: originalCode,
      language,
      lineCount: faker.number.int({ min: 1, max: 50 }),
      roastMode: faker.datatype.boolean(),
      score,
      verdict,
      roastQuote: faker.helpers.arrayElement(radiationQuotes),
      suggestedFix: getSuggestedFix(originalCode, language),
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
