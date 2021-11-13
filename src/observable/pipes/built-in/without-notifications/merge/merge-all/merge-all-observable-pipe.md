## mergeAllObservablePipe

```ts
function mergeAllObservablePipe<GValue>(
  maxNumberOfSubscriptions: number = Number.POSITIVE_INFINITY,
): IObservablePipe<IObservable<GValue>, GValue>
```

This function subscribes to a *Observable* that emits some *Observables*, also known as a higher-order
*Observable*.

Each time it observes one of these emitted inner *Observable*, it subscribes to that and delivers all the values from the inner *Observable*
on the output *Observable*.

You may provide `maxNumberOfSubscriptions` which limits the maximum number of subscriptions. If reached, it unsubscribes the least recent
ones.

The RxJS equivalent is [mergeAll](https://rxjs-dev.firebaseapp.com/api/operators/mergeAll)

### Examples

#### Example 1

```ts
const subscribe = pipeObservable(interval(1000), [
  mapObservablePipe(() => single(Math.random())),
  mergeAllObservablePipe(1),
]);

subscribe((value) => {
  console.log(value);
});
```

Output:

```text
0.04631441789007029
0.05798639920106741
...
```
