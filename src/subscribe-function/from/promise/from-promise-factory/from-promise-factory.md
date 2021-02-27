## fromPromiseFactory

```ts
function fromPromiseFactory<GValue>(
  createPromise: IFromPromiseFactoryCreatePromiseFunction<GValue>,
  options?: ISubscribeFunctionFromPromiseFactoryOptions,
): ISubscribeFunction<ISubscribeFunctionFromPromiseFactoryNotifications<GValue>>
```

```ts
interface ISubscribeFunctionFromPromiseFactoryOptions {
  signal?: AbortSignal | null;
}

interface IFromPromiseFactoryCreatePromiseFunction<GValue> {
  (signal: AbortSignal): Promise<GValue>;
}
```

Creates a SubscribeFunction from a Promise factory.

The promise factory is a function which receives an AbortSignal and returns a Promise.

The AbortSignal is aborted when the subscription is unsubscribed and if the Promise is not resolved (fulfilled or
rejected). This signal should be used to cancel any pending work (ex: `fetch`, or any pending async task).

The SubscribeFunction emits values in the form of Notifications:

- `next`: the returned value of the promise
- `complete`: when the promise is fulfilled
- `error`: when the promise is rejected

You may provide a `ISubscribeFunctionFromPromiseFactoryOptions`, which may be used to force an abort from an external
AbortSignal.

### Examples

#### Simple http request

```ts
const subscribe = fromPromiseFactory(
  (signal: AbortSignal) => {
    return fetch('https://some-url.site', {
      signal,
    });
  },
);

subscribe((notification) => {
  console.log(notification.name, ':', notification.value);
})
```

Output:

```text
next: Response
=> if fulfilled
complete
=> if rejected
error: Error
```

