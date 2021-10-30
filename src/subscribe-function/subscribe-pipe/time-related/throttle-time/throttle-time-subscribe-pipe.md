## throttleTimeSubscribePipe

```ts
function throttleTimeSubscribePipe<GValue>(
  duration: number,
  options?: IThrottleTimeSubscribePipeOptions,
): ISubscribePipeFunction<GValue, GValue>
```

```ts
interface IThrottleTimeSubscribePipeOptions {
  leading?: boolean; // (default: true)
  trailing?: boolean; // (default: true)
}
```

When a value is received:

- if `leading` is true or the last received value was earlier than `duration` ms, emits the value
- else if `trailing` is true, start a timer until `duration` ms are elapsed, which will emit the last received value.

As result, a value if emitted evey `duration` ms at best.

The RxJS equivalent is [throttleTime](https://rxjs.dev/api/operators/throttleTime).

### Examples

#### Debounce user clicks

```ts
const subscribe = pipeSubscribeFunction(fromEventTarget(window, 'click'), [
  throttleTimeSubscribePipe(200),
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


