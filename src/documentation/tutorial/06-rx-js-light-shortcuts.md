# Shortcuts for rx-js-light => rx-js-light-shortcuts

Some people prefer verbose and explicit function, and others shortcuts. If you prefer shortcuts (and it's my case),
I recommend you to use: [rx-js-light-shortcuts](https://github.com/lifaon74/rx-js-light-shortcuts)

It uses some common Observable and Observer notation:

> an Observable ends with $

`const request$ = fromFetch('http://example.com');`

> a function that generates an Observable ends with $$

`const mapString$$ = mapSubscribePipe(String);`

> a function that generates s function that returns an Observable ends with $$$

`const map$$$ = mapSubscribePipe;`

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
- [Shortcuts for rx-js-light => rx-js-light-shortcuts](./06-rx-js-light-shortcuts.md)
- [A practical example for rx-js-light](./07-practical-example/07-practical-example.md)
- [Notifications replace RxJS events](./08-notifications.md)


