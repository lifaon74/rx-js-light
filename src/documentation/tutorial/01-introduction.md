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
- Timers (setTimeout/setInterval) are somehow streams of "void/empty" values
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
You can map data values from one stream to another new one. Etc.

A stream is a sequence of **ongoing values ordered in time**.

We capture these emitted values only **asynchronously**, by defining a function that will execute when a value is emitted.
The "listening" to the stream is called **subscribing**.
The functions we are defining are *Observers*. The stream is the *Observable* being observed.

## Reactive Programming by example

Normally you'll register event listeners like this:

```js
const cb = () => console.log('clicked');
document.addEventListener('click', cb);
document.removeEventListener('click', cb);
```

Using rx-js-light you create an Observable instead:

```js
const observable$ = fromEventTarget(document, 'click');
const unsubscribe = observable$(() => console.log('Clicked!'));
unsubscribe();
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
const subscribe = pipeObservable(fromEventTarget(document, 'click'), [
  throttleTimeObservablePipe(1000),
  scanObservablePipe(count => count + 1, 0),
]);
subscribe(count => console.log(`clicked ${count} times`));
```

I hope you enjoy the beauty of this approach.
This example is just the tip of the iceberg: you can apply the same operations on different kinds of streams,
for instance, on a stream of API responses; on the other hand, there are many other functions available.

## For what usage RP is great ?

Usually, when we use variables and functions, we **PULL** values:

```ts
let firstname = 'Valentin';
let lastname = 'Richard';
const fullname = `${firstname} ${lastname}`; // you 'PULL' the values from 'firstname' and 'lastname' to compute 'fullname'
console.log(fullname); // 'Valentin Richard'
```

But, sometimes (especially in javascript with a lot of async events, or in front-end applications) we have to deal with evolving values:
If we update the value of `firstname` or `lastname`, we would like to update the value of `fullname` too.

We could write:

```ts
const getFullName = () => `${firstname} ${lastname}`;
console.log(getFullName()); // 'Valentin Richard'
firstname = `Bob`;
console.log(getFullName()); // 'Bob Richard'
```

But we're forced to **PULL** the "fullname" to get the value. It would be more convenient having `fullname`
updating automatically when any of `firstname` or `lastname` changes.

Here comes the Observables:


```ts
const firstname$ = createTextInputObservable('Valentin');
const lastname$ = createTextInputObservable('Richard');
const fullname$ = string$$`${firstname$} ${lastname$}`;

fullname$((fullname) => {
  console.log(fullname);
});
```

If `firstname$` or `lastname$` changes, then `fullname$` is immediately updated.
So Observables **PUSHES** values. We don't have to **PULL** them. It's magic, and it's perfect for all async events.

[You can test this code here](https://stackblitz.com/edit/typescript-psdoti?file=index.ts)


## Why should you consider adopting RP ?

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
- [Migrating from rxjs to rx-js-light](./09-migrating-from-rxjs-to-rx-js-light.md)
- [From Promise to rx-js-light](./10-from-promise-to-rx-js-light.md)


