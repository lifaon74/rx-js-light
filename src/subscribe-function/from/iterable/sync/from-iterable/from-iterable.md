## fromIterable

```ts
function fromIterable<GValue>(
  iterable: Iterable<GValue>,
): ISubscribeFunction<GValue>
```

Creates a SubscribeFunction from an Iterable. It emits values of the iterable one by one.

See [fromIterator](../from-iterator/from-iterator.md) for more details.

### Examples

#### Simple AsyncIterable which emits values from 0 to 9

```ts
const subscribe = fromIterable(
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

