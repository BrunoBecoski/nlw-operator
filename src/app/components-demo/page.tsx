"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button, button } from "@/components/ui/button";
import { CodeShell } from "@/components/ui/code-shell";
import { DiffLine, DiffLineContainer } from "@/components/ui/diff-line";
import { RadiationDial, RadiationDialSm } from "@/components/ui/radiation-dial";
import {
  TitleBarControls,
  TitleBarHeader,
  TitleBarLanguage,
  TitleBarPosition,
  TitleBarRoot,
  TitleBarScore,
  TitleBarTitle,
} from "@/components/ui/title-bar";
import { Toggle } from "@/components/ui/toggle";

const MAX_PREVIEW_LINES = 3;

function CodePreview({ code, lang }: { code: string; lang: string }) {
  const lines = code.split("\n");
  const isLongCode = lines.length > MAX_PREVIEW_LINES;
  const [isOpen, setIsOpen] = useState(false);

  const previewCode = lines.slice(0, MAX_PREVIEW_LINES).join("\n");

  if (!isLongCode) {
    return <CodeShell value={code} language={lang} />;
  }

  if (isOpen) {
    return (
      <div>
        <CodeShell value={code} language={lang} />
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="w-full h-8 flex items-center justify-center text-xs font-mono text-text-tertiary hover:text-text-secondary hover:cursor-pointer border-t border-border-primary transition-colors"
        >
          Show less
        </button>
      </div>
    );
  }

  return (
    <div>
      <CodeShell value={previewCode} language={lang} />
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full h-8 flex items-center justify-center text-xs font-mono text-text-tertiary hover:text-text-secondary hover:cursor-pointer border-t border-border-primary transition-colors"
      >
        Show {lines.length - MAX_PREVIEW_LINES} more lines
      </button>
    </div>
  );
}

const statuses = ["critical", "warning", "good", "needs_serious_help"] as const;

const sampleCode = `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}`;

export default function ComponentsDemoPage() {
  const [code, setCode] = useState(sampleCode);

  return (
    <div className="container mx-auto py-12 space-y-12">
      <h1 className="text-3xl font-bold">UI Components Demo</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-hazmat-primary">Button</h2>
        <p className="text-text-secondary">
          Componentes de botão com estilo Nuclear/Radiation.
        </p>

        <div className="space-y-8">
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-radiation-green">
              Variants
            </h3>
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
            <h3 className="text-lg font-medium text-radiation-green">States</h3>
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
        <p className="text-text-secondary">
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
        <p className="text-text-secondary">
          Componente de alternância com label integrado.
        </p>

        <div className="flex flex-wrap gap-8">
          <Toggle label="roast mode" pressed={false} />
          <Toggle label="roast mode" pressed={true} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-hazmat-primary">
          CodeShell
        </h2>
        <p className="text-text-secondary">
          Componente de código unificado com 3 variantes.
        </p>

        <div className="space-y-8">
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-radiation-green">
              Editor (editável)
            </h3>
            <CodeShell
              value={code}
              onChange={setCode}
              language="javascript"
              editable
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-radiation-green">
              Display (somente leitura)
            </h3>
            <CodeShell value={sampleCode} language="javascript" />
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-radiation-green">
              Preview (somente leitura)
            </h3>
            <CodePreview code={sampleCode} lang="javascript" />
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-radiation-green">
              Preview (código longo com collapse)
            </h3>
            <CodePreview
              code={`function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}
function processOrder(order) {
  return order.items.map(item => item.price).reduce((a, b) => a + b, 0);
}
function validateInput(data) {
  if (!data) return false;
  if (typeof data !== 'object') return false;
  return true;
}
function doEverything(data) {
  var result = calculateTotal(data);
  var processed = processOrder(data);
  var valid = validateInput(data);
  return { result, processed, valid };
}`}
              lang="javascript"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">DiffLine</h2>
        <p className="text-text-secondary">
          Linha de diff com indicadores de adição/remoção/contexto.
        </p>

        <DiffLineContainer>
          <DiffLine type="removed">var total = 0;</DiffLine>
          <DiffLine type="added">const total = 0;</DiffLine>
          <DiffLine type="context">
            for (let i = 0; i &lt; items.length; i++) {"{"}
          </DiffLine>
        </DiffLineContainer>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-hazmat-primary">
          RadiationDial
        </h2>
        <p className="text-text-secondary">
          Medidor estilo Geiger com zonas de perigo.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-radiation-green">Full</h3>
          <div className="flex flex-wrap items-center gap-8">
            <RadiationDial score={10} maxScore={10} />
            <RadiationDial score={8.7} maxScore={10} />
            <RadiationDial score={5.1} maxScore={10} />
            <RadiationDial score={2} maxScore={10} />
          </div>

          <h3 className="text-lg font-medium text-radiation-green">
            SM (para headers)
          </h3>
          <div className="flex flex-wrap items-center gap-8">
            <RadiationDialSm score={10} maxScore={10} />
            <RadiationDialSm score={8.7} maxScore={10} />
            <RadiationDialSm score={5.1} maxScore={10} />
            <RadiationDialSm score={2} maxScore={10} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-hazmat-primary">TitleBar</h2>
        <p className="text-text-secondary">
          Container com barra de título estilo Windows XP.
        </p>

        <div className="space-y-8">
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-radiation-green">Básico</h3>
            <TitleBarRoot>
              <TitleBarHeader>
                <TitleBarTitle>Roast Result</TitleBarTitle>
                <TitleBarControls />
              </TitleBarHeader>
              <CodeShell value="// Seu código aqui..." language="javascript" />
            </TitleBarRoot>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-radiation-green">
              Com Position, Language e Score
            </h3>
            <TitleBarRoot>
              <TitleBarHeader className="justify-between relative">
                <div className="flex items-center gap-2">
                  <TitleBarPosition>#1</TitleBarPosition>
                  <TitleBarScore score={9.5} />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2">
                  <TitleBarLanguage>JavaScript</TitleBarLanguage>
                </div>
                <TitleBarControls />
              </TitleBarHeader>
              <CodeShell
                value="// Código bem estruturado com boas práticas"
                language="javascript"
              />
            </TitleBarRoot>

            <TitleBarRoot>
              <TitleBarHeader className="justify-between relative">
                <div className="flex items-center gap-2">
                  <TitleBarPosition>#2</TitleBarPosition>
                  <TitleBarScore score={7.2} />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2">
                  <TitleBarLanguage>Python</TitleBarLanguage>
                </div>
                <TitleBarControls />
              </TitleBarHeader>
              <CodeShell
                value="# Código com alguns problemas de estilo"
                language="python"
              />
            </TitleBarRoot>

            <TitleBarRoot>
              <TitleBarHeader className="justify-between relative">
                <div className="flex items-center gap-2">
                  <TitleBarPosition>#3</TitleBarPosition>
                  <TitleBarScore score={4.8} />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2">
                  <TitleBarLanguage>Rust</TitleBarLanguage>
                </div>
                <TitleBarControls />
              </TitleBarHeader>
              <CodeShell
                value="// Código com múltiplos problemas críticos"
                language="rust"
              />
            </TitleBarRoot>
          </div>
        </div>
      </section>
    </div>
  );
}
