# Using the built-in Observables

So at this point, you know what is an Observable, an Observer and a Pipeable Operator.
Now, it's time to use the power of rx-js-light, and all the Observables it provides to you.

## setInterval

Ok let's start with a simple example: sometimes, you have to refresh some data within a specific period.

```ts
const timer = setInterval(() => {
  console.log('tick');
}, 500);

setTimeout(() => {
  clearInterval(timer);
}, 2000);
```

Instead of using `setInterval` and `clearInterval`, we will use the `interval` function. It creates for us an Observable,
which emits an "empty" value (`emit()`) every `X` ms.

Here is the equivalent with Observables:

```ts
const unsubscribe = interval(500)(() => {
  console.log('tick');
});

timeout(2000)(unsubscribe);
```

[Click here to see the live demo](https://stackblitz.com/edit/typescript-9swej8?devtoolsheight=33&file=index.ts),
and [here for the documentation](../../subscribe-function/from/time-related/interval/interval.md).

## addEventListener

What about addEventListener ?

Let's create a piece of code that counts the number of number clicks, and displays 'clicked twice'
when use user clicked twice on the window.

```ts
let count: number = 0;

const callback = () => {
  count++;
  console.log(`clicked: ${count}`);
  if (count >= 2) {
    window.removeEventListener('click', callback);
    console.log('clicked twice');
  }
};

window.addEventListener('click', callback);
```

Here is the equivalent with Observables:

```ts
const subscribe = pipeSubscribeFunction(fromEventTarget(window, 'click'), [
  scanSubscribePipe(count => (count + 1), 0),
  filterSubscribePipe(count => (count >= 2)),
]);

const unsubscribe = subscribe(() => {
  console.log('clicked twice');
  unsubscribe();
});
```

[Click here to see the live demo](https://stackblitz.com/edit/typescript-crwffj?devtoolsheight=33&file=index.ts), 
and [here for the documentation](../../subscribe-function/from/dom/from-event-target/from-event-target.md).

Ouch, a bunch of new functions:

- `fromEventTarget` creates an Observable from an EventTarget
- `scanSubscribePipe` creates a Pipeable Operator that "accumulates" a value => here it counts the number of time it received a value
- `filterSubscribePipe` creates a Pipeable Operator that re-emits the received value only if it passes a condition
  => here it emits only values greater or equal than 2
- `pipeSubscribeFunction` builds on Observable that, in out case, uses the Observable `fromEventTarget` and 2 Pipeable Operators


## Creating an Observable from a list of values

The `of` Observables does this:

```ts
const subscribe = pipeSubscribeFunction(of(1, 1, 2, 3, 4, 4, 5), [
  distinctSubscribePipe(),
]);

subscribe((value) => {
  console.log(value);
});
```

[Click here for the documentation](../../subscribe-function/from/others/of/of.md).

## Others Observables and Pipeable Operators

Ok, here comes the difficult part: to be efficient with rx-js-light (and Reactive Programing in general),
**you HAVE to learn the basic functions**. If you skip this part, you'll definitively struggle with RP.
I know, it's a pain. But it's like any other framework: you'll be more productive if you take an hour (or a few) reading the documentation,
before jumping in coding.

rx-js-light provides many functions to help you to build and pipe some Observables.
You can find all of them on the [home page](../../../README.md)

---

## Table of content

- [Introduction](./01-introduction.md)
- [Installation](./02-installation.md)
- [Your first Observable](./03-your-first-observable.md)
- [Using the built-in Observables](./04-using-the-built-in-observables.md)
- [Emitting values using sources](./05-sources.md)
- [Shortcuts for rx-js-light => rx-js-light-shortcuts](./06-rx-js-light-shortcuts.md)
- [A practical example for rx-js-light](./07-practical-example/07-practical-example.md)
- [Notifications replace RxJS events](./08-notifications.md)


