## fromReadableStream

```ts
function fromReadableStream<GValue>(
  readableStream: ReadableStream<GValue>
): IObservable<IObservableFromReadableStreamNotifications<GValue>>
```

Creates an Observable from a [ReadableStream](https://streams.spec.whatwg.org/#rs-class). It emits values in the
form of Notifications.

See [fromReadableStreamReader](../from-readable-stream-reader/from-readable-stream-reader.md) for more details.

### Examples

#### Read data from a Response (Body)

```ts
async function run() {
  const response = await fetch('https://somefile');
  const subscribe = fromReadableStream(response.body);

  subscribe((notification) => {
    console.log(notification.name, ':', notification.value);
  })
}

run();
```

Output:

```text
next: ArrayBuffer
next: ArrayBuffer
complete
```
