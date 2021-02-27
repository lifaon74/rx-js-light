## ReplayLastSource

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

When calling `createReplayLastSource` you must provide a `source` which is used to build the ReplayLastSource. You may choose for example, between an *UnicastSource*
or a *MulticastSource*.

You may provide an initial value (`initialValue`). If you don't, the ReplayLastSource waits for the first value received.

This is equivalent to the *[BehaviorSubject](https://rxjs-dev.firebaseapp.com/guide/subject)* if you provide a *MulticastSource*.


### Extra - shortcut functions

```ts
function createMulticastReplayLastSource<GValue>(
  options?: ICreateMulticastReplayLastSourceOptions<GValue>,
): IReplayLastSource<GValue, IMulticastSource<GValue>>
```

```ts
function createUnicastReplayLastSource<GValue>(
  options?: ICreateUnicastReplayLastSourceOptions<GValue>,
): IReplayLastSource<GValue, IUnicastSource<GValue>>
```



### Examples

#### ReplayLastSource

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

##### RxJS equivalent

```ts
const source = new BehaviorSubject(0);

source.subscribe((value: string) => {
  console.log('value - A:', value);
});

source.next(1);
source.next(2);

source.subscribe((value: string) => {
  console.log('value - B:', value);
});

source.next(3);
```

