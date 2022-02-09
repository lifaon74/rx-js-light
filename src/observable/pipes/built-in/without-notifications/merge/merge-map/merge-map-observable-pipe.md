## mergeMapObservablePipe or mergeMap$$$

```ts
function mergeMapObservablePipe<GIn, GOut>(
  mapFunction: IMapFunction<GIn, IObservable<GOut>>,
  maxNumberOfSubscriptions?: number,
): IObservablePipe<GIn, GOut>
```

This function is equivalent to:

```ts
pipeObservablePipes(subscribe, [
  mapObservablePipe<GIn, IObservable<GOut>>(mapFunction),
  mergeAllObservablePipe<GOut>(maxNumberOfSubscriptions),
]);
```

See [mapObservablePipe](../../observer-pipe-related/map/map-observable-pipe.md) and [mergeAllObservablePipe](../merge-all/merge-all-observable-pipe.md)

The RxJS equivalent is [mergeMap](https://rxjs-dev.firebaseapp.com/api/operators/mergeMap)

### Examples

#### Example 1

```ts
const subscribe = pipeObservable(timeout(2000), [
  mergeMapObservablePipe(() => of(1, 2, 3)),
]);

subscribe((value) => {
  console.log(value);
});
```

Output:

```text
// 2000ms
1
2
3
```
