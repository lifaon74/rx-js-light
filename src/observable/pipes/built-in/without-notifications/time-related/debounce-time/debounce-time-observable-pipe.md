## debounceTimeObservablePipe or debounceTime$$$

```ts
function debounceTimeObservablePipe<GValue>(
  duration: number,
): IObservablePipe<GValue, GValue>
```

Emits a value from the source Observable only after a particular time span has passed without another source emission.

The RxJS equivalent is [debounceTime](https://rxjs-dev.firebaseapp.com/api/operators/debounceTime)

### Examples

#### Debounce user clicks

```ts
const subscribe = pipeObservable(fromEventTarget(window, 'click'), [
  debounceTimeObservablePipe(200),
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

