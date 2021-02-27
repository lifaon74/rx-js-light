## toPromiseAll

```ts
function toPromiseAll<GValue>(
  subscribe: ISubscribeFunction<ISubscribeFunctionToPromiseNotifications<GValue>>,
  options?: ISubscribeFunctionToPromiseOptions
): Promise<GValue[]>
```

```ts
interface ISubscribeFunctionToPromiseOptions {
  signal?: AbortSignal;
}

type ISubscribeFunctionToPromiseNotifications<GValue> = IDefaultInNotificationsUnion<GValue>;

```

Converts a SubscribeFunction into a Promise.

The SubscribeFunction must emit the following Notifications:

- `next`: the values to resolve the promise with
- `complete`: resolves the promise with the all `next` values
- `error`: rejects the promise with the received error

You may provide a `ISubscribeFunctionToPromiseOptions`, which may be used to force an abort from an external
AbortSignal: this is useful if you want to abort any pending work and unsubscribe from the provided SubscribeFunction,
before it completes. If this signal is aborted, the promise is rejected with an `AbortError`.

### Examples

#### Simple http request

```ts
toPromiseAll(fromFetch('https://some-url.site'))
  .then(([response]: Response[]) => {
    console.log(response.statusText);
  });
```

