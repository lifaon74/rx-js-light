## fromAsyncIterator

```ts
function fromAsyncIterator<GValue>(
  asyncIterator: AsyncIterator<GValue>,
): ISubscribeFunction<ISubscribeFunctionFromAsyncIteratorNotifications<GValue>>
```

Creates a SubscribeFunction from an AsyncIterator. It emits values in the form of Notifications.

⚠️ use with caution, if you subscribe twice to the same AsyncIterator, the emitted values probably won't be
what you expect, due to concurrent calls on the `.next`.

You should prefer to use [fromAsyncIterable](../from-async-iterable/from-async-iterable.md) which generates an uniq
AsyncIterator, or `share` the SubscribeFunction.

### Examples

#### Simple AsyncIterator which emits values from 0 to 9

```ts
const subscribe = fromAsyncIterator(
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
