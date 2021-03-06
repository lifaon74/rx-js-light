## debounceTimeSubscribePipe

```ts
function debounceTimeSubscribePipe<GValue>(
  duration: number,
): ISubscribePipeFunction<GValue, GValue>
```

Emits a value from the source SubscribeFunction only after a particular time span has passed without another source emission.

The RxJS equivalent is [debounceTime](https://rxjs-dev.firebaseapp.com/api/operators/debounceTime)

### Examples

#### Debounce user clicks

```ts
const subscribe = pipeSubscribeFunction(fromEventTarget(window, 'click'), [
  debounceTimeSubscribePipe(200),
]);

subscribe(() => {
  console.log('clicked');
});
```

Timeline:

```text
0ms: user clicks
100ms: user clicks
300ms: 'clicked'
```

