[![npm (scoped)](https://img.shields.io/npm/v/@lifaon/rx-js-light.svg)](https://www.npmjs.com/package/@lifaon/rx-js-light)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@lifaon/rx-js-light.svg)
![npm](https://img.shields.io/npm/dm/@lifaon/rx-js-light.svg)
![NPM](https://img.shields.io/npm/l/@lifaon/rx-js-light.svg)
![npm type definitions](https://img.shields.io/npm/types/@lifaon/rx-js-light.svg)

# ⚡ rx-js-light

This library provides tools to generate and consume blazing fast Observables and Observers.

However, it is not RxJS: **it's faster, smaller, and tries to be simpler.** Give it a try, and you'll love it !  
Because it's extremely light and performant, you may include it even in your smallest projects.


[<img src="https://img.shields.io/badge/-tutorial-brightgreen?style=for-the-badge" />](src/examples/tutorial.md)


If you're not familiar with the concept of Observables you may
check [the rxjs documentation](https://rxjs-dev.firebaseapp.com/guide/observable), or
[this excellent tutorial](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)

The main purpose of Observables is to **react to changes**.

**If anything in your app happens asynchronously, there is a high chance that an Observable will make that easier for you.**

*Example:*

```js
const subscription = new Subscription(
  fromEventTarget(window, 'mousemove'),
  (event) => {
    console.log(event.clientX, event.clientY);
  },
);

const subscribe = fromEventTarget(window, 'click');

subscribe(() => {
  subscription.toggle();
});
```

This example displays the mouse position, with an *activate / deactivate* mechanism when we click.

Differences with RxJS:

- no classes: this choice allows blazing fast performances and very small bundle size. Indeed, creating a class with
  the `new` keyword is slow, and method names can't be mangled (minimized), where function calls are really well
  optimized by javascript engines. However, it has a minor cost: chaining operators or method calls are done through
  functions, which is a little less elegant (in terms of code readability).

- no `next`, `complete` and `error`: instead this lib use [notifications](src/misc/notifications/notifications.md).
  In reality, not all *Observables* require to emit a final state. For example, the RxJS `interval`
  never reaches a `complete` state. It just sends numbers. Moreover, some *Observables* may want to emit more
  than this 3 *events*: we may imagine an XHR
  Observable which emits an `upload-progress` and `download-progress` *events*.

- some concepts / operators / methods may have a different behaviour or name.
  Take care to read the documentation before any hasty use.
  

## 📦 Installation

```bash
yarn add @lifaon/rx-js-light
# or
npm install @lifaon/rx-js-light --save
```

This library supports:

- **common-js** (require): transpiled as es5, with .cjs extension, useful for old nodejs versions
- **module** (esm import): transpiled as esnext, with .mjs extension (requires node resolution for external packages)

In a **node** environment the library works immediately (no extra tooling required),
however, in a **browser** environment, you'll need to resolve external imports thought a bundler like
[snowpack](https://www.snowpack.dev/),
[rollup](https://rollupjs.org/guide/en/),
[webpack](https://webpack.js.org/),
etc...
or directly using [skypack](https://www.skypack.dev/):
[https://cdn.skypack.dev/@lifaon/rx-js-light](https://cdn.skypack.dev/@lifaon/rx-js-light)

**INFO:** you won't be able to directly measure the size of this library
(ex: [bundlephobia](https://bundlephobia.com/)) as it has been optimized for tree-shacking and minification.
No bundle is shipped with this lib: this ensures you properly optimize your project.
If you only use typings, the lib will be 0 bytes, if you use only one function, only this one will be included, etc...
So the size of this library will always be optimal. [You may find an example here](src/examples/example03.md)


## 📕 Documentation

- [SubscribeFunction](src/types/subscribe-function/subscribe-function.md) (ak: Observable)
- [EmitFunction](src/types/emit-function/emit-function.md) (ak: Observer)
- [SubscribePipeFunction](src/types/subscribe-pipe-function/subscribe-pipe-function.md) (ak: Pipeable Operator)
- [pipeSubscribeFunction](src/functions/piping/pipe-subscribe-function/pipe-subscribe-function.md) (ak: Observable.pipe)
- [pipeSubscribePipeFunctions](src/functions/piping/pipe-subscribe-pipe-functions/pipe-subscribe-pipe-functions.md) (ak: pipe function)
- [Notification](src/misc/notifications/notifications.md) (ak: *next*, *complete* and *error*)
- [MulticastSource](src/source/multicast-source/multicast-source.md) (ak: Subject)
- [ReplayLastSource](src/source/replay-last-source/replay-last-source.md) (ak: BehaviorSubject)
- [Subscription](src/misc/subscription/subscription.md) (kind of: Subscription)

Most of public functions or interfaces have their own documentation into a `.md` file in their respective directories. 

## 🔥️ Select the right function

### I want to:

#### create a SubscribeFunction from

- an iterable
  - sync
    - array:
      - without notifications: [fromArray](src/subscribe-function/from/iterable/sync/from-array/from-array.md)
      - with notifications: [fromArrayWithNotifications](src/subscribe-function/from/iterable/sync/from-array/with-notifications/from-array-with-notifications.md)
    - iterable:
      - without notifications: [fromIterable](src/subscribe-function/from/iterable/sync/from-iterable/from-iterable.md)
      - with notifications: [fromIterableWithNotifications](src/subscribe-function/from/iterable/sync/from-iterable/with-notifications/from-iterable-with-notifications.md)
    - iterator ⚠️:
      - without notifications: [fromIterator](src/subscribe-function/from/iterable/sync/from-iterator/from-iterator.md)
      - with notifications: [fromIteratorWithNotifications](src/subscribe-function/from/iterable/sync/from-iterator/with-notifications/from-iterator-with-notifications.md)

  - async
    - async iterable: [fromAsyncIterable](src/subscribe-function/from/iterable/async/from-async-iterable/from-async-iterable.md)
    - async iterator ⚠️: [fromAsyncIterator](src/subscribe-function/from/iterable/async/from-async-iterator/from-async-iterator.md)

- (something related to the DOM)
  - an EventTarget: [fromEventTarget](src/subscribe-function/from/dom/from-event-target/from-event-target.md)
  - an IntersectionObserver: [fromIntersectionObserver](src/subscribe-function/from/dom/from-intersection-observer/from-intersection-observer.md)
  - an ResizeObserver: [fromResizeObserver](src/subscribe-function/from/dom/from-resize-observer/from-resize-observer.md)
  - a css @media query: [fromMatchMedia](src/subscribe-function/from/dom/from-match-media/from-match-media.md)
  
- a list of values:
  - without notifications: [of](src/subscribe-function/from/others/of/of.md)
  - with notifications: [ofWithNotifications](src/subscribe-function/from/others/of/with-notifications/of-with-notifications.ts)

- a promise
  - with a factory: [fromPromiseFactory](src/subscribe-function/from/promise/from-promise-factory/from-promise-factory.md)
  - without a factory ⚠️: [fromPromise](src/subscribe-function/from/promise/from-promise/from-promise.md)

- a readable stream
  - [w3c streams](https://streams.spec.whatwg.org/#rs-class)
    - readable stream: [fromReadableStream](src/subscribe-function/from/readable-stream/w3c/from-readable-stream/from-readable-stream.md)
    - readable stream reader ⚠: [fromReadableStreamReader](src/subscribe-function/from/readable-stream/w3c/from-readable-stream-reader/from-readable-stream-reader.md)
  - nodejs: TODO

- an http request
  - using fetch: [fromFetch](src/subscribe-function/from/http/from-fetch/from-fetch.md)
  - using xhr: [fromXHR](src/subscribe-function/from/http/xhr/from-xhr/from-xhr.md)
  
- a blob (reads content): [readBlob](src/subscribe-function/from/dom/read-blob/read-blob.md)
  
- many subscribe functions. When any value is received:
  - re-emit it concurrently: [merge](src/subscribe-function/from/many/merge/merge.ts)
  - combine the values in an array and emit it: [combineLatest](src/subscribe-function/from/many/combine-latest/combine-latest.md)
  - combine the values in an array, runs a function with these values, and emit distinct returned
    values: [reactiveFunction](src/subscribe-function/from/many/reactive-function/reactive-function.md)
    - arithmetic:
      [reactiveAdd](src/subscribe-function/from/many/reactive-function/built-in/arithmetic/reactive-add.ts),
      [reactiveSubtract](src/subscribe-function/from/many/reactive-function/built-in/arithmetic/reactive-subtract.ts),
      [reactiveMultiply](src/subscribe-function/from/many/reactive-function/built-in/arithmetic/reactive-multiply.ts),
      [reactiveDivide](src/subscribe-function/from/many/reactive-function/built-in/arithmetic/reactive-divide.ts)
    - logic:
      [reactiveAnd](src/subscribe-function/from/many/reactive-function/built-in/logic/reactive-and.ts),
      [reactiveOr](src/subscribe-function/from/many/reactive-function/built-in/logic/reactive-or.ts),
      [reactiveNot](src/subscribe-function/from/many/reactive-function/built-in/logic/reactive-not.ts)
    - comparison:
      [reactiveEqual](src/subscribe-function/from/many/reactive-function/built-in/comparison/reactive-equal.ts),
      [reactiveNotEqual](src/subscribe-function/from/many/reactive-function/built-in/comparison/reactive-not-equal.ts),
      [reactiveGreaterThan](src/subscribe-function/from/many/reactive-function/built-in/comparison/reactive-greater-than.ts),
      [reactiveGreaterThanOrEqual](src/subscribe-function/from/many/reactive-function/built-in/comparison/reactive-greater-than-or-equal.ts),
      [reactiveLowerThan](src/subscribe-function/from/many/reactive-function/built-in/comparison/reactive-lower-than.ts),
      [reactiveLowerThanOrEqual](src/subscribe-function/from/many/reactive-function/built-in/comparison/reactive-lower-than-or-equal.ts)
    - string:
      [reactiveTemplateString](src/subscribe-function/from/many/reactive-function/built-in/string/reactive-template-string.ts)

- time related
  - emits every 'ms': [interval](src/subscribe-function/from/time-related/interval/interval.md)
  - emits when idle time is available: [idle](src/subscribe-function/from/time-related/idle/idle.md)

#### convert a SubscribeFunction to

- a promise:
  - without notifications: [toPromise](src/subscribe-function/to/to-promise/to-promise.md)
  - with notifications:
    - with only the last value: [toPromiseLast](src/subscribe-function/to/to-promise/last/to-promise-last.md)
    - with every value: [toPromiseAll](src/subscribe-function/to/to-promise/all/to-promise-all.md)

#### create a SubscribePipeFunction which

- emits only distinct received values: [distinctSubscribePipe](src/subscribe-function/subscribe-pipe/emit-pipe-related/distinct-subscribe-pipe.ts)
- filters received values: [filterSubscribePipe](src/subscribe-function/subscribe-pipe/emit-pipe-related/filter-subscribe-pipe.ts)
- transforms received values: [mapSubscribePipe](src/subscribe-function/subscribe-pipe/emit-pipe-related/map/map-subscribe-pipe.ts)
- reads received values, and re-emits them without transformations: [tapSubscribePipe](src/subscribe-function/subscribe-pipe/emit-pipe-related/tap-subscribe-pipe.ts)
- allows one SubscribeFunction to emit its values to many SubscribeFunction: [shareSubscribePipe](src/subscribe-function/subscribe-pipe/source-related/share-subscribe-pipe.ts)
- reduce the order of a SubscribeFunction of SubscribeFunctions: [mergeAllSubscribePipe](src/subscribe-function/subscribe-pipe/merge-all/merge-all-subscribe-pipe.md)
- map a SubscribeFunction and reduce the order of a SubscribeFunction of SubscribeFunctions: [mergeMapSubscribePipe](src/subscribe-function/subscribe-pipe/merge-all/merge-map/merge-map-subscribe-pipe.ts)

[comment]: <> (TODO better tree for source-related folder)


#### emit a value myself => create a Source which emits values to

- multiple EmitFunctions: [createMulticastSource](src/source/multicast-source/multicast-source.md)
- only one EmitFunction: [createUnicastSource](src/source/unicast-source/unicast-source.md)
- one or many EmitFunction and stores the last emitted value:
  [createReplayLastSource](src/source/replay-last-source/replay-last-source.md),
  [createMulticastReplayLastSource](src/source/replay-last-source/derived/create-multicast-replay-last-source.ts),
  [createUnicastReplayLastSource](src/source/replay-last-source/derived/create-unicast-replay-last-source.ts)

#### others

- chain many SubscribePipeFunctions: [pipeSubscribePipeFunctions](src/functions/piping/pipe-subscribe-pipe-functions/pipe-subscribe-pipe-functions.md)
- chain many SubscribePipeFunctions with a
  SubscribeFunction: [pipeSubscribeFunction](src/functions/piping/pipe-subscribe-function/pipe-subscribe-function.md)



Can't find a function that suits your needs ? Open a discussion, or create your own and share it !

