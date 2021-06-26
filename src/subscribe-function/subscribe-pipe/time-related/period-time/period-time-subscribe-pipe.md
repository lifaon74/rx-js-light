## periodTimeSubscribePipe

```ts
function periodTimeSubscribePipe<GValue>(
  duration: number,
): ISubscribePipeFunction<GValue, GValue>
```

Emits a value from the source SubscribeFunction, then, for a duration determined by `duration`, if a value is received,
cache it and emits it at the end of the timer. As result, a value if emitted evey `duration` ms at the best, and the
last emitted value if always transmitted.

The RxJS closest equivalent is [sampleTime](https://rxjs-dev.firebaseapp.com/api/operators/sampleTime)

### Examples

#### Debounce user clicks

```ts
const subscribe = pipeSubscribeFunction(fromEventTarget(window, 'click'), [
  periodTimeSubscribePipe(200),
]);

subscribe(() => {
  console.log('clicked');
});
```

Timeline:

```text
0ms: user clicks
0ms: 'clicked'
100ms: user clicks
200ms: 'clicked'
300ms: user clicks
350ms: user clicks
400ms: 'clicked'
```


