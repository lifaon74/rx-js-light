## bufferObservablePipe or buffer$$$

```ts
function bufferObservablePipe<GValue>(
  closingObservable: IObservable<any>,
): IObservablePipe<GValue, GValue[]>
```

This pipe appends into an array the received values until `closingObservable` emits a value. When `closingObservable` emits a value, this
array is emitted, and a new one is created for the next values.

The RxJS equivalent is [buffer](https://rxjs.dev/api/operators/buffer)

### Examples

#### Buffers the mouse positions on the X axis every seconds

```ts
const subscribe = pipeObservable(fromEventTarget<'mousemove', MouseEvent>(window, 'mousemove'), [
  mapObservablePipe<MouseEvent, number>((event: MouseEvent) => event.clientX),
  bufferObservablePipe<number>(interval(1000)),
]);

subscribe((positions: number[]) => {
  console.log(positions);
});
```

