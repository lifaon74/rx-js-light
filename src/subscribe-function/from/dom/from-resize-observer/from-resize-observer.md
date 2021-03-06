## fromResizeObserver

```ts
function fromResizeObserver(
  element: Element,
  options?: ResizeObserverOptions,
): ISubscribeFunction<ResizeObserverEntry>
```

Creates a SubscribeFunction that creates an ResizeObserver for a specific element,
and emits a ResizeObserverEntry when the element's size changes.

### Examples

TODO


