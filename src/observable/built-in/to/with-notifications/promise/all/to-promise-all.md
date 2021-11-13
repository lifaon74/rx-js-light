## toPromiseAll

```ts
function toPromiseAll<GValue>(
  subscribe: IObservable<IObservableToPromiseNotifications<GValue>>,
  options?: IObservableToPromiseOptions
): Promise<GValue[]>
```

```ts
interface IObservableToPromiseOptions {
  signal?: AbortSignal;
}

type IObservableToPromiseNotifications<GValue> = IDefaultInNotificationsUnion<GValue>;

```

Converts an Observable into a Promise.

The Observable must emit the following Notifications:

- `next`: the values to resolve the promise with
- `complete`: resolves the promise with the all `next` values
- `error`: rejects the promise with the received error

You may provide a `IObservableToPromiseOptions`, which may be used to force an abort from an external
AbortSignal: this is useful if you want to abort any pending work and unsubscribe from the provided Observable,
before it completes. If this signal is aborted, the promise is rejected with an `AbortError`.

### Examples

#### Simple http request

```ts
toPromiseAll(fromFetch('https://some-url.site'))
  .then(([response]: Response[]) => {
    console.log(response.statusText);
  });
```

