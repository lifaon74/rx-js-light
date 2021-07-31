## empty

```ts
function empty<GValue = any>(): ISubscribeFunction<GValue>
```


Creates a SubscribeFunction, which never emits a value.

### Example

```ts
const subscribe = empty();

empty(() => {
  console.log('never append');
});
```


