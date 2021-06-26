## single

```ts
function single<GValue>(
  value: GValue,
): ISubscribeFunction<GValue>
```


Creates a SubscribeFunction, which on subscribe, will emit `value`.

### Example

```ts
const subscribe = single(3);

subscribe((value: number) => {
  console.log(value);
});
// output '1'
```


