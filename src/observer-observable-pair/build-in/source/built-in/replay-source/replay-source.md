## ReplaySource

```ts
interface IReplaySourceMethods<GValue> {
  getValues(): readonly GValue[];
}

type IReplaySource<GValue, GSource extends ISource<GValue>> =
  Omit<GSource, keyof IReplaySourceMethods<GValue>>
  & IReplaySourceMethods<GValue>;
```

```ts
function createReplaySource<GValue, GSource extends ISource<GValue>>(
  source: GSource,
  maxNumberOfValues: number = Number.POSITIVE_INFINITY,
): IReplaySource<GValue, GSource>
```

A *ReplaySource* is used to cache many values and emit them each time we subscribe to it.

When calling `createReplaySource` you must provide a `source` which is used to build the ReplaySource. You may
choose for example, between an *UnicastSource* or a *MulticastSource*.

This is equivalent to the *[ReplaySubject](https://rxjs.dev/api/index/class/ReplaySubject)* if you provide a *MulticastSource*.

### Extra - shortcut functions

```ts
function createMulticastReplaySource<GValue>(
  maxNumberOfValues?: number,
): IMulticastReplaySource<GValue>
```

```ts
function createUnicastReplaySource<GValue>(
  maxNumberOfValues?: number,
): IUnicastReplaySource<GValue>
```

### Examples

#### ReplaySource

```ts

const source = createMulticastReplaySource<number>();

source.subscribe((value: string) => {
  console.log('value - A:', value);
});

source.emit(0);
source.emit(1);

source.subscribe((value: string) => {
  console.log('value - B:', value);
});

source.emit(2);
```

Output:

```text
value - A: 0
value - A: 1
value - B: 0
value - B: 1
value - A: 3
value - B: 3
```

##### RxJS equivalent

```ts
const source = new ReplaySubject();

source.subscribe((value: string) => {
  console.log('value - A:', value);
});

source.next(0);
source.next(0);

source.subscribe((value: string) => {
  console.log('value - B:', value);
});

source.next(2);
```

