## MulticastSource

```ts
interface IMulticastSource<GValue> extends ISource<GValue> {
  getObservers(): readonly IObserver<GValue>[]; // readonly list of observers for this source
}
```

```ts
function createMulticastSource<GValue>(): ISource<GValue>;
```

A *MulticastSource* is used to emit one value to multiple Observers.

This is equivalent to the *[Subject](https://rxjs-dev.firebaseapp.com/guide/subject)*.

### Examples

#### Subscribe many times to the same Source

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

##### RxJS equivalent

```ts
const source = new Subject<number>();

source.subscribe((value: string) => {
  console.log('value - A:', value);
});

source.subscribe((value: string) => {
  console.log('value - B:', value);
});

source.next(1);
source.next(2);
```

