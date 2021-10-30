[![npm (scoped)](https://img.shields.io/npm/v/@lifaon/rx-js-light.svg)](https://www.npmjs.com/package/@lifaon/rx-js-light)
![npm](https://img.shields.io/npm/dm/@lifaon/rx-js-light.svg)
![NPM](https://img.shields.io/npm/l/@lifaon/rx-js-light.svg)
![npm type definitions](https://img.shields.io/npm/types/@lifaon/rx-js-light.svg)

[comment]: <> (![downloads]&#40;https://img.shields.io/npm/dt/@lifaon/rx-js-light.svg&#41;)

# ⚡ rx-js-light

This library provides tools to generate and consume blazing fast Observables and Observers.

However, it is not RxJS: **it's [faster (~10x), smaller (6~12x)](./src/documentation/performances.md), and tries to be simpler.**
It's so performant and optimized, that you can include it from your smallest to your largest projects.
Give it a try, and you'll love it !

*Example:*

```js
const subscribe = pipeSubscribeFunction(fromEventTarget(window, 'click'), [
  scanSubscribePipe(count => (count + 1), 0),
  filterSubscribePipe(count => (count >= 2)),
]);

const unsubscribe = subscribe(() => {
  console.log('clicked twice');
  unsubscribe();
});
```

[Click here to see the live demo](https://stackblitz.com/edit/typescript-crwffj?devtoolsheight=33&file=index.ts)

## 📖 Table of content

- [Introduction](./src/documentation/tutorial/01-introduction.md)
- [Installation](./src/documentation/tutorial/02-installation.md)
- [Your first Observable](./src/documentation/tutorial/03-your-first-observable.md)
- [Using the built-in Observables](./src/documentation/tutorial/04-using-the-built-in-observables.md)
- [Emitting values using sources](./src/documentation/05-sources.md)
- [Shortcuts for rx-js-light => rx-js-light-shortcuts](./src/documentation/06-rx-js-light-shortcuts.md)
- [A practical example for rx-js-light](./src/documentation/07-practical-example/07-practical-example.md)
- [Notifications replace RxJS events](./src/documentation/08-notifications.md)


## 📦 Installation

```bash
yarn add @lifaon/rx-js-light
# or
npm install @lifaon/rx-js-light --save
```

[Click here to read the installation manual](src/documentation/tutorial/02-installation.md)


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

If you prefer to use shortcuts, you may want to use [rx-js-light-shortcuts](https://github.com/lifaon74/rx-js-light-shortcuts)


## 🔥️ Select the right function

### I want to:

#### create a SubscribeFunction from

- nothing and emit not value: [empty](src/subscribe-function/from/others/empty/empty.md)

- one value
  - already defined: [single](src/subscribe-function/from/others/single/single.md)
  - defined later: [reference](/src/subscribe-function/from/others/reference/reference.md)

- a list of values
  - without notifications: [of](src/subscribe-function/from/others/of/of.md)
  - with notifications: [ofWithNotifications](src/subscribe-function/from/others/of/with-notifications/of-with-notifications.ts)

- an iterable
  - sync
    - array
      - without notifications: [fromArray](src/subscribe-function/from/iterable/sync/from-array/from-array.md)
      - with notifications: [fromArrayWithNotifications](src/subscribe-function/from/iterable/sync/from-array/with-notifications/from-array-with-notifications.md)
    - iterable
      - without notifications: [fromIterable](src/subscribe-function/from/iterable/sync/from-iterable/from-iterable.md)
      - with notifications: [fromIterableWithNotifications](src/subscribe-function/from/iterable/sync/from-iterable/with-notifications/from-iterable-with-notifications.md)
    - iterator ⚠️
      - without notifications: [fromIterator](src/subscribe-function/from/iterable/sync/from-iterator/from-iterator.md)
      - with notifications: [fromIteratorWithNotifications](src/subscribe-function/from/iterable/sync/from-iterator/with-notifications/from-iterator-with-notifications.md)

  - async
    - async iterable: [fromAsyncIterable](src/subscribe-function/from/iterable/async/from-async-iterable/from-async-iterable.md)
    - async iterator ⚠️: [fromAsyncIterator](src/subscribe-function/from/iterable/async/from-async-iterator/from-async-iterator.md)
  
- something related to the DOM
  - an EventTarget: [fromEventTarget](src/subscribe-function/from/dom/from-event-target/from-event-target.md)
  - an IntersectionObserver: [fromIntersectionObserver](src/subscribe-function/from/dom/from-intersection-observer/from-intersection-observer.md)
  - a ResizeObserver: [fromResizeObserver](src/subscribe-function/from/dom/from-resize-observer/from-resize-observer.md)
  - a css @media query: [fromMatchMedia](src/subscribe-function/from/dom/from-match-media/from-match-media.md)
  - the position of the user (Geolocation): [fromGeolocationPosition](src/subscribe-function/from/dom/from-geolocation-position/from-geolocation-position.md)
  
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
  
- one SubscribeFunction
  - defined later: [defer](/src/subscribe-function/from/others/defer/defer.md)
  
- many SubscribeFunctions. When any value is received
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
  - emits after 'ms':
    - without notifications: [timeout](src/subscribe-function/from/time-related/timeout/timeout.md)
    - with notifications: [timeoutWithErrorNotification](src/subscribe-function/from/time-related/timeout/derived/timeout-with-error-notification.ts)
  - emits when idle time is available: [idle](src/subscribe-function/from/time-related/idle/idle.md)
  - emits on each animation frame: [fromAnimationFrame](src/subscribe-function/from/time-related/from-animation-frame/from-animation-frame.md)


#### convert a SubscribeFunction to

- a promise
  - without notifications: [toPromise](src/subscribe-function/to/to-promise/to-promise.md)
  - with notifications:
    - with only the last value: [toPromiseLast](src/subscribe-function/to/to-promise/last/to-promise-last.md)
    - with every value: [toPromiseAll](src/subscribe-function/to/to-promise/all/to-promise-all.md)

#### create a SubscribePipeFunction which

- EmitPipe related
  - emits only distinct received values: [distinctSubscribePipe](src/subscribe-function/subscribe-pipe/emit-pipe-related/distinct-subscribe-pipe.ts)
  - filters received values: [filterSubscribePipe](src/subscribe-function/subscribe-pipe/emit-pipe-related/filter-subscribe-pipe.ts)
  - transforms received values: [mapSubscribePipe](src/subscribe-function/subscribe-pipe/emit-pipe-related/map/map-subscribe-pipe.ts)
  - transforms received values with an accumulator: [scanSubscribePipe](src/subscribe-function/subscribe-pipe/emit-pipe-related/scan-subscribe-pipe.ts)
  - reads received values, and re-emits them without transformations: [tapSubscribePipe](src/subscribe-function/subscribe-pipe/emit-pipe-related/tap-subscribe-pipe.ts)
  - converts an EmitPipeFunction to a SubscribePipeFunction: [emitPipeToSubscribePipe](src/subscribe-function/subscribe-pipe/emit-pipe-related/emit-pipe-to-subscribe-pipe.ts)

- Source related
  - allows one SubscribeFunction to emit its values to many SubscribeFunction: [shareSubscribePipe](src/subscribe-function/subscribe-pipe/source-related/share-subscribe-pipe.ts)

- reduces the order of a SubscribeFunction of SubscribeFunctions
  - [mergeAllSubscribePipe](src/subscribe-function/subscribe-pipe/merge-all/merge-all-subscribe-pipe.md)
  - maps a SubscribeFunction and then reduces the order:
    - once: [mergeMapSingleSubscribePipe](src/subscribe-function/subscribe-pipe/merge-all/merge-map/merge-map-single-subscribe-pipe.ts)
    - many: [mergeMapSubscribePipe](src/subscribe-function/subscribe-pipe/merge-all/merge-map/merge-map-subscribe-pipe.ts)

- accumulates values:
  - until another SubscribeFunction emits: [bufferSubscribePipe](src/subscribe-function/subscribe-pipe/buffer/buffer-subscribe-pipe.md)
  - within a fixed period of time: [bufferTimeSubscribePipe](src/subscribe-function/subscribe-pipe/buffer/buffer-time/buffer-time-subscribe-pipe.md)

- time related
  - [debounceTimeSubscribePipe](src/subscribe-function/subscribe-pipe/time-related/debounce-time/debounce-time-subscribe-pipe.md)
  - [throttleTimeSubscribePipe](src/subscribe-function/subscribe-pipe/time-related/throttle-time/throttle-time-subscribe-pipe.md)
  - [debounceFrameSubscribePipe](src/subscribe-function/subscribe-pipe/time-related/debounce-frame/debounce-frame-subscribe-pipe.md)
  - [debounceImmediateSubscribePipe](src/subscribe-function/subscribe-pipe/time-related/debounce-immediate/debounce-immediate-subscribe-pipe.md)

- logs the state of the upper SubscribeFunction: [logStateSubscribePipe](src/subscribe-function/subscribe-pipe/log-state-subscribe-pipe.ts)


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

## Differences with RxJS:

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
  
