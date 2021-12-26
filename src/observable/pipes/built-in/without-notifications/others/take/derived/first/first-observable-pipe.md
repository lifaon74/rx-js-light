## firstObservablePipe or first$$$

```ts
function firstObservablePipe<GValue>(
  count: number,
): IObservablePipe<GValue, GValue>
```

This pipe emits only the first value emitted by the source Observable.

The RxJS equivalent is [first](https://rxjs.dev/api/operators/first)

### Examples

#### firsts the mouse positions on the X axis every seconds

```ts
const subscribe = pipeObservable(of(1, 2, 3, 4), [
  firstObservablePipe<number>(),
]);

subscribe((value: number) => {
  console.log(value);
});
```

Output:

```text
1
```

