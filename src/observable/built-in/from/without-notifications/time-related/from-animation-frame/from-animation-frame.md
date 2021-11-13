## fromAnimationFrame

```ts
function fromAnimationFrame(): IObservable<void>
```

Creates an Observable that emits void every animation frame.

### Examples

#### Use it to draw something

```ts
const subscribe = fromAnimationFrame();

const unsubscribe = subscribe(() => {
  // draw something on a canvas
})
```


