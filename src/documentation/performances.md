## Performances

---

**SYSTEM CONFIGURATION:**

- CPU: Intel(R) Core(TM) i7-8750H CPU @ 2.20GHz (6 cores / 12 threads)
- Memory: 16Go
- OS: Ubuntu 20.04 LTS
- Browser: Chrome 94
- Date: 2021-11-17

---

[comment]: <> (https://www.tablesgenerator.com/markdown_tables)

|           |   rxjs  | rx-js-light |     ratio     |
|:---------:|:-------:|:-----------:|:-------------:|
|    time   |  2267ms |    218ms    |  10.4x faster |
|    size   | 14.11kb |    0.76kb   | 18.5x smaller |
| (gzipped) |  5.19kb |    0.45kb   | 11.5x smaller |

---

The following performances test is not exhaustive, but it covers some generic and frequent usages of Observables.
It is not tweaked in favour of `rx-js-light` and in disfavor of `rxjs`. It tries to be as fair as possible,
and show how this lib performs against `rxjs`.

`rx-js-light` is **extremely performant** because it relies only on pure functions:

- functions are parts of the javascript language, and they are perfectly well optimized by the vendor engines.
- functions minification is very efficient and, in many cases, they are unrolled and simplified.

For large projects or browser applications requiring critical performances and reactive programming,
`rx-js-light` is an excellent solution, and a good alternative to `rxjs`.

Don't believe me ? Try by yourself:

```ts
import { from as fromRXJS } from 'rxjs';
import {
  fromArray,
  distinct$$$,
  map$$$,
  pipe$$,
  filter$$$,
} from '@lifaon/rx-js-light';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

function rxJSLightPerformancesExample() {
  const values = Array.from({ length: 1e5 }, (v: any, index: number) => index);

  const withRXJS = () => {
    let j = 0;

    const obs = fromRXJS(values).pipe(
      map((value: number) => value * 2),
      filter((value: number) => value > 1e4),
      distinctUntilChanged()
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

  // withRXJS();

  // time:
  //  2267.360107421875 ms

  // size:
  //  dist/assets/index.41876833.js    0.29 KiB / gzip: 0.22 KiB
  //  dist/assets/vendor.c8e67adc.js   13.82 KiB / gzip: 4.97 KiB
  //  total: 14.11kb / 5.19kb

  /* rx-js-light */

  withRXJSLight();

  // time:
  //  218.35107421875 ms
  //  => 10.4x faster

  // size:
  //  dist/assets/index.3e8ab25d.js    0.28 KiB / gzip: 0.21 KiB
  //  dist/assets/vendor.e9be2cee.js   0.48 KiB / gzip: 0.24 KiB
  //  total: 0.76kb / 0.45kb
  //  => 18.5x / 11.5x smaller
}

rxJSLightPerformancesExample();
```

[Click here to run the code](https://stackblitz.com/edit/vite-cfrug8?file=main.ts)
