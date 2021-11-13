## ObserverPipe

```ts
interface IObserverPipe<GIn, GOut> {
  (emit: IObserver<GOut>): IObserver<GIn>;
}
```

An *ObserverPipe* receives a value, performs some operation on it, and may emit something else.

Somehow, this is both a *push destination* (returned Observer), and a *push source* (received Observer)

ℹ️ there is no RxJS equivalent, because there is no *subscribe* mechanism with *ObserverPipe*.

### Examples

#### ObserverPipe that re-emits only distinct received values

```ts
const distinct: IObserverPipe<any, any> = <GValue>(emit: IObserver<GValue>): IObserver<GValue> => {
  let previousValue: GValue;
  return (value: GValue): void => {
    if (value !== previousValue) {
      previousValue = value;
      emit(value);
    }
  };
};

const destination: IObserver<number> = (value: number): void => {
  console.log('value:', value);
}

const emit: IObserver<number> = distinct(destination);

emit(1);
emit(2);
emit(2);
emit(3);
```

Output:

```text
value: 1
value: 2
value: 3
```

