## takeObservablePipe or take$$$

```ts
function takeObservablePipe<GValue>(
  count: number,
): IObservablePipe<GValue, GValue>
```

This pipe emits only the first `count` values emitted by the source Observable.

The RxJS equivalent is [take](https://rxjs.dev/api/operators/take)

### Examples

#### Display only the first 2 emitted values

```ts
const subscribe = pipeObservable(of(1, 2, 3, 4), [
  takeObservablePipe<number>(2),
]);

subscribe((positions: number) => {
  console.log(positions);
});
```

Output:

```text
1
2
```

