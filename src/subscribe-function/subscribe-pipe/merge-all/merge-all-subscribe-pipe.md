## mergeAllSubscribePipe

```ts
function mergeAllSubscribePipe<GValue>(
  maxNumberOfSubscriptions: number = Number.POSITIVE_INFINITY,
): ISubscribePipeFunction<ISubscribeFunction<GValue>, GValue>
```

This function subscribes to a *SubscribeFunction* that emits some *SubscribeFunctions*, also known as a higher-order
*SubscribeFunction*.

Each time it observes one of these emitted inner *SubscribeFunction*, it subscribes to that and delivers all the values
from the inner *SubscribeFunction* on the output *SubscribeFunction*.

You may provide `maxNumberOfSubscriptions` which limits the maximum number of subscriptions. If reached, it unsubscribes
the least recent ones.

The RxJS equivalent is [mergeAll](https://rxjs-dev.firebaseapp.com/api/operators/mergeAll)

### Examples

#### Example 1

```ts
const subscribe = pipeSubscribeFunction(interval(1000), [
  mapSubscribePipe(() => single(Math.random())),
  mergeAllSubscribePipe(1),
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
