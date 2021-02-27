## mergeAllSubscribePipe

```ts
function mergeAllSubscribePipe<GValue>(
  maxNumberOfSubscriptions: number = Number.POSITIVE_INFINITY,
): ISubscribePipeFunction<ISubscribeFunction<GValue>, GValue>
```

This function subscribes to a *SubscribeFunction* that emits *SubscribeFunctions*, also known as a higher-order *SubscribeFunction*.

Each time it observes one of these emitted inner *SubscribeFunction*, it subscribes to that and delivers all the values
from the inner *SubscribeFunction* on the output *SubscribeFunction*.

You may provide `maxNumberOfSubscriptions` which limits the maximum number of subscriptions.
If reached, it unsubscribes the least recent ones.  

The RxJS equivalent is [mergeAll](https://rxjs-dev.firebaseapp.com/api/operators/mergeAll)



### Examples

TODO

#### Title

```ts
```

Output:

```text
```

