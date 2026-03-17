import { type inferAsyncReturnType, initTRPC } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";
import { db } from "@/db";

export const createTRPCContext = cache(async () => {
  return { db };
});

export type TRPCContext = inferAsyncReturnType<typeof createTRPCContext>;

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
