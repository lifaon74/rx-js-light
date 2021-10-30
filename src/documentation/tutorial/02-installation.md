# Installation

```bash
yarn add @lifaon/rx-js-light
# or
npm install @lifaon/rx-js-light --save
```

Then you can import and use it:

```ts
import { of, pipeSubscribeFunction, mapSubscribePipe } from '@lifaon/rx-js-light';

const subscribe = pipeSubscribeFunction(of(1, 2, 3), [
  mapSubscribePipe(value => `-> ${value}`),
]);
```

This library supports:

- **common-js** (require): transpiled as es5, with .cjs extension, useful for old nodejs versions
- **module** (esm import): transpiled as esnext, with .mjs extension (requires node resolution for external packages)

The library is ready to go and does not require transpiling nor bundling. **However** it has been optimized for three-shacking,
so you should use a bundler like rollup or webpack.

For rapid testing, [you can immediately play with rx-js-light on stackblitz](https://stackblitz.com/edit/typescript-5ksaqe?file=index.ts)

As a CDN, you can use [skypack](https://www.skypack.dev/):
[https://cdn.skypack.dev/@lifaon/rx-js-light](https://cdn.skypack.dev/@lifaon/rx-js-light)


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

