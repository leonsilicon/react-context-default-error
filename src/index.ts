export interface DefaultErrorOptions {
  errorMessage?: string;
}

export function defaultError<T>(contextName: string, options: DefaultErrorOptions = {}): T {
  const error = new Error(
    options.errorMessage ?? `${contextName} can only be accessed within a <${contextName}Provider>`,
  );

  const throwError = () => {
    throw error;
  };

  return new Proxy(throwError, {
    apply: throwError,
    construct: throwError,
    defineProperty: throwError,
    deleteProperty: throwError,
    get: throwError,
    getOwnPropertyDescriptor: throwError,
    getPrototypeOf: throwError,
    has: throwError,
    ownKeys: throwError,
    preventExtensions: throwError,
    set: throwError,
    setPrototypeOf: throwError,
  }) as T;
}
