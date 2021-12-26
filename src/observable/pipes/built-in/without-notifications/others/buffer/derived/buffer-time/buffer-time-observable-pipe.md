## bufferTimeObservablePipe or bufferTime$$$ or bufferT$$$

```ts
function bufferTimeObservablePipe<GValue>(
  duration: number,
): IObservablePipe<GValue, GValue[]>
```

This pipe appends into an array the received values until a period defined by `duration` is elapsed. Then, this array is emitted, and a new
one is created for the next values.

⚠️ This is not equivalent to:

```ts
export function bufferTimeObservablePipe<GValue>(
  duration: number,
): IObservablePipe<GValue, GValue[]> {
  return bufferObservablePipe<GValue>(interval(duration));
}
```

The timer begins only when a value is received, meaning empty arrays will never be emitted.

⚠️ There is not RxJS equivalent. [bufferTime](https://rxjs.dev/api/operators/bufferTime) does something different.

### Examples

#### Buffers the mouse positions on the X axis with a period of one second

```ts
const subscribe = pipeObservable(fromEventTarget<'mousemove', MouseEvent>(window, 'mousemove'), [
  mapObservablePipe<MouseEvent, number>((event: MouseEvent) => event.clientX),
  bufferTimeObservablePipe<number>(1000),
]);

subscribe((positions: number[]) => {
  console.log(positions);
});
```

