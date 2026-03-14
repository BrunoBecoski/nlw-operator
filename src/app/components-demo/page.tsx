import { Badge } from "@/components/ui/badge";
import { Button, button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { DiffLine } from "@/components/ui/diff-line";
import { ScoreRing } from "@/components/ui/score-ring";
import { Toggle } from "@/components/ui/toggle";

const variants = Object.keys(button.variants.variant) as Array<
  keyof typeof button.variants.variant
>;

const sizes = Object.keys(button.variants.size) as Array<
  keyof typeof button.variants.size
>;

const statuses = ["critical", "warning", "good", "needs_serious_help"] as const;

const sampleCode = `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}`;

export default function ComponentsDemoPage() {
  return (
    <div className="container mx-auto py-12 space-y-12">
      <h1 className="text-3xl font-bold">UI Components Demo</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Button</h2>
        <p className="text-gray-600">
          Componente de botão com múltiplas variantes e tamanhos.
        </p>

        <div className="space-y-8">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Variants</h3>
            <div className="flex flex-wrap gap-4">
              {variants.map((variant) => (
                <Button key={variant} variant={variant}>
                  {variant}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              {sizes.map((size) => (
                <Button key={size} size={size}>
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium">States</h3>
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button disabled>Disabled</Button>
              <Button className="w-40">Custom Width</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Badge</h2>
        <p className="text-gray-600">
          Componente de status com indicador visual.
        </p>

        <div className="space-y-3">
          <h3 className="text-lg font-medium">Statuses</h3>
          <div className="flex flex-wrap gap-4">
            {statuses.map((status) => (
              <Badge key={status} status={status}>
                {status.replace("_", " ")}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Toggle</h2>
        <p className="text-gray-600">
          Componente de alternância com label integrado.
        </p>

        <div className="flex flex-wrap gap-8">
          <Toggle label="roast mode" pressed={false} />
          <Toggle label="roast mode" pressed={true} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">CodeBlock</h2>
        <p className="text-gray-600">
          Bloco de código com syntax highlighting (shiki, tema vesper).
        </p>

        <CodeBlock code={sampleCode} lang="javascript" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">DiffLine</h2>
        <p className="text-gray-600">
          Linha de diff com indicadores de adição/remoção/contexto.
        </p>

        <div className="border rounded-md max-w-[560px]">
          <DiffLine type="removed">var total = 0;</DiffLine>
          <DiffLine type="added">const total = 0;</DiffLine>
          <DiffLine type="context">
            for (let i = 0; i &lt; items.length; i++) {"{"}
          </DiffLine>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">ScoreRing</h2>
        <p className="text-gray-600">
          Ring circular que exibe pontuação com cores dinâmicas.
        </p>

        <div className="flex flex-wrap items-center gap-8">
          <ScoreRing score={3} />
          <ScoreRing score={6} />
          <ScoreRing score={10} maxScore={10} />
          <ScoreRing score={8} maxScore={100} showDenominator={false} />
        </div>
      </section>
    </div>
  );
}
