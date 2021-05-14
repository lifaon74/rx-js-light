## fromIntersectionObserver

```ts
function fromIntersectionObserver(
  element: Element,
  options?: IntersectionObserverInit,
): ISubscribeFunction<IntersectionObserverEntry>
```

Creates a SubscribeFunction that creates an IntersectionObserver for a specific element, and emits an
IntersectionObserverEntry when a change in the intersection is detected.

### Examples

#### Element that change of color when it intersects the body

```ts
const element = document.createElement('div');
element.style.height = '400px';
element.style.backgroundColor = 'red';
element.style.marginTop = '150%';
document.body.appendChild(element);

const subscribe = pipeSubscribeFunction(fromIntersectionObserver(element, { threshold: [0, 1] }), [
  mapSubscribePipe((entry: IntersectionObserverEntry): string => {
    if (entry.intersectionRatio <= 0) {
      return 'red';
    } else if (entry.intersectionRatio >= 1) {
      return 'blue';
    } else {
      return 'green';
    }
  }),
]);

subscribe((color: string) => {
  element.style.backgroundColor = color;
});
```


