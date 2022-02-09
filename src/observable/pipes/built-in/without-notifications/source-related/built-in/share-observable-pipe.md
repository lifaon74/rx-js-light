## shareObservablePipe

```ts
function shareObservablePipe<GValue>(
  getMulticastSource: IShareObservablePipeGetMultiCastSource<GValue> = createMulticastSource,
): IObservablePipe<GValue, GValue>
```


This ObservablePipe returns:

```ts
sourceObservablePipe<GValue>(getMulticastSource)
```

### Examples

#### Sharing the same Observable

```ts
const subscribe = pipeObservable(interval(1000), [
  scanObservablePipe<void, number>(count => (count + 1), 0),
  shareObservablePipe<number>(),
]);

subscribe((value: string) => {
  console.log('value - A:', number);
});

subscribe((value: string) => {
  console.log('value - B:', number);
});
```

Output:

```text
value - A: 0
value - B: 0
value - A: 1
value - B: 1
...
```

