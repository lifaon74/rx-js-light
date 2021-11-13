# Emitting values using sources

We've seen how to create Observables, but how can we emit simply some values ?

For this, we will use a *Source*:

```ts
interface ISource<GValue> {
  readonly emit: IObserver<GValue>;
  readonly subscribe: IObservable<GValue>;
}
```

A Source does the link between an *Observer* and a *Observable*.
`emit` and `subscribe` are tied together, by an internal algorithm: usually, emitting a value using `emit` will emit this value into
the Observable of the Source.

**WARNING**: the following functions and interfaces explains what are Sources, and what they want to achieve.
**You probably don't want to use them directly**, except for `createMulticastReplayLastSource.`


## The MulticastSource

```ts
interface IMulticastSource<GValue> extends ISource<GValue> {
  getObservers(): readonly IObserver<GValue>[]; // readonly list of observers for this source
}
```

```ts
function createMulticastSource<GValue>(): ISource<GValue>;
```

A *MulticastSource* is used to emit one value to multiple observers (*Observer*).

While plain Observables are unicast (each subscribed Observer owns an independent execution of the Observable),
*MulticastSource* are multicast.

Internally to the MulticastSource, subscribe does not invoke a new execution that delivers values.
It simply registers the given Observer in a list of Observers, similarly to how addListener usually works in other libraries and languages.

Here's a simple example demonstrating the usage of a *MulticastSource*.

```ts
const source = createMulticastSource<number>();

source.subscribe((value: string) => {
  console.log('value - A:', value);
});

source.subscribe((value: string) => {
  console.log('value - B:', value);
});

source.emit(1);
source.emit(2);
```

Output:

```text
value - A: 1
value - B: 1
value - A: 2
value - B: 2
```

If you already have an Observable and want to "convert" it to a *MulticastSource* (share its values), you can use the
ObservablePipe `shareObservablePipe`:


```ts
const subscribe = pipeObservable(interval(1000), [
  scanObservablePipe<void, number>(count => (count + 1), 0),
  shareObservablePipe<number>(),
]);
```


## The ReplayLastSource

```ts
interface IReplayLastSourceMethods<GValue> {
  getValue(): GValue;
}

type IReplayLastSource<GValue, GSource extends ISource<GValue>> =
  Omit<GSource, keyof IReplayLastSourceMethods<GValue>>
  & IReplayLastSourceMethods<GValue>;
```

```ts
function createReplayLastSource<GValue, GSource extends ISource<GValue>>(
  source: GSource,
  options?: ICreateReplayLastSourceOptions<GValue>,
): IReplayLastSource<GValue, GSource>
```

```ts
interface ICreateReplayLastSourceOptions<GValue> {
  initialValue?: GValue;
}
```

A *ReplayLastSource* is used to store a value and emit it each time we subscribe to it.
It's a Source that caches the last received value.

When calling `createReplayLastSource` you must provide a `source` which is used to build the ReplayLastSource. You may
choose for example, between an *UnicastSource* or a *MulticastSource*.

You may provide an initial value (`initialValue`). If you don't, the ReplayLastSource waits for the first received value.


## createMulticastReplayLastSource - the real function you will use

```ts
interface ICreateMulticastReplayLastSourceOptions<GValue> extends ICreateReplayLastSourceOptions<GValue> {
}

type IMulticastReplayLastSource<GValue> = IReplayLastSource<GValue, IMulticastSource<GValue>>;

function createMulticastReplayLastSource<GValue>(
  options?: ICreateMulticastReplayLastSourceOptions<GValue>,
): IMulticastReplayLastSource<GValue>
```

This function will build a *ReplayLastSource* from a *MulticastSource*.
So, it generates a Source that caches the last emitted value and supports many Observers.

You'll usually use it to declare some "Reactive Variables".


```ts
const source = createMulticastReplayLastSource<number>({ initialValue: 0 });

source.subscribe((value: string) => {
  console.log('value - A:', value);
});

source.emit(1);
source.emit(2);

source.subscribe((value: string) => {
  console.log('value - B:', value);
});

source.emit(3);
```

Output:

```text
value - A: 0
value - A: 1
value - A: 2
value - B: 2
value - A: 3
value - B: 3
```

---

## Table of content

- [Introduction](./01-introduction.md)
- [Installation](./02-installation.md)
- [Your first Observable](./03-your-first-observable.md)
- [Using the built-in Observables](./04-using-the-built-in-observables.md)
- [Emitting values using sources](./05-sources.md)
- [Shortcuts](./06-rx-js-light-shortcuts.md)
- [A practical example for rx-js-light](./07-practical-example/07-practical-example.md)
- [Notifications replace RxJS events](./08-notifications.md)

