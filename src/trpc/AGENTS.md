# Padrões tRPC

## Visão Geral

Este documento estabelece os padrões para implementação de tRPC v11 no projeto DevRoast.

## Estrutura de Arquivos

```
src/
  trpc/
    init.ts           # initTRPC, context factory, base procedure
    routers/
      _app.ts         # appRouter (merge de todos os sub-routers)
      roast.ts        # procedures de roast
    query-client.ts   # makeQueryClient factory (shared server/client)
    client.tsx        # TRPCProvider, useTRPC, trpc (client-only)
    server.tsx        # createTRPCOptionsProxy, prefetch helper, caller (server-only)
  app/
    api/
      trpc/
        [trpc]/
          route.ts    # fetchRequestHandler (GET + POST)
```

## Configuração do tRPC

### 1. Inicialização (init.ts)

```typescript
import { initTRPC, type inferAsyncReturnType } from "@trpc/server";
import { cache } from "react";
import { db } from "@/db";

export const createTRPCContext = cache(async () => {
  return { db };
});

export type TRPCContext = inferAsyncReturnType<typeof createTRPCContext>;

const t = initTRPC.context<TRPCContext>().create();

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
```

### 2. Routers

Cada domínio deve ter seu próprio router:

```typescript
// src/trpc/routers/roast.ts
import { count, avg } from "drizzle-orm";
import { roasts } from "@/db/schema";
import { createTRPCRouter, baseProcedure } from "../init";

export const roastRouter = createTRPCRouter({
  getStats: baseProcedure.query(async ({ ctx }) => {
    const [stats] = await ctx.db
      .select({
        totalRoasts: count(),
        avgScore: avg(roasts.score),
      })
      .from(roasts);

    return {
      totalRoasts: stats?.totalRoasts ?? 0,
      avgScore: stats?.avgScore ?? 0,
    };
  }),
});
```

### 3. App Router (_app.ts)

```typescript
import { createTRPCRouter } from "../init";
import { roastRouter } from "./roast";

export const appRouter = createTRPCRouter({
  roast: roastRouter,
});

export type AppRouter = typeof appRouter;
```

## Padrões de Consumo

### 1. Server Components (sem animação)

Para dados estáticos ou que não precisam de animação, use caller direto:

```typescript
// src/components/stats-bar.tsx (Server Component)
import { caller } from "@/trpc/server";
import { StatsBarClient } from "@/components/stats-bar-client";

export default async function StatsBar() {
  const callerInstance = await caller();
  const stats = await callerInstance.roast.getStats();

  return (
    <StatsBarClient
      codesRoasted={stats.totalRoasts}
      avgScore={stats.avgScore}
    />
  );
}
```

### 2. Client Components (com animação via NumberFlow)

Para dados que precisam de animação, use useQuery no client com valor inicial:

```typescript
// src/components/stats-bar-with-data.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { StatsBarClient } from "@/components/stats-bar-client";
import { useTRPC } from "@/trpc/client";

export function StatsBarWithData() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.roast.getStats.queryOptions());

  const totalRoasts = data?.totalRoasts ?? 0;
  const avgScore = typeof data?.avgScore === "number" ? data.avgScore : 0;

  return (
    <StatsBarClient
      codesRoasted={0}              // valor inicial
      avgScore={0}                   // valor inicial
      loadedCodesRoasted={totalRoasts}  // valor carregado
      loadedAvgScore={avgScore}        // valor carregado
    />
  );
}
```

O NumberFlow detecta a mudança de valor e anima automaticamente.

### 3. Client Components com useTRPC

Sempre use `useTRPC()` hook para acessar o client:

```typescript
import { useTRPC } from "@/trpc/client";

export function MyComponent() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.myRouter.myProcedure.queryOptions());
  // ...
}
```

### 4. Providers (layout.tsx)

O `TRPCReactProvider` deve envolver a aplicação:

```typescript
import { TRPCReactProvider } from "@/trpc/client";

export default function RootLayout({ children }) {
  return (
    <TRPCReactProvider>
      <Navbar />
      <main>{children}</main>
    </TRPCReactProvider>
  );
}
```

## API Route

```typescript
// src/app/api/trpc/[trpc]/route.ts
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createTRPCContext } from "@/trpc/init";
import { appRouter } from "@/trpc/routers/_app";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });

export { handler as GET, handler as POST };
```

## Variáveis de Ambiente

Adicione ao `.env.local`:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Quando Usar Cada Padrão

| Cenário | Abordagem |
|---------|-----------|
| Dados estáticos (SEO) | Server Component + caller |
| Dados com animação (NumberFlow) | Client Component + useQuery |
| Prefetch em RSC | createTRPCOptionsProxy + HydrationBoundary |
| Mutations | useMutation com useTRPC |

## Queries em Paralelo

Para executar múltiplas queries em paralelo no client, use `useQueries`:

```typescript
"use client";

import { useQueries } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function LeaderboardFetcher() {
  const trpc = useTRPC();

  const results = useQueries({
    queries: [
      trpc.leaderboard.getShameLeaderboard.queryOptions({ limit: 3 }),
      trpc.leaderboard.getTotalCount.queryOptions(),
    ],
  });

  const [leaderboardResult, totalCountResult] = results;
  const isLoading = leaderboardResult.isLoading || totalCountResult.isLoading;

  if (isLoading) {
    return <Skeleton />;
  }

  // Use leaderboardResult.data e totalCountResult.data
  // ...
}
```

Isso executa as queries em paralelo, reduzindo o tempo total de carregamento.
