# react-context-default-error

Create default values for React contexts that throw a clear error when they are accessed outside their provider.

## Installation

```bash
npm install react-context-default-error
```

```bash
pnpm add react-context-default-error
```

```bash
bun add react-context-default-error
```

## Usage

Use `defaultError` as the default value for a context when there is no meaningful fallback value.

```tsx
import { createContext, useContext } from "react";
import { defaultError } from "react-context-default-error";

interface AuthContextValue {
  userId: string;
  signOut: () => void;
}

const AuthContext = createContext(defaultError<AuthContextValue>("AuthContext"));

export function useAuth() {
  return useContext(AuthContext);
}
```

If a component calls `useAuth()` outside `<AuthContextProvider>`, any attempt to read the returned context value throws:

```text
AuthContext can only be accessed within a <AuthContextProvider>
```

## Custom Error Message

Pass `errorMessage` when you want complete control over the thrown message.

```tsx
const AuthContext = createContext(
  defaultError<AuthContextValue>("AuthContext", {
    errorMessage: "useAuth must be used inside AuthContextProvider.",
  }),
);
```

## API

### `defaultError<T>(contextName, options?)`

Returns a proxy typed as `T`. The proxy throws a pre-created `Error` whenever it is read, called, mutated, enumerated, or otherwise inspected.

#### Parameters

- `contextName: string` - the context name used in the default error message.
- `options?: { errorMessage?: string }` - optional custom error message.

#### Default Message

```text
${contextName} can only be accessed within a <${contextName}Provider>
```

## Why

React's `createContext` requires a default value. For contexts that must always be provided, a fake default can hide bugs or fail later with unclear errors. `defaultError` keeps the context type strict while failing immediately with an actionable message.

## License

MIT
