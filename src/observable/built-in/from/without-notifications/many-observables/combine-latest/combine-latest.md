## combineLatest

```ts
function combineLatest<GObservables extends readonly IGenericObservable[]>(
  observables: GObservables,
): IObservable<ICombineLatestObservablesValues<GObservables>>
```

`combineLatest` combines the values from all the Observables passed as arguments. This is done by subscribing to
each Observable in order and, whenever any Observable emits, collecting an array of the most recent values
from each Observable. So if you pass *n* Observables, the returned Observable will always emit an
array of *n* values, in order corresponding to order of passed Observables (value from the first
Observable on the first place and so on).

### Examples

#### Example 1

```ts

// observable with generates 0, 1, 2, 3,... every 500ms
let i: number = 0;
const obs1 = pipeObservable(interval(500), [
  mapObservablePipe<void, number>(() => i++),
]);

// observable with generates 'a', 'b', 'c',... every 500ms
let j: number = 97;
const obs2 = pipeObservable(interval(500), [
  mapObservablePipe<void, string>(() => String.fromCharCode(j++)),
]);

const subscribe = combineLatest([obs1, obs2]);

let startTime: number = Date.now();
subscribe((result) => {
  console.log(`${ (Date.now() - startTime).toString(10) }ms`, result);
})
```

Output:

```text
500ms: [0, 'a']

1000ms: [1, 'a']
1000ms: [1, 'b']

1500ms: [2, 'b']
1500ms: [2, 'c']
```
