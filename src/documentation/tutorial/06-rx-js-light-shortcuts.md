# Shortcuts

Most of the `rx-js-light`'s functions have two forms:

- explicit naming: the name contains what the function does and what it returns.
This is especially useful, when you have to search for a function name, and for new incomers to know immediately what the function does.
- shortcut naming: when you start to master Observables, verbose functions are not ideal for clear and concise code.
So you may use shortcuts instead.

If you want to use shortcuts, follow this guide.

---

The shortcuts use some common Observable and Observer notations:

> an Observable ends with $

`const request$ = fromFetch('http://example.com');`

> a function that generates an Observable ends with $$

`const mapString$$ = mapObservablePipe(String);`

> a function that generates s function that returns an Observable ends with $$$

`const map$$$ = mapObservablePipe;`

---

Shortcuts are defined into `.shortcut.ts` files in the same folder as their respective functions.

- functions that ends with `ObservablePipe` (which are *ObservablePipes*) like `mapObservablePipe` are replaced by `[name]$$$` => `map$$$`.
Another example: `distinctObservablePipe` becomes `disctinct$$$`
- functions that ends with `Observable` (which accept an Observable as first argument and returns another Observable)
like `mapObservable` are replaced by `[name]$$` => `map$$`. Another example: `filterObservable` becomes `filter$$`

---

So, for example, if you want to map an Observable to another:


```ts
const output$ = map$$(input$, value => (value * 2));
```

To create a MulticastReplayLastSource:

```ts
const $source$ = let$$('initial-value');
```

To pipe an Observable:

```ts
const output$ = pipe$$(input$, [
  map$$$(value => (value * 2)),
  filter$$$(value => (value >= 10)),
]);
```

And there's far more.

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


