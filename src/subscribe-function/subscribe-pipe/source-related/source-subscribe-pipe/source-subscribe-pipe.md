## sourceSubscribePipe

```ts
function sourceSubscribePipe<GValue>(
  getSource: ISourceSubscribePipeGetSource<GValue>,
): ISubscribePipeFunction<GValue, GValue>
```

```ts
interface ISourceSubscribePipeGetSource<GValue> {
  (): ISource<GValue>;
}
```

This SubscribePipe does the bridge between a Source which is not lazy loaded, and a SubscibeFunction (which is lazy loaded).

- it counts the number of subscriptions and subscribes (only once) to the SubscribeFunction if the number of subscriptions is larger than 0.
  the received value is emitted in the source
- if the number of subscriptions is smaller than 1, it unsubscribes from the SubscribeFunction
- when a subscription occurs, it is transmitted to the Source (same when unsubscribing)

This is partially equivalent to the *[multicast](https://rxjs-dev.firebaseapp.com/api/operators/multicast)*
and *[refCount](https://rxjs-dev.firebaseapp.com/api/operators/refCount)* operators, but it is more generic.

### Extra - shortcut functions

```ts
function shareSubscribePipe<GValue>(
  createSource: IShareSubscribePipeGetMultiCastSource<GValue> = createMulticastSource,
): ISubscribePipeFunction<GValue, GValue>
```

### Examples

#### Sharing the same SubscribeFunction

```ts
let i: number = 0;
const subscribe = pipeSubscribeFunction(interval(1000), [
  mapSubscribePipe<void, number>(() => (i++)),
  sourceSubscribePipe<number>(createMulticastSource),
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

#### Same but using shareSubscribePipe

```ts
let i: number = 0;
const subscribe = pipeSubscribeFunction(interval(1000), [
  mapSubscribePipe<void, number>(() => (i++)),
  shareSubscribePipe<number>(),
]);

subscribe((value: string) => {
  console.log('value - A:', number);
});

subscribe((value: string) => {
  console.log('value - B:', number);
});
```


