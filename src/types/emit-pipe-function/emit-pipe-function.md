## EmitPipeFunction

```ts
interface IEmitPipeFunction<GIn, GOut> {
  (emit: IEmitFunction<GOut>): IEmitFunction<GIn>;
}
```

An *EmitPipeFunction* receives a value, performs some operation on it, and may emit something.

Somehow, this is both a *push destination* (returned EmitFunction), and a *push source* (received EmitFunction)

ℹ️ there is no RxJS equivalent, because there is no *subscribe* mechanism with *EmitPipeFunction*.


### Examples

#### EmitPipeFunction that re-emits only distinct received values

```ts
const distinct: IEmitPipeFunction<any, any> = <GValue>(emit: IEmitFunction<GValue>): IEmitFunction<GValue> => {
  let previousValue: GValue;
  return (value: GValue): void => {
    if (value !== previousValue) {
      previousValue = value;
      emit(value);
    }
  };
};

const destination: IEmitFunction<number> = (value: number): void => {
  console.log('value:', value);
}

const emit: IEmitFunction<number> = distinct(destination);

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

