*Example: display mouse position until we click*

```ts
const subscribeToMouseMove = pipeSubscribeFunction(fromEventTarget<'mousemove', MouseEvent>(window, 'mousemove'), [
  mapSubscribePipe<MouseEvent>((event: MouseEvent) => [event.clientX, event.clientY]),
]);

const unsubscribeOfMouseMove = subscribeToMouseMove(([x, y]) => {
  console.log(x, y);
});

const subscribeToMouseClick = fromEventTarget<'click', MouseEvent>(window, 'click');

const unsubscribeOfMouseClick= subscribeToMouseClick(() => {
  unsubscribeOfMouseMove();
  unsubscribeOfMouseClick();
});
```
