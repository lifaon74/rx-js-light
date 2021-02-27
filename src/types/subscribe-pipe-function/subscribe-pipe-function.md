## SubscribePipeFunction

```ts
interface ISubscribePipeFunction<GIn, GOut> {
  (subscribe: ISubscribeFunction<GIn>): ISubscribeFunction<GOut>;
}
```

An *SubscribePipeFunction* receives a value, performs some operation on it, and may emit something.

Similar to [EmitPipeFunction](../emit-pipe-function/emit-pipe-function.md) but works with
[SubscribeFunction](../subscribe-function/subscribe-function.md) instead.

Somehow, this is both a *lazy push destination* (returned SubscribeFunction), and a *lazy push source* (received SubscribeFunction)

This is equivalent to the *[Pipeable Operators](https://rxjs-dev.firebaseapp.com/guide/operators)* (only the pipeable ones).

### Examples

#### SubscribePipeFunction that re-emits only distinct received values

```ts
const distinct = <GValue>(subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
  return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
    let previousValue: GValue;
    return subscribe((value: GValue): void => {
      if (value !== previousValue) {
        previousValue = value;
        emit(value);
      }
    });
  };
}

const subscribe: ISubscribeFunction<number> = distinct(of(1, 2, 2, 3));

const unsubscribe: IUnsubscribeFunction = subscribe((value: string) => {
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
