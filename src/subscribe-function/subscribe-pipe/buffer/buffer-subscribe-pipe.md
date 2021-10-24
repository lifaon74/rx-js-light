## bufferSubscribePipe

```ts
function bufferSubscribePipe<GValue>(
  closingSubscribeFunction: ISubscribeFunction<any>,
): ISubscribePipeFunction<GValue, GValue[]>
```

This pipe appends into an array the received values until `closingSubscribeFunction` emits a value.
When `closingSubscribeFunction` emits a value, this array is emitted, and a new one is created for the next values.

The RxJS equivalent is [buffer](https://rxjs.dev/api/operators/buffer)

### Examples

#### Buffers the mouse positions on the X axis every seconds

```ts
const subscribe = pipeSubscribeFunction(fromEventTarget<'mousemove', MouseEvent>(window, 'mousemove'), [
  mapSubscribePipe<MouseEvent, number>((event: MouseEvent) => event.clientX),
  bufferSubscribePipe<number>(interval(1000)),
]);

subscribe((positions: number[]) => {
  console.log(positions);
});
```

