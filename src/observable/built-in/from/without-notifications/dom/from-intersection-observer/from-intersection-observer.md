## fromIntersectionObserver

```ts
function fromIntersectionObserver(
  element: Element,
  options?: IntersectionObserverInit,
): IObservable<IntersectionObserverEntry>
```

Creates an Observable that creates an IntersectionObserver for a specific element, and emits an
IntersectionObserverEntry when a change in the intersection is detected.

### Examples

#### Element that change of color when it intersects the body

```ts
const element = document.createElement('div');
element.style.height = '400px';
element.style.backgroundColor = 'red';
element.style.marginTop = '150%';
document.body.appendChild(element);

const subscribe = pipeObservable(fromIntersectionObserver(element, { threshold: [0, 1] }), [
  mapObservablePipe((entry: IntersectionObserverEntry): string => {
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


