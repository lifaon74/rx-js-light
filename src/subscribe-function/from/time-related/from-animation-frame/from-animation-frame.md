## fromAnimationFrame

```ts
function fromAnimationFrame(): ISubscribeFunction<void>
```

Creates a SubscribeFunction that emits void every animation frame.

### Examples

#### Use it to draw something

```ts
const subscribe = fromAnimationFrame();

const unsubscribe = subscribe(() => {
  // draw something on a canvas
})
```


