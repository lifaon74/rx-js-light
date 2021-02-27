## fromReadableStreamReader

```ts
function fromReadableStreamReader<GValue>(
  reader: ReadableStreamReader<GValue>
): ISubscribeFunction<ISubscribeFunctionFromReadableStreamReaderNotifications<GValue>>
```

Creates a SubscribeFunction from a [ReadableStreamReader](https://streams.spec.whatwg.org/#typedefdef-readablestreamreader).
It emits values in the form of Notifications.

See [fromAsyncIterator](../../../iterable/async/from-async-iterator/from-async-iterator.md) for more details.

⚠️ use with caution, if you subscribe twice to the same ReadableStreamReader, the emitted values probably won't be
what you expect, due to concurrent calls on the `.read`.

You should prefer to use [fromReadableStream](../from-readable-stream/from-readable-stream.md) which ensures that the
ReadableStream is not locked.

### Examples

#### Read data from a Response (Body)

```ts
async function run() {
  const response = await fetch('https://somefile');
  const subscribe = fromReadableStream(response.body.getReader());

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
