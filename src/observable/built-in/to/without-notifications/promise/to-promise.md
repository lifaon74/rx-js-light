## toPromise

```ts
function toPromise<GValue>(
  subscribe: IObservable<GValue>,
  options?: IObservableToPromiseOptions
): Promise<GValue>
```

```ts
interface IObservableToPromiseOptions {
  signal?: AbortSignal;
}

```

Converts an Observable into a Promise.

The Promise is resolved with the first received value.

You may provide a `IObservableToPromiseOptions`, which may be used to force an abort from an external
AbortSignal: this is useful if you want to abort any pending work and unsubscribe from the provided Observable,
before it completes. If this signal is aborted, the promise is rejected with an `AbortError`.

### Examples

#### Example 1

```ts
toPromise(of(1, 2, 3))
  .then((value: number) => {
    console.log(value);
  });
```

Output:

```text
1
```
