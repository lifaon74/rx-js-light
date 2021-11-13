## empty

```ts
function empty<GValue = any>(): IObservable<GValue>
```

Creates an Observable, which never emits a value.

### Example

```ts
const subscribe = empty();

empty(() => {
  console.log('never append');
});
```


