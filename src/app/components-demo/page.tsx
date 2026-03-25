"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button, button } from "@/components/ui/button";
import { CodeShell } from "@/components/ui/code-shell";
import { DiffLine, DiffLineContainer } from "@/components/ui/diff-line";
import { RadiationDial, RadiationDialSm } from "@/components/ui/radiation-dial";
import {
  TitleBarActions,
  TitleBarClose,
  TitleBarContent,
  TitleBarHeader,
  TitleBarLanguage,
  TitleBarMaximize,
  TitleBarMinimize,
  TitleBarPosition,
  TitleBarRoot,
  TitleBarScore,
  TitleBarSubtitle,
  TitleBarTitle,
  TitleBarWindowControls,
} from "@/components/ui/title-bar";
import { Toggle } from "@/components/ui/toggle";

const MAX_PREVIEW_LINES = 3;

function CodePreview({
  code,
  lang,
  position,
  score,
}: {
  code: string;
  lang: string;
  position?: number;
  score?: number;
}) {
  const lines = code.split("\n");
  const isLongCode = lines.length > MAX_PREVIEW_LINES;
  const [isOpen, setIsOpen] = useState(false);

  const previewCode = lines.slice(0, MAX_PREVIEW_LINES).join("\n");

  if (!isLongCode) {
    return (
      <CodeShell
        value={code}
        language={lang}
        position={position}
        score={score}
        showScore
      />
    );
  }

  if (isOpen) {
    return (
      <div>
        <CodeShell
          value={code}
          language={lang}
          position={position}
          score={score}
          showScore
        />
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
      <CodeShell
        value={previewCode}
        language={lang}
        position={position}
        score={score}
        showScore
      />
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
              Display (somente leitura com score)
            </h3>
            <CodeShell
              value={sampleCode}
              language="javascript"
              score={8.5}
              showScore
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-radiation-green">
              Preview (somente leitura sem score)
            </h3>
            <CodePreview
              code={sampleCode}
              lang="javascript"
              position={1}
              score={8.7}
            />
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
              position={2}
              score={6.3}
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
                <TitleBarWindowControls>
                  <TitleBarMinimize />
                  <TitleBarMaximize />
                  <TitleBarClose />
                </TitleBarWindowControls>
              </TitleBarHeader>
              <TitleBarContent className="p-4">
                <p className="font-mono text-sm text-text-primary">
                  Seu conteúdo aqui...
                </p>
              </TitleBarContent>
            </TitleBarRoot>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-radiation-green">
              Com Position, Language e Score
            </h3>
            <TitleBarRoot>
              <TitleBarHeader className="justify-between">
                <div className="flex items-center gap-2">
                  <TitleBarPosition>#1</TitleBarPosition>
                  <TitleBarScore score={9.5} />
                </div>
                <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
                  <TitleBarLanguage>JavaScript</TitleBarLanguage>
                </div>
                <TitleBarWindowControls>
                  <TitleBarMinimize />
                  <TitleBarMaximize />
                  <TitleBarClose />
                </TitleBarWindowControls>
              </TitleBarHeader>
              <TitleBarContent className="p-4">
                <p className="font-mono text-sm text-text-primary">
                  Código bem estruturado com boas práticas.
                </p>
              </TitleBarContent>
            </TitleBarRoot>

            <TitleBarRoot>
              <TitleBarHeader className="justify-between">
                <div className="flex items-center gap-2">
                  <TitleBarPosition>#2</TitleBarPosition>
                  <TitleBarScore score={7.2} />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2">
                  <TitleBarLanguage>Python</TitleBarLanguage>
                </div>
                <TitleBarWindowControls>
                  <TitleBarMinimize />
                  <TitleBarMaximize />
                  <TitleBarClose />
                </TitleBarWindowControls>
              </TitleBarHeader>
              <TitleBarContent className="p-4">
                <p className="font-mono text-sm text-text-primary">
                  Código com alguns problemas de estilo.
                </p>
              </TitleBarContent>
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
                <TitleBarWindowControls>
                  <TitleBarMinimize />
                  <TitleBarMaximize />
                  <TitleBarClose />
                </TitleBarWindowControls>
              </TitleBarHeader>
              <TitleBarContent className="p-4">
                <p className="font-mono text-sm text-text-primary">
                  Código com múltiplos problemas críticos.
                </p>
              </TitleBarContent>
            </TitleBarRoot>
          </div>
        </div>
      </section>
    </div>
  );
}
