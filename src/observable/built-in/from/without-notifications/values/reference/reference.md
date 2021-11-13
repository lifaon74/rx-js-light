## reference

```ts
function reference<GValue>(
  getValue: IGetReferenceValue<GValue>,
): IObservable<GValue>
```

```ts
interface IGetReferenceValue<GValue> {
  (): GValue;
}
```

Creates an Observable, which on subscribe, will call `getValue` and emits the returned value.

### Examples

#### Deferred usage of the variable 'value'

```ts
let value: number; // let's assume we don't know yet the value to assign

const subscribe = reference(() => value);

const destination = (value: number) => {
  console.log(value);
};

// LATER
value = 1;
subscribe(destination); // output '1'

value = 2;
subscribe(destination); // output '2'
```


