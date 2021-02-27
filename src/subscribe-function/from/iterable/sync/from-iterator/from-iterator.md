## fromIterator

```ts
function fromIterator<GValue>(
  iterator: Iterator<GValue>,
): ISubscribeFunction<GValue>
```

Creates a SubscribeFunction from an Iterator. It emits values of the iterator one by one.

⚠️ use with caution, if you subscribe twice to the same Iterator, the emitted values probably won't be
what you expect, due to concurrent calls on the `.next`.

You should prefer to use [fromIterable](../from-iterable/from-iterable.md) which generates an uniq
Iterator, or `share` the SubscribeFunction.

### Examples

#### Simple Iterator which emits values from 0 to 9

```ts
const subscribe = fromIterator(
  (function * () {
    for (let i = 0; i < 10; i++) {
      yield i;
    }
  })()
);

subscribe((value: number) => {
  console.log(value);
});
```

Output:

```text
0
1
...
9
complete
```
