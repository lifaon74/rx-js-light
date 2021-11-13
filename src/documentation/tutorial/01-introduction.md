# Introduction

rx-js-light is a library to build and compose asynchronous and event-based programs.

**[Learning it is hard](https://dev.to/mfcodeworks/comment/11agc)**. When I started using RxJS, it was a nightmare: lack of tutorials,
cryptic documentation, lack of use cases and examples. The real difficulty comes from two facts: we must **think in reactive**, and we must
read the documentation of each function (at least fastly), because they are the essential bricks of reactive programming. Your brain have
work in a different paradigm.


## What is Reactive Programming?

> Reactive programming is programming with asynchronous data streams.

Actually, this it's new:

- Promises are streams of values with a `success` and `error` state, and you can "pipe" them with `then` or `catch`
- EventListeners are streams of events
- Timers (setTimeout/setInterval) are somehow streams of "void" values
- [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)
  and [Readable](https://nodejs.org/api/stream.html#class-streamreadable) are data streams too
- websockets
- ...

So, you've already played with asynchronous data streams. Reactive programing is all about this but on steroids.
You'll be able to create data streams of anything, not just from click and hover events:
variables, user inputs, properties, tasks, data structures,...

**On top of that, you are given an amazing toolbox of functions to combine, create and filter any of those streams.**
That's where the "functional" magic kicks in. A stream can be used as an input to another one. Even multiple streams can be used as inputs
to another stream. You can merge two streams. You can filter a stream to get another one that has only those events you are interested in.
You can map data values from one stream to another new one.

A stream is a sequence of **ongoing values ordered in time**.

We capture these emitted values only **asynchronously**, by defining a function that will execute when a value is emitted.
The "listening" to the stream is called **subscribing**.
The functions we are defining are *Observers*. The stream is the *Observable* being observed.

**INFO:** rx-js-light use a different terminology a *Observable* is an *Observable* and an *Observer* is an *Observer*.
Their functionalities are identical, only the name differs and can be interchanged.

## Reactive Programming by example

Normally you'll register event listeners like this:

```js
document.addEventListener('click', () => console.log('clicked'));
```

Using rx-js-light you create an Observable instead:

```js
fromEvent(document, 'click')(() => console.log('Clicked!'));
```

Moreover, with reactive programing, you take control of the flow of your values.

In classic js:

```js
let count = 0;
let rate = 1000;
let lastClick = Date.now() - rate;
document.addEventListener('click', () => {
  if (Date.now() - lastClick >= rate) {
    console.log(`clicked ${++count} times`);
    lastClick = Date.now();
  }
});
```

With rx-js-light:

```js
const subscribe = pipeObservable(fromEvent(document, 'click'), [
  throttleTimeObservablePipe(1000),
  scanObservablePipe(count => count + 1, 0),
]);
subscribe(count => console.log(`clicked ${count} times`));
```

I hope you enjoy the beauty of this approach.
This example is just the tip of the iceberg: you can apply the same operations on different kinds of streams,
for instance, on a stream of API responses; on the other hand, there are many other functions available.

## Why should you consider adopting RP?

Reactive Programming raises the level of abstraction of your code, so you can focus on the interdependence of events that define the
business logic, rather than having to constantly fiddle with a large amount of implementation details. Code in RP will likely be more
concise.

The benefits are really important in web applications, where you have to deal with multitude of UI events, async requests, etc... and react
to these changes, like updating the DOM.

---

This introduction is largely inspired by [this article](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754) from Andre Staltz.
Take a look, it goes deeply into RP.

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


