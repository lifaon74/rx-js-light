## Tutorial

*Observables* or in our case *SubscribeFunctions* are really handful to manage **values** that will **evolve** in the time,
and **react** to these changes.

Actually, you probably already played with such patterns:

- Promise
- ReadableStream from NodeJs
- Events

*SubscribeFunctions* provides a way to lazily *subscribe* on a *push source*,
meaning you control when you want to receive the values, and may properly free de source when it is no more required.

For more details you may read [the rxjs documentation](https://rxjs-dev.firebaseapp.com/guide/observable),
or [this excellent tutorial](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754).

---

### Most basic SubscribeFunction

This library doesn't rely on classes. Instead, it provides a **typing framework**, and many *helper functions*.
This allows very efficient execution time and minification.

Therefore, you may create your first [SubscribeFunction](../types/subscribe-function/subscribe-function.md)
without using any functions from this library, only typing:

```ts
const subscribe: ISubscribeFunction<void> = (emit: IEmitFunction<void>): IUnsubscribeFunction => {
  const timer: any = setInterval(() => emit(), 500);
  return (): void => {
    clearInterval(timer);
  };
};
```

So a *SubscribeFunction* is a function which receives an *EmitFunction* and returns an *UnsubscribeFunction*.

The *[EmitFunction](../types/emit-function/emit-function.md)* is used to send data to the *subscriber* (the caller)
of the *SubscribeFunction*, and the *UnsubscribeFunction* to release any resources, like async tasks or listeners.

In our example, the *SubscribeFunction* creates an interval timer (`setInterval`), and emits void/no value (`emit()`)
when the timer ticks. Then it returns an unsubscribe function, which, when invoked, clears the timer (`clearInterval(timer)`).

The next step is to *subscribe* on this *SubscribeFunction* to receive the values:

```ts
const unsubscribe = subscribe(() => {
  console.log('tick');
});
```

Calling `subscribe` starts the interval timer, and the provided callback (`emit`) will log `tick` every 500ms. 

The last step is to release resources, when we don't want to receive more values, by calling `unsubscribe`:

```ts
// we unsubscribe in 2100ms, this give us the time to see the timer tick 4 times
setTimeout(unsubscribe, 2100);
```

As you may see, it's extremely simple: we didn't even use any functions from this library, only a concept and some typing.


<details>
  <summary>see full code</summary>

```ts
const subscribe: ISubscribeFunction<void> = (emit: IEmitFunction<void>): IUnsubscribeFunction => {
  const timer: any = setInterval(() => emit(), 500);
  return (): void => {
    clearInterval(timer);
  };
};

const unsubscribe = subscribe(() => {
  console.log('tick');
});

setTimeout(unsubscribe, 2100);
```
</details>


**Core concept:**

- May sends many values
- Requires to be subscribed (lazy loaded, so you don't receive values until you explicitly ask for them)
- Must be unsubscribed when it is no more required (properly free resources)

This ensures a clean and efficient allocation and usage of resources for push sources.


#### Built-in SubscribeFunctions

To simplify your work, this lib provides many functions to build *SubscribeFunctions*.
You may find them in the [subscribe-function/from](../subscribe-function/from) folder.
However, the simpler way is to follow the decision tree on the [home page](../../README.md).

[comment]: <> (TODO better link)

Some examples:

- [fromEventTarget](../subscribe-function/from/dom/from-event-target/from-event-target.md):
  creates a SubscribeFunction from an event target, like `window`, or `document.body` for example.
- [of](../subscribe-function/from/others/of/of.md):
  creates a SubscribeFunction from a list of values.
- [interval](../subscribe-function/from/time-related/interval/interval.md):
  creates a SubscribeFunction which ticks at a specific period.
  
---

### Piping to cumulate SubscribeFunctions

An important part of the Observable is their ability to be piped:
the purpose is to chain many Observables to combine their behaviours.

For this, we will use the type [SubscribePipeFunction](../types/subscribe-pipe-function/subscribe-pipe-function.md),
which is nothing more than a unary function accepting a *SubscribeFunction* and returning another.

Let's build a *SubscribePipeFunction* that transmits only **distinct** values (if received value is the same as the previous one, discard it):

```ts
const distinct = <GValue>(subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
  // returns a new SubscribeFunction
  return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
    // defines a previous value
    let previousValue: GValue;
    // subscribes to the provided SubscribeFunction
    return subscribe((value: GValue) => {
      // if the received value differs from the previous one
      if (value !== previousValue) {
        // we replace previousValue with the new value
        previousValue = value;
        // and we emit the value
        emit(value); 
      }
    });
  };
};
```

Creating your own *SubscribePipeFunction* requires that you manage yourself the provided *SubscribeFunction*,
and its *UnsubscribeFunction*. Meaning, you'll need to properly allocate and free the resources.

The *SubscribePipeFunctions* could be used like any ordinary functions (`distinct(of(1, 1, 2))`), but in practice,
there tend to be many of them convolved together, and quickly become unreadable (`op4(op3(op2(op1(obs))))`).
For that reason, we will use the function [pipeSubscribeFunction](../functions/piping/pipe-subscribe-function/pipe-subscribe-function.md)
that accomplishes the same thing while being much easier to read:

```ts
pipeSubscribeFunction(obs, [
  op1,
  op2,
  op3,
  op4,
]);
```

A practical example could be:

```ts
const subscribe = pipeSubscribeFunction(of(-2, -1, 0, 1, 2), [
  filterSubscribePipe<number>((value: number) => (value >= 0)),
  mapSubscribePipe<number, string>((value: number) => value.toString(10)),
]);

const unsubscribe = subscribe((value: string) => {
  console.log(value);
});
```

Which outputs:

```text
0
1
2
```

#### Built-in SubscribePipeFunction

As expected, this library provides many functions to build *SubscribePipeFunction*.
You may find them in the [subscribe-function/subscribe-pipe](../subscribe-function/subscribe-pipe) folder.
However, as previously seen, the simpler way is to follow the decision tree on the [home page](../../README.md).

[comment]: <> (TODO better link)

Some examples:

[comment]: <> (TODO better link)
- [distinctSubscribePipe](../subscribe-function/subscribe-pipe/emit-pipe-related/distinct-subscribe-pipe.ts):
  creates a SubscribePipeFunction which only transmits distinct values.
- [mergeAllSubscribePipe](../subscribe-function/subscribe-pipe/merge-all/merge-all-subscribe-pipe.md)
- [shareSubscribePipe](../subscribe-function/subscribe-pipe/source-related/share-subscribe-pipe.ts)
  
[comment]: <> (TODO better link)
