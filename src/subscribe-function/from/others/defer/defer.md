## defer

```ts
function defer<GValue>(
  factory: IDefferFactoryFunction<GValue>,
): ISubscribeFunction<GValue>
```

```ts
interface IDefferFactoryFunction<GValue> {
  (): ISubscribeFunction<GValue>;
}
```

Creates a SubscribeFunction, which on subscribe, will call `factory` and
transmit the received *emit* function to the returned SubscribeFunction.

### Examples

#### Deferred usage of the variable 'value'

```ts
let value: number; // let's assume we don't know yet the value to assign

const subscribe = defer(() => of(value));

const destination = (value: number) => {
  console.log(value);
};

// LATER
value = 1;
subscribe(destination); // output '1'

value = 2;
subscribe(destination); // output '2'
```


