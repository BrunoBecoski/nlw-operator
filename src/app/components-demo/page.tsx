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
          Mostrar menos
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
        Mostrar mais {lines.length - MAX_PREVIEW_LINES} linhas
      </button>
    </div>
  );
}

const statuses = [
  "critical",
  "warning",
  "good",
  "critical_contamination",
  "moderate_radiation",
  "containment_achieved",
  "low_radiation",
  "radiation_free",
] as const;

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
    <div className="w-full max-w-6xl mx-auto px-10 py-16 flex flex-col gap-12">
      {/* Hero Section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-4xl font-bold text-hazmat-primary">
            &gt;
          </span>
          <h1 className="text-title">ui components demo</h1>
        </div>
        <p className="text-comment">
          {"// componentes de interface com estilo nuclear/radiation"}
        </p>
      </section>

      {/* Button Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xl font-bold text-hazmat-primary">
            &gt;
          </span>
          <h2 className="text-subtitle">button</h2>
        </div>
        <p className="text-comment">
          {"// componentes de botão com estilo nuclear/radiation"}
        </p>

        <div className="space-y-8">
          <div className="space-y-3">
            <h3 className="text-subtitle">variants</h3>
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
            <h3 className="text-subtitle">states</h3>
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button disabled>Disabled</Button>
              <Button className="w-44">Custom Width</Button>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-border-primary" />

      {/* Badge Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xl font-bold text-hazmat-primary">
            &gt;
          </span>
          <h2 className="text-subtitle">badge</h2>
        </div>
        <p className="text-comment">
          {"// componente de status com indicador visual"}
        </p>

        <div className="space-y-3">
          <h3 className="text-subtitle">statuses</h3>
          <div className="flex flex-wrap gap-4">
            {statuses.map((status) => (
              <Badge key={status} status={status}>
                {status.replace("_", " ")}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-border-primary" />

      {/* Toggle Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xl font-bold text-hazmat-primary">
            &gt;
          </span>
          <h2 className="text-subtitle">toggle</h2>
        </div>
        <p className="text-comment">
          {"// componente de alternância com label integrado"}
        </p>

        <div className="flex flex-wrap gap-8">
          <Toggle label="roast mode" pressed={false} />
          <Toggle label="roast mode" pressed={true} />
        </div>
      </section>

      <hr className="border-border-primary" />

      {/* CodeShell Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xl font-bold text-hazmat-primary">
            &gt;
          </span>
          <h2 className="text-subtitle">codeshell</h2>
        </div>
        <p className="text-comment">
          {"// componente de código unificado com 3 variantes"}
        </p>

        <div className="space-y-8">
          <div className="space-y-3">
            <h3 className="text-subtitle">editor (editável)</h3>
            <CodeShell
              value={code}
              onChange={setCode}
              language="javascript"
              editable
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-subtitle">display (somente leitura)</h3>
            <CodeShell value={sampleCode} language="javascript" />
          </div>

          <div className="space-y-3">
            <h3 className="text-subtitle">preview (somente leitura)</h3>
            <CodePreview code={sampleCode} lang="javascript" />
          </div>

          <div className="space-y-3">
            <h3 className="text-subtitle">
              preview (código longo com collapse)
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

      <hr className="border-border-primary" />

      {/* DiffLine Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xl font-bold text-hazmat-primary">
            &gt;
          </span>
          <h2 className="text-subtitle">diffline</h2>
        </div>
        <p className="text-comment">
          {"// linha de diff com indicadores de adição/remoção/contexto"}
        </p>

        <DiffLineContainer>
          <DiffLine type="removed">var total = 0;</DiffLine>
          <DiffLine type="added">const total = 0;</DiffLine>
          <DiffLine type="context">
            for (let i = 0; i &lt; items.length; i++) {"{"}
          </DiffLine>
        </DiffLineContainer>
      </section>

      <hr className="border-border-primary" />

      {/* RadiationDial Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xl font-bold text-hazmat-primary">
            &gt;
          </span>
          <h2 className="text-subtitle">radiationdial</h2>
        </div>
        <p className="text-comment">
          {"// medidor estilo geiger com zonas de perigo"}
        </p>

        <div className="space-y-8">
          <div className="space-y-3">
            <h3 className="text-subtitle">full</h3>
            <div className="flex flex-wrap items-center gap-8">
              <RadiationDial score={10} maxScore={10} />
              <RadiationDial score={8.7} maxScore={10} />
              <RadiationDial score={5.1} maxScore={10} />
              <RadiationDial score={2} maxScore={10} />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-subtitle">sm (para headers)</h3>
            <div className="flex flex-wrap items-center gap-8">
              <RadiationDialSm score={10} maxScore={10} />
              <RadiationDialSm score={8.7} maxScore={10} />
              <RadiationDialSm score={5.1} maxScore={10} />
              <RadiationDialSm score={2} maxScore={10} />
            </div>
          </div>
        </div>
      </section>

      <hr className="border-border-primary" />

      {/* TitleBar Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xl font-bold text-hazmat-primary">
            &gt;
          </span>
          <h2 className="text-subtitle">titlebar</h2>
        </div>
        <p className="text-comment">
          {"// container com barra de título estilo windows xp"}
        </p>

        <div className="space-y-8">
          <div className="space-y-3">
            <h3 className="text-subtitle">básico</h3>
            <TitleBarRoot>
              <TitleBarHeader>
                <TitleBarTitle>Roast Result</TitleBarTitle>
                <TitleBarControls />
              </TitleBarHeader>
              <CodeShell value="// Seu código aqui..." language="javascript" />
            </TitleBarRoot>
          </div>

          <div className="space-y-3">
            <h3 className="text-subtitle">com position, language e score</h3>
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

      {/* Bottom Spacer */}
      <div className="h-16" />
    </div>
  );
}
