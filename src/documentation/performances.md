## Performances

---

**SYSTEM CONFIGURATION:**

- CPU: Intel(R) Core(TM) i7-8750H CPU @ 2.20GHz (6 cores / 12 threads)
- Memory: 16Go
- OS: Ubuntu 20.04 LTS
- Browser: Chrome 94
- Date: 28/10/2021

---

`rx-js-light` is **extremely performant** because it relies only on pure functions:

- unbeatable speed: up to 10 times faster in the following performance test (simple test using 3 different operators).
- minimal size: up to 10 times smaller.

All of this due to the usage of functions instead of classes and methods:

- functions are parts of the javascript language, and they are perfectly well optimized by the vendor engines.
- functions minification is very efficient and in many cases they can even be reduced or simplified.

For large projects or browser applications requiring critical performances and reactive programming,
`rx-js-light` is an excellent solution !

```ts
import { from as fromRXJS } from 'rxjs';
import { fromArray, distinct$$$, map$$$, pipe$$, filter$$$ } from '@lifaon/rx-js-light';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

function rxJSLightPerformancesExample() {
  const values = Array.from({ length: 1e5 }, (v: any, index: number) => index);

  const withRXJS = () => {

    let j = 0;

    const obs = fromRXJS(values)
      .pipe(
        map((value: number) => value * 2),
        filter((value: number) => value > 1e4),
        distinctUntilChanged(),
      );

    console.time('start');
    for (let i = 0; i < 1e2; i++) {
      obs.subscribe((value: number) => {
        j += value;
      });
    }
    console.timeEnd('start');
    console.log('j', j);
  };

  const withRXJSLight = () => {

    let j = 0;

    const subscribe = pipe$$(fromArray(values), [
      map$$$<number, number>((value: number) => value * 2),
      filter$$$<number>((value: number) => value > 1e4),
      distinct$$$<number>(),
    ]);

    console.time('start');
    for (let i = 0; i < 1e2; i++) {
      subscribe((value: number) => {
        j += value;
      });
    }
    console.timeEnd('start');
    console.log('j', j);
  };

  /* RxJS */

  withRXJS();

  // time:
  //  2267.360107421875 ms

  // size:
  //  dist/assets/index.df218447.js    0.89kb / brotli: 0.46kb
  //  dist/assets/vendor.85359b5f.js   12.29kb / brotli: 3.40kb
  //  total: 13.18kb / 3.86kb


  /* rx-js-light */

  // withRXJSLight();

  // time:
  //  218.35107421875 ms
  //  => 10.3x faster

  // size:
  //  dist/assets/index.f4437db2.js    1.09kb / brotli: 0.52kb
  //  => 12.1x / 6.53x smaller
}

rxJSLightPerformancesExample();
```

[Click here to run the code](https://stackblitz.com/edit/vite-cfrug8?file=main.ts)
