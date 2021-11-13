## UnicastSource

```ts
interface IUnicastSource<GValue> extends ISource<GValue> {
  getObserver(): IObserver<GValue> | null;
}
```

```ts
function createUnicastSource<GValue>(): IUnicastSource<GValue>
```

An *UnicastSource* is used to emit one value to only one Observer.

This is partially equivalent to the *[Subject](https://rxjs-dev.firebaseapp.com/guide/subject)*.

### Examples

#### Emit values from a Source

```ts
const source = createUnicastSource<number>();

source.subscribe((value: string) => {
  console.log('value :', value);
});

source.emit(1);
source.emit(2);
```

Output:

```text
value: 1
value: 2
```

#### Error if you have more than one Observer

```ts
const source = createUnicastSource<number>();

const observerA = (value: string) => {
  console.log('value - A:', value);
};

const unsubscribeA = source.subscribe(observerA);

console.log(source.getObserver() === observerA); // true
source.emit(1); // log -> 'value - A: 1'

unsubscribeA();

console.log(source.getObserver() === null); // true
source.emit(2); // nothing logged

source.subscribe(observerA);

const observerB = (value: string) => {
  console.log('value - A:', value);
};

source.subscribe(observerB); // throws an Error because a maximum of one observer is allowed
```


