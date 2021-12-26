## ObservablePipe

```ts
interface IObservablePipe<GIn, GOut> {
  (subscribe: IObservable<GIn>): IObservable<GOut>;
}
```

An *ObservablePipe* receives a value, performs some operation on it, and may emit something else.

Similar to an [ObserverPipe](../../../observer/pipes/type/observer-pipe.md) but works with
[Observable](../../type/observable.md) instead.

Somehow, this is both a *lazy push destination* (returned Observable), and a *lazy push source* (received Observable)

This is equivalent to the *[Pipeable Operators](https://rxjs-dev.firebaseapp.com/guide/operators)* (only the pipeable ones).

### Examples

#### ObservablePipe that re-emits only distinct received values

```ts
const distinct = <GValue>(subscribe: IObservable<GValue>): IObservable<GValue> => {
  return (emit: IObserver<GValue>): IUnsubscribe => {
    let previousValue: GValue;
    return subscribe((value: GValue): void => {
      if (value !== previousValue) {
        previousValue = value;
        emit(value);
      }
    });
  };
}

const subscribe: IObservable<number> = distinct(of(1, 2, 2, 3));

const unsubscribe: IUnsubscribe = subscribe((value: string) => {
  console.log('value:', value);
});
```

Output:

```text
value: 1
value: 2
value: 3
```

##### RxJS equivalent

```ts
of(1, 2, 2, 3)
  .pipe(
    distinct(),
  )
  .subscribe(() => {
    console.log('value:', value);
  });
```
