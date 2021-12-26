## debounceImmediateObservablePipe or debounceImmediate$$$

```ts
function debounceImmediateObservablePipe<GValue>(): IObservablePipe<GValue, GValue>
```

Awaits for the next event loop (setImmediate) and emits the last value received from the source Observable.

### Examples

#### Debounce frequent values

```ts
const source = createMulticastSource<number>();

const subscribe = pipeObservable(source.subscribe, [
  debounceImmediateObservablePipe(),
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

