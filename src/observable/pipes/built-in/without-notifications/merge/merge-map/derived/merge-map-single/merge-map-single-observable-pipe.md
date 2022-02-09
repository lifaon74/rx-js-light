## mergeMapSingleObservablePipe or mergeMapS$$$

```ts
function mergeMapSingleObservablePipe<GIn, GOut>(
  mapFunction: IMapFunction<GIn, IObservable<GOut>>,
): IObservablePipe<GIn, GOut>
```

This function is a shortcut and optimized version of `mergeMapObservablePipe(mapFunction, 1)`

See [mergeMapObservablePipe](../../merge-map-observable-pipe.md)

