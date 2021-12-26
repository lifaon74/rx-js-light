## fromFetch

```ts
function fromFetch(
  requestInfo: RequestInfo,
  requestInit?: RequestInit,
): IObservable<IFromFetchObservableNotifications>
```

Creates an Observable performing an HTTP request using the `fetch` api.

For details, you may see [fromPromiseFactory](../../promise/from-promise-factory/from-promise-factory.md)

If you prefer to receive a JSON object instead, you may use `fromFetchJSON` instead.

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

#### Simple http request with JSON response

```ts
const subscribe = fromFetchJSON('https://some-url.site');

subscribe((notification) => {
  console.log(notification.name, ':', notification.value);
})
```

Output:

```text
next: { ...json content }
=> if fulfilled
complete
=> if rejected
error: Error
```
