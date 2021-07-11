## bufferTimeSubscribePipe

```ts
function bufferTimeSubscribePipe<GValue>(
  duration: number,
): ISubscribePipeFunction<GValue, GValue[]>
```

This pipe appends into an array the received values until a period defined by `duration` is elapsed.
Then, this array is emitted, and a new one is created for the next values.

⚠️ This is not equivalent to:

```ts
export function bufferTimeSubscribePipe<GValue>(
  duration: number,
): ISubscribePipeFunction<GValue, GValue[]> {
  return bufferSubscribePipe<GValue>(interval(duration));
}
```

The timer begins only when a value is received, meaning empty arrays will never be emitted.

⚠️ There is not RxJS equivalent. [bufferTime](https://rxjs.dev/api/operators/bufferTime) does something different.


### Examples

#### Buffers the mouse positions on the X axis with a period of one second

```ts
const subscribe = pipeSubscribeFunction(fromEventTarget<'mousemove', MouseEvent>(window, 'mousemove'), [
  mapSubscribePipe<MouseEvent, number>((event: MouseEvent) => event.clientX),
  bufferTimeSubscribePipe<number>(1000),
]);

subscribe((positions: number[]) => {
  console.log(positions);
});
```

