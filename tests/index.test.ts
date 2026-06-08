import { expect, test } from "vite-plus/test";
import { defaultError } from "../src/index.ts";

interface TestContext {
  count: number;
  increment: () => void;
}

test("throws the default context provider error when accessed", () => {
  const value = defaultError<TestContext>("TestContext");

  expect(() => value.count).toThrow(
    "TestContext can only be accessed within a <TestContextProvider>",
  );
});

test("throws the configured error message when accessed", () => {
  const value = defaultError<TestContext>("TestContext", {
    errorMessage: "Use TestContextProvider before reading TestContext.",
  });

  expect(() => value.increment).toThrow("Use TestContextProvider before reading TestContext.");
});

test("throws the same prepared error on every access", () => {
  const value = defaultError<TestContext>("TestContext");
  const errors: unknown[] = [];

  for (const access of [() => value.count, () => value.increment]) {
    try {
      access();
    } catch (error) {
      errors.push(error);
    }
  }

  expect(errors[0]).toBe(errors[1]);
});

test("throws when called directly", () => {
  const value = defaultError<() => void>("TestContext");

  expect(() => value()).toThrow("TestContext can only be accessed within a <TestContextProvider>");
});
