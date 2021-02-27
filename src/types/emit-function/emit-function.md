## EmitFunction

```ts
interface IEmitFunction<GValue> {
  (value: GValue): void;
}
```

An *EmitFunction* receives and consumes a value.

This is equivalent to a *push destination* or an *[Observer](https://rxjs-dev.firebaseapp.com/guide/observer)*.

### Examples

#### EmitFunction that receives a number and log its value

```ts
const emit: IEmitFunction<number> = (value: number): void => {
  console.log('value:', value);
};

emit(1);
emit(2);
emit(3);
```

Output:

```text
value: 1
value: 2
value: 3
```

##### RxJS equivalent

```ts
new Observer<number>((value: number) => {
  console.log('value:', value);
});
```


