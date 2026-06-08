import { expectTypeOf, test } from "vite-plus/test";
import { defaultError } from "../src/index.ts";

interface Context<T> {
  value: T;
}

interface TestContext {
  count: number;
  increment: () => void;
}

declare function createContext<T>(defaultValue: T): Context<T>;
declare function useContext<T>(context: Context<T>): T;

test("returns the requested value type", () => {
  expectTypeOf(defaultError<TestContext>("TestContext")).toEqualTypeOf<TestContext>();
});

test("lets createContext infer the value type from defaultError", () => {
  const context = createContext(defaultError<TestContext>("TestContext"));
  const value = useContext(context);

  expectTypeOf(context).toEqualTypeOf<Context<TestContext>>();
  expectTypeOf(value).toEqualTypeOf<TestContext>();
  expectTypeOf(value.count).toEqualTypeOf<number>();
  expectTypeOf(value.increment).toEqualTypeOf<() => void>();
});

test("preserves createContext inference when options are provided", () => {
  const context = createContext(
    defaultError<TestContext>("TestContext", {
      errorMessage: "Use TestContextProvider before reading TestContext.",
    }),
  );

  expectTypeOf(useContext(context)).toEqualTypeOf<TestContext>();
});
