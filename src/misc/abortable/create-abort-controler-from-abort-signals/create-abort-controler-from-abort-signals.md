## createAbortControllerFromAbortSignals

```ts
function createAbortControllerFromAbortSignals(
  signals: readonly AbortSignal[],
): AbortController
```

Creates an AbortController which will be aborted if/when one of the 'signals' is aborted



