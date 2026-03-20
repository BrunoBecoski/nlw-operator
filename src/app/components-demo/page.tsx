import { Badge } from "@/components/ui/badge";
import { Button, button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { DiffLine } from "@/components/ui/diff-line";
import { RadiationDial } from "@/components/ui/radiation-dial";
import { Toggle } from "@/components/ui/toggle";

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
        <h2 className="text-2xl font-semibold text-accent-green">Button</h2>
        <p className="text-text-secondary">
          Componentes de botão com estilo Nuclear/Radiation.
        </p>

        <div className="space-y-8">
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-hazmat-yellow">Variants</h3>
            <div className="flex flex-wrap gap-4">
              {(
                Object.keys(button.variants.variant) as Array<
                  keyof typeof button.variants.variant
                >
              ).map((variant) => (
                <Button key={variant} variant={variant}>
                  {variant}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-hazmat-yellow">States</h3>
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button disabled>Disabled</Button>
              <Button className="w-44">Custom Width</Button>
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
        <h2 className="text-2xl font-semibold">RadiationDial</h2>
        <p className="text-gray-600">
          Medidor estilo Geiger com zonas de perigo. Quanto menor a nota, mais
          radioativo o código.
        </p>

        <div className="flex flex-wrap items-center gap-8">
          <RadiationDial score={10} maxScore={10} />
          <RadiationDial score={8.7} maxScore={10} />
          <RadiationDial score={5.1} maxScore={10} />
          <RadiationDial score={2} maxScore={10} />
        </div>
      </section>
    </div>
  );
}
