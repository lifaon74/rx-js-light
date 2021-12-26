# Migrating from rxjs to rx-js-light

Migrating from *rxjs* to *rx-js-light* is a great choice if you aim to improve the performances of your application
and reduce its overall size.

## Types

- *rxjs* uses classes, where *rx-js-light* uses functions.
So the class `Observable` becomes the type [IObservable](../../observable/type/observable.md) (a function definition).
The same is true for `Observer` => [IObserver](../../observer/type/observer.md).
- *rxjs* regroups under same the same name (`Operator`) the functions that generate an Observable and the pipes that chains them
(called `Pipeable Operator`). *rx-js-light* has a specific type for the pipes: [IObservablePipe](../../observable/pipes/type/observable-pipe.md)

Moreover, *rx-js-light* tries to be consistent in its naming:

- functions are explicit about what they return (ex: ends with `ObservablePipe`)
- it follows the Observable naming convention: a `$` is present at the end of a variable name representing an Observable (ex: `const value$ = of(5);`)
, and it extends this rule with `$$` for a function that generates an Observable, and `$$$` for a function that generates an ObservablePipe)

## Creating an Observable

Most functions that create an Observable in `rxjs` have a similar same name in `rx-js-light`. Example:

- [of](../../observable/built-in/from/without-notifications/values/of/of.md)
- [fromEventTarget](../../observable/built-in/from/without-notifications/dom/from-event-target/from-event-target.md)
- [combineLatest](../../observable/built-in/from/without-notifications/many-observables/combine-latest/combine-latest.md)
- [interval](../../observable/built-in/from/without-notifications/time-related/interval/interval.md)
- etc...

## Creating an ObservablePipe

This is true too for the Observable pipes: many functions have a similar name:

- [distinctObservablePipe](../../observable/pipes/built-in/without-notifications/observer-pipe-related/distinct/distinct-observable-pipe.ts)
- [mapObservablePipe](../../observable/pipes/built-in/without-notifications/observer-pipe-related/map/map-observable-pipe.ts)
- [scanObservablePipe](../../observable/pipes/built-in/without-notifications/observer-pipe-related/scan/scan-observable-pipe.ts)
- [debounceTimeObservablePipe](../../observable/pipes/built-in/without-notifications/time-related/debounce-time/debounce-time-observable-pipe.md)
- etc...


## Subscription / Unsubscription


To subscribe with *rxjs*, you have to call the `subscribe` method, which returns a Subscription,
and then you can unsubscribe it using the method `unsubscribe`:

```ts
const subscription = of(1, 2, 3)
 .subscribe((value: number) => {
    console.log(value);
  });

// LATER
subscription.unsubscribe();
```

With *rx-js-light* you just have to call a function, and later call its return:


```ts
const unsubscribe = of(1, 2, 3)
  ((value: number) => {
    console.log(value);
  });

// LATER
unsubscribe();
```


## Piping

With *rxjs* you pipe your Observables with the method `pipe`: 

```ts
const subscription = of(1, 2, 3)
 .pipe(
   map(value => String(value)),
   distinct(),
 );
```

With *rx-js-light*, instead of using a method, you'll use the function `pipe$$`:

```ts
const subscription = pipe$$(of(1, 2, 3), [
  map$$$(value => String(value)),
  distinct$$$(),
]);
```

If you only have one pipe, you can even inline it:

```ts
const subscription = map$$(of(1, 2, 3), value => String(value));
```

## State of the Observable - next, complete and error

The *rx-js-light* Observables don't have a `complete` nor `error` state. Instead, they just send values defined by their type.

This is somehow, like if they were only sending `next`. To send a state, you have to use [Notifications](./08-notifications.md)

## Subject and BehaviorSubject

Both are replaced by [Sources](./05-sources.md): [MulticastSource](src/observer-observable-pair/build-in/source/built-in/multicast-source/multicast-source.md) and
[ReplayLastSource](src/observer-observable-pair/build-in/source/built-in/replay-last-source/replay-last-source.md)

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
