## debounceMicrotaskObservablePipe or debounceMicrotask$$$

```ts
function debounceMicrotaskObservablePipe<GValue>(): IObservablePipe<GValue, GValue>
```

Awaits for the next event loop (setMicrotask) and emits the last value received from the source Observable.

### Examples

#### Debounce frequent values

```ts
const source = createMulticastSource<number>();

const subscribe = pipeObservable(source.subscribe, [
  debounceMicrotaskObservablePipe(),
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

