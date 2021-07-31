## debounceImmediateSubscribePipe

```ts
function debounceImmediateSubscribePipe<GValue>(): ISubscribePipeFunction<GValue, GValue>
```

Awaits for the next event loop (setImmediate) and emits the last value received from the source SubscribeFunction.

### Examples

#### Debounce frequent values

```ts
const source = createMulticastSource<number>();

const subscribe = pipeSubscribeFunction(source.subscribe, [
  debounceImmediateSubscribePipe(),
]);

subscribe((value: number) => {
  console.log('value', value);
});

// emits some values
console.log('start');
source.emit(0);
source.emit(1);
source.emit(2);
console.log('end');
```

Output:

```text
start
end
value: 2
```

