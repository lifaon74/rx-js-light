# Your first Observable

The following tutorial will teach you the basics: what is an Observable and an Observer, what is the logic behind, etc...
We will start using only typing. The rx-js-light function will be used later.

## Definition of an Observer

So, the first thing to do, is to define what is an [Observer](../../observer/type/observer.md):

```ts
interface IObserver<GValue> {
  (value: GValue): void;
}
```

An *Observer* is simply a function that receives and consumes a value. Nothing more.
Its purpose is to collect the values sent by an Observable.

Here's an example of an *Observer* that logs its incoming values:

```ts
const observer: IObserver<number> = (value: number): void => {
  console.log('value:', value);
};
```

Really simple, isn't it ?

## Definition of an Observable

An Observable is an asynchronous stream of values. You subscribe to it, and it will send you its data.

Let's define the [Observable](../../observable/type/observable.md):

```ts
interface IObservable<GValue> {
  (emit: IObserver<GValue>): IUnsubscribe;
}

interface IUnsubscribe {
  (): void;
}
```

A *Observable* is a function that receives an *Observer* (used to emit some values, here `emit`),
and returns an *UnsubscribeFunction* (used to notify the Observable to stop sending these values).

Here's an example of an *Observable* that emits numbers (an incremented value) every 500ms:

```ts
const observable: IObservable<number> = (emit: IObserver<number>): IUnsubscribe => {
  let count: number = 0;
  const timer: any = setInterval(() => emit(count++), 500);
  return (): void => {
    clearInterval(timer);
  };
};
```

To build your own Observable, you have to follow this pattern:

- create a function that receives an `emit` argument
- use `emit` to send some values
- and return a function which when called must free resources, and stop the Observable from sending values

## Subscribing to an Observable using an Observer

To read the values of an Observable we just have to write:

```ts
const unsubscribe = observable(observer);
```

The Observable will receive the Observer (the `emit` argument), and will start to send its values into this Observer.

It will output:

```text
value: 0
value: 1
value: 2
value: 3
...
```

Then, when we want to dispose of the *Subscription*, we simply have to call the returned function (in our case `unsubscribe`):

```ts
unsubscribe(); // free resources, and stop to emit values
```

[Click here to see the live demo](https://stackblitz.com/edit/typescript-z84bj8?devtoolsheight=33&file=index.ts)

At this point, you should consider that it's pretty simple: you just provided a callback to a function... nothing extraordinary.
This is where rx-js-light shines: it's simple by design, making it excessively fast and optimized by js engines.

## Piping

### Definition of an ObservablePipe

Ok, let's go for the more complicated part: chaining and piping observables.

Here's the definition of an [ObservablePipe](../../observable/pipes/type/observable-pipe.md):

```ts
interface IObservablePipe<GIn, GOut> {
  (subscribe: IObservable<GIn>): IObservable<GOut>;
}
```

A *ObservablePipe* is a function that accepts a *Observable* as input (the `subscribe` argument), and returns another 
*Observable* as output. Both are related by an algorithm defined internally into the *ObservablePipe*.

As an example, here's a *ObservablePipe* that emits only distinct received values:

```ts
const distinct = <GValue>(subscribe: IObservable<GValue>): IObservable<GValue> => {
  return (emit: IObserver<GValue>): IUnsubscribe => {
    let previousValue: GValue;
    return subscribe((value: GValue): void => {
      if (value !== previousValue) {
        previousValue = value;
        emit(value);
      }
    });
  };
}
```

<details>
  <summary>with some comments</summary>

  ```ts
  const distinct = <GValue>(subscribe: IObservable<GValue>): IObservable<GValue> => {
  // returns a new Observable
  return (emit: IObserver<GValue>): IUnsubscribe => {
    // defines a previous value
    let previousValue: GValue;
    // subscribes to the provided Observable
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

</details>

Then we may use our new *ObservablePipe* like this:

```ts
const newObservable = distinct(observable);
const unsubscribe = newObservable(observer);
```

[Click here to see the live demo](https://stackblitz.com/edit/typescript-y9g9fd?devtoolsheight=33&file=index.ts)

### Chaining many ObservablePipes

An *ObservablePipe* could be used directly like any ordinary functions (`distinct(observable)`), but in practice, there
tend to be many of them convolved together, and quickly become unreadable (`op4(op3(op2(op1(obs))))`). For that reason,
we will use the function [pipeObservable](../../observable/helpers/piping/pipe-observable/pipe-observable.md)
that accomplishes the same thing while being much easier to read:

```ts
pipeObservable(obs, [
  op1,
  op2,
  op3,
  op4,
]);
```

This function simply does:

```ts
[op1, op2, op3, op4].reduce((value, fnc) => fnc(value), obs);
```

You can group your ObservablePipes too using [pipeObservablePipes](../../observable/helpers/piping/pipe-observable-pipes/pipe-observable-pipes.md)

---

## Table of content

- [Introduction](./01-introduction.md)
- [Installation](./02-installation.md)
- [Your first Observable](./03-your-first-observable.md)
- [Using the built-in Observables](./04-using-the-built-in-observables.md)
- [Emitting values using sources](./05-sources.md)
- [Shortcuts](./06-rx-js-light-shortcuts.md)
- [A practical example for rx-js-light](./07-practical-example/07-practical-example.md)
- [Notifications replace RxJS events](./08-notifications.md)

