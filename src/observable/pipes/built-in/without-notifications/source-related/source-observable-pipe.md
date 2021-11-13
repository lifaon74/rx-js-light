## sourceObservablePipe

```ts
function sourceObservablePipe<GValue>(
  getSource: ISourceObservablePipeGetSource<GValue>,
): IObservablePipe<GValue, GValue>
```

```ts
interface ISourceObservablePipeGetSource<GValue> {
  (): ISource<GValue>;
}
```

This ObservablePipe does the bridge between a Source which is not lazy loaded, and an Observable (which is lazy loaded).

- it counts the number of subscriptions and subscribes (only once) to the Observable if the number of
  subscriptions is larger than 0. The received value is emitted in the source.
- if the number of subscriptions is smaller than 1, it unsubscribes from the Observable
- when a subscription occurs, it is transmitted to the Source (same when unsubscribing)

This is partially equivalent to the *[multicast](https://rxjs-dev.firebaseapp.com/api/operators/multicast)*
and *[refCount](https://rxjs-dev.firebaseapp.com/api/operators/refCount)* operators, but it is more generic.

### Extra - shortcut functions

```ts
function shareObservablePipe<GValue>(
  createSource: IShareObservablePipeGetMultiCastSource<GValue> = createMulticastSource,
): IObservablePipe<GValue, GValue>
```

### Examples

#### Sharing the same Observable

```ts
const subscribe = pipeObservable(interval(1000), [
  scanObservablePipe<void, number>(count => (count + 1), 0),
  sourceObservablePipe<number>(createMulticastSource),
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

#### Same but using shareObservablePipe

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


