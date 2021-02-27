## fromFetch

```ts
function fromFetch(
  requestInfo: RequestInfo,
  requestInit?: RequestInit,
): ISubscribeFunction<ISubscribeFunctionFromFetchNotifications>
```

Creates a SubscribeFunction performing an HTTP request using the `fetch` api.

For details, you may see [fromPromiseFactory](../../promise/from-promise-factory/from-promise-factory.md)

### Examples

#### Simple http request

```ts
const subscribe = fromFetch('https://some-url.site');

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

