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
const subscribe = pipeObservable(fromEventTarget(window, 'click'), [
  scanObservablePipe(count => (count + 1), 0),
  filterObservablePipe(count => (count >= 2)),
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
- [Emitting values using sources](./src/documentation/tutorial/05-sources.md)
- [Shortcuts](./src/documentation/tutorial/06-rx-js-light-shortcuts.md)
- [A practical example for rx-js-light](./src/documentation/tutorial/07-practical-example/07-practical-example.md)
- [Notifications replace RxJS events](./src/documentation/tutorial/08-notifications.md)


## 📦 Installation

```bash
yarn add @lifaon/rx-js-light
# or
npm install @lifaon/rx-js-light --save
```

[Click here to read the installation manual](src/documentation/tutorial/02-installation.md)


## 📕 Documentation

- [Observable](src/observable/type/observable.md)
- [Observer](src/observer/type/observer.md)
- [ObservablePipe](src/observable/pipes/type/observable-pipe.md) (ak: Pipeable Operator)
- [pipeObservable](src/observable/helpers/piping/pipe-observable/pipe-observable.md) (ak: Observable.pipe)
- [pipeObservablePipes](src/observable/helpers/piping/pipe-observable-pipes/pipe-observable-pipes.md) (ak: pipe function)
- [Notification](src/misc/notifications/notifications.md) (ak: *next*, *complete* and *error*)
- [MulticastSource](src/observer-observable-pair/build-in/source/built-in/multicast-source/multicast-source.md) (ak: Subject)
- [ReplayLastSource](src/observer-observable-pair/build-in/source/built-in/replay-last-source/replay-last-source.md) (ak: BehaviorSubject)
- [Subscription](src/misc/subscription/subscription.md) (kind of: Subscription)

Most of public functions or interfaces have their own documentation into a `.md` file in their respective directories.

## 🔥️ Select the right function

### I want to:

#### create an Observable from

*without notifications*

- nothing and emit no value: [empty](src/observable/built-in/from/without-notifications/values/empty/empty.md)
  
- one value
  - already defined: [single](src/observable/built-in/from/without-notifications/values/single/single.md)
  - defined later: [reference](/src/observable/built-in/from/without-notifications/values/reference/reference.md) 
    
- a list of values: [of](src/observable/built-in/from/without-notifications/values/of/of.md)

- an iterable
  - array: [fromArray](src/observable/built-in/from/without-notifications/iterable/from-array/from-array.md)
  - iterable: [fromIterable](src/observable/built-in/from/without-notifications/iterable/from-iterable/from-iterable.md)
  - iterator ⚠️: [fromIterator](src/observable/built-in/from/without-notifications/iterable/from-iterator/from-iterator.md)

- something related to the DOM
  - an EventTarget: [fromEventTarget](src/observable/built-in/from/without-notifications/dom/from-event-target/from-event-target.md)
  - an IntersectionObserver: [fromIntersectionObserver](src/observable/built-in/from/without-notifications/dom/from-intersection-observer/from-intersection-observer.md)
  - a ResizeObserver: [fromResizeObserver](src/observable/built-in/from/without-notifications/dom/from-resize-observer/from-resize-observer.md)
  - a css @media query: [fromMatchMedia](src/observable/built-in/from/without-notifications/dom/from-match-media/from-match-media.md)

- one Observable
  - defined later: [defer](/src/observable/built-in/from/without-notifications/values/defer/defer.md)

- many Observables. When any value is received
  - re-emit it concurrently: [merge](src/observable/built-in/from/without-notifications/many-observables/merge/merge.ts)
  - combine the values in an array and emit it: [combineLatest](src/observable/built-in/from/without-notifications/many-observables/combine-latest/combine-latest.md)
  - combine the values in an array, runs a function with these values, and emit distinct returned
    values: [reactiveFunction](src/observable/built-in/from/without-notifications/many-observables/reactive-function/reactive-function.md)
    - arithmetic:
      [reactiveAdd](src/observable/built-in/from/without-notifications/many-observables/reactive-function/built-in/arithmetic/add/reactive-add.ts),
      [reactiveSubtract](src/observable/built-in/from/without-notifications/many-observables/reactive-function/built-in/arithmetic/subtract/reactive-subtract.ts),
      [reactiveMultiply](src/observable/built-in/from/without-notifications/many-observables/reactive-function/built-in/arithmetic/multiply/reactive-multiply.ts),
      [reactiveDivide](src/observable/built-in/from/without-notifications/many-observables/reactive-function/built-in/arithmetic/divide/reactive-divide.ts)
    - logic:
      [reactiveAnd](src/observable/built-in/from/without-notifications/many-observables/reactive-function/built-in/logic/and/reactive-and.ts),
      [reactiveOr](src/observable/built-in/from/without-notifications/many-observables/reactive-function/built-in/logic/or/reactive-or.ts),
      [reactiveNot](src/observable/built-in/from/without-notifications/many-observables/reactive-function/built-in/logic/not/reactive-not.ts)
    - comparison:
      [reactiveEqual](src/observable/built-in/from/without-notifications/many-observables/reactive-function/built-in/comparison/equal/reactive-equal.ts),
      [reactiveNotEqual](src/observable/built-in/from/without-notifications/many-observables/reactive-function/built-in/comparison/not-equal/reactive-not-equal.ts),
      [reactiveGreaterThan](src/observable/built-in/from/without-notifications/many-observables/reactive-function/built-in/comparison/greater-than/reactive-greater-than.ts),
      [reactiveGreaterThanOrEqual](src/observable/built-in/from/without-notifications/many-observables/reactive-function/built-in/comparison/greater-than-or-equal/reactive-greater-than-or-equal.ts),
      [reactiveLowerThan](src/observable/built-in/from/without-notifications/many-observables/reactive-function/built-in/comparison/lower-than/reactive-lower-than.ts),
      [reactiveLowerThanOrEqual](src/observable/built-in/from/without-notifications/many-observables/reactive-function/built-in/comparison/lower-than-or-equal/reactive-lower-than-or-equal.ts)
    - string:
      [reactiveTemplateString](src/observable/built-in/from/without-notifications/many-observables/reactive-function/built-in/string/reactive-template-string.ts)

- *time related*
  - emits every 'ms': [interval](src/observable/built-in/from/without-notifications/time-related/interval/interval.md)
  - emits after 'ms': [timeout](src/observable/built-in/from/without-notifications/time-related/timeout/timeout.md)
    - with an error notification: [timeoutWithErrorNotification](src/observable/built-in/from/without-notifications/time-related/timeout/derived/timeout-with-error-notification.ts)
  - emits when idle time is available: [idle](src/observable/built-in/from/without-notifications/time-related/idle/idle.md)
  - emits on each animation frame: [fromAnimationFrame](src/observable/built-in/from/without-notifications/time-related/from-animation-frame/from-animation-frame.md)



*with notifications*

- a list of values: [ofWithNotifications](src/observable/built-in/from/with-notifications/values/of/of-with-notifications.ts)

- an iterable
  - sync
    - array: [fromArrayWithNotifications](src/observable/built-in/from/with-notifications/iterable/sync/from-array/from-array-with-notifications.md)
    - iterable: [fromIterableWithNotifications](src/observable/built-in/from/with-notifications/iterable/sync/from-iterable/from-iterable-with-notifications.md)
    - iterator ⚠️: [fromIteratorWithNotifications](src/observable/built-in/from/with-notifications/iterable/sync/from-iterator/from-iterator-with-notifications.md)

  - async
    - async iterable: [fromAsyncIterable](src/observable/built-in/from/with-notifications/iterable/async/from-async-iterable/from-async-iterable.md)
    - async iterator ⚠️: [fromAsyncIterator](src/observable/built-in/from/with-notifications/iterable/async/from-async-iterator/from-async-iterator.md)
  
- something related to the DOM
  - the position of the user (Geolocation): [fromGeolocationPosition](src/observable/built-in/from/with-notifications/dom/from-geolocation-position/from-geolocation-position.md)
  
- a promise
  - with a factory: [fromPromiseFactory](src/observable/built-in/from/with-notifications/promise/from-promise-factory/from-promise-factory.md)
  - without a factory ⚠️: [fromPromise](src/observable/built-in/from/with-notifications/promise/from-promise/from-promise.md)

- a readable stream
  - [w3c streams](https://streams.spec.whatwg.org/#rs-class)
    - readable stream: [fromReadableStream](src/observable/built-in/from/with-notifications/readable-stream/w3c/from-readable-stream/from-readable-stream.md)
    - readable stream reader ⚠: [fromReadableStreamReader](src/observable/built-in/from/with-notifications/readable-stream/w3c/from-readable-stream-reader/from-readable-stream-reader.md)
  - nodejs: TODO

- an http request
  - using fetch: [fromFetch](src/observable/built-in/from/with-notifications/http/from-fetch/from-fetch.md)
  - using xhr: [fromXHR](src/observable/built-in/from/with-notifications/http/xhr/from-xhr/from-xhr.md)
  
- a blob (reads content): [readBlob](src/observable/built-in/from/with-notifications/dom/read-blob/read-blob.md)


#### convert an Observable to

*without notifications*

- a promise: [toPromise](src/observable/built-in/to/without-notifications/promise/to-promise.md)

*with notifications*

- a promise
  - with only the last value: [toPromiseLast](src/observable/built-in/to/with-notifications/promise/last/to-promise-last.md)
  - with every value: [toPromiseAll](src/observable/built-in/to/with-notifications/promise/all/to-promise-all.md)

#### create an ObservablePipe which

- *ObserverPipe related*
  - emits only distinct received values: [distinctObservablePipe](src/observable/pipes/built-in/without-notifications/observer-pipe-related/distinct/distinct-observable-pipe.ts)
  - filters received values: [filterObservablePipe](src/observable/pipes/built-in/without-notifications/observer-pipe-related/filter/filter-observable-pipe.ts)
  - transforms received values: [mapObservablePipe](src/observable/pipes/built-in/without-notifications/observer-pipe-related/map/map-observable-pipe.ts)
  - transforms and filter received values: [mapFilterObservablePipe](src/observable/pipes/built-in/without-notifications/observer-pipe-related/map-filter/map-filter-observable-pipe.ts)
  - transforms received values with an accumulator: [scanObservablePipe](src/observable/pipes/built-in/without-notifications/observer-pipe-related/scan/scan-observable-pipe.ts)
  - reads received values, and re-emits them without transformations: [tapObservablePipe](src/observable/pipes/built-in/without-notifications/observer-pipe-related/tap/tap-observable-pipe.ts)

- *Source related*
  - allows one Observable to emit its values to many Observable: [shareObservablePipe](src/observable/pipes/built-in/without-notifications/source-related/built-in/share-observable-pipe.ts)

- reduces the order of an Observable of Observables
  - [mergeAllObservablePipe](src/observable/pipes/built-in/without-notifications/merge/merge-all/merge-all-observable-pipe.md)
  - maps an Observable and then reduces the order:
    - once: [mergeMapSingleObservablePipe](src/observable/pipes/built-in/without-notifications/merge/merge-map-single/merge-map-single-observable-pipe.ts)
    - many: [mergeMapObservablePipe](src/observable/pipes/built-in/without-notifications/merge/merge-map/merge-map-observable-pipe.ts)

- accumulates values:
  - until another Observable emits: [bufferObservablePipe](src/observable/pipes/built-in/without-notifications/others/buffer/buffer-observable-pipe.md)
  - within a fixed period of time: [bufferTimeObservablePipe](src/observable/pipes/built-in/without-notifications/others/buffer/derived/buffer-time/buffer-time-observable-pipe.md)

- time related
  - [debounceTimeObservablePipe](src/observable/pipes/built-in/without-notifications/time-related/debounce-time/debounce-time-observable-pipe.md)
  - [throttleTimeObservablePipe](src/observable/pipes/built-in/without-notifications/time-related/throttle-time/throttle-time-observable-pipe.md)
  - [debounceFrameObservablePipe](src/observable/pipes/built-in/without-notifications/time-related/debounce-frame/debounce-frame-observable-pipe.md)
  - [debounceImmediateObservablePipe](src/observable/pipes/built-in/without-notifications/time-related/debounce-immediate/debounce-immediate-observable-pipe.md)

- logs the state of the upper Observable: [logStateObservablePipe](src/observable/pipes/built-in/without-notifications/others/log-state/log-state-observable-pipe.ts)


#### emit a value myself => create a Source which emits values to

- multiple Observers: [createMulticastSource](src/observer-observable-pair/build-in/source/built-in/multicast-source/multicast-source.md)
- only one Observer: [createUnicastSource](src/observer-observable-pair/build-in/source/built-in/unicast-source/unicast-source.md)
- one or many Observer and stores the last emitted value:
  [createReplayLastSource](src/observer-observable-pair/build-in/source/built-in/replay-last-source/replay-last-source.md),
  [createMulticastReplayLastSource](src/observer-observable-pair/build-in/source/built-in/replay-last-source/derived/create-multicast-replay-last-source.ts),
  [createUnicastReplayLastSource](src/observer-observable-pair/build-in/source/built-in/replay-last-source/derived/create-unicast-replay-last-source.ts)

#### others

- chain many ObservablePipes: [pipeObservablePipes](src/observable/helpers/piping/pipe-observable-pipes/pipe-observable-pipes.md)
- chain many ObservablePipes with an Observable: [pipeObservable](src/observable/helpers/piping/pipe-observable/pipe-observable.md)
  

Can't find a function that suits your needs ? Open a discussion, or create your own and share it !

## Differences with RxJS:

- no classes: this choice allows blazing fast performances and very small bundle size. Indeed, creating a class with
  the `new` keyword is slow, and method names can't be mangled (minimized), where function calls are really well
  optimized by javascript engines. However, it has a minor cost: chaining operators or method calls are done through
  functions, which is a little less elegant (in terms of code readability).

- no `next`, `complete` and `error`: instead this lib use [notifications](src/misc/notifications/notifications.md).
  In reality, not all *Observables* require to emit a final state. For example, the RxJS `interval`
  never reaches a `complete` state. It just sends numbers. Moreover, some *Observables* may want to emit more
  than this 3 *events*: we may imagine an XHR Observable which emits an `upload-progress` and `download-progress` *events*.

- some concepts / operators / methods may have a different behaviour or name.
  Take care to read the documentation before any hasty use.
  
