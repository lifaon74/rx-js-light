## fromEventTarget

```ts
function fromEventTarget<GName extends string, GEvent extends Event>(
  target: ITypedPureEventTarget<TKeyValueTuple<GName, GEvent>>,
  eventName: GName,
  options?: AddEventListenerOptions,
): ISubscribeFunction<GEvent>
```

Creates a SubscribeFunction that emits events of a specific type coming from the given event target.

### Examples

#### Simple http request

```ts
const subscribe = fromEventTarget(window, 'click');

subscribe((event: MouseEvent) => {
  console.log('click: ', event.clientX, '-', event.clientY);
})
```

Output:

```text
click: 245-499
click: 987-123
click: 71-268
....
```

