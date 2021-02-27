## fromAsyncIterable

```ts
function fromAsyncIterable<GValue>(
  asyncIterable: AsyncIterable<GValue>,
): ISubscribeFunction<ISubscribeFunctionFromAsyncIterableNotifications<GValue>>;
```

Creates a SubscribeFunction from an AsyncIterable. It emits values in the form of Notifications.

See [fromAsyncIterator](../from-async-iterator/from-async-iterator.md) for more details.

### Examples

#### Simple AsyncIterable which emits values from 0 to 9

```ts
const subscribe = fromAsyncIterable(
  (async function * () {
    for (let i = 0; i < 10; i++) {
      yield i;
    }
  })()
);

subscribe((notification) => {
  console.log(notification.name, ':', notification.value);
});
```

Output:

```text
next: 0
next: 1
...
next: 9
complete
```


