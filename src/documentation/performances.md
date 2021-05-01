## Performances

`rx-js-light` is extremely performant because it relies only on pure functions:

- unbeatable speed: 3 times faster in the following performance test (simple test using 3 different operators).
- minimal size: up to 10 times smaller.

All of this due to the usage of functions instead of classes and methods:

- functions are parts of the javascript language, and are perfectly well optimized by the vendor engines.
- functions are extremely well minified and even reduced / simplified in many cases.

For large projects or browser applications requiring critical performances and reactive programming,
`rx-js-light` is an excellent solution !

<details>
  <summary>Show performance test code</summary>

```ts
import { from as fromRXJS } from 'rxjs';
import { fromArray } from '@lifaon/rx-js-light';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { distinct$$$, map$$$, pipe$$, filter$$$ } from '@lifaon/rx-js-light-shortcuts';


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
  //  1259.89697265625 ms

  // size:
  //  dist/assets/index.df218447.js    0.89kb / brotli: 0.46kb
  //  dist/assets/vendor.85359b5f.js   12.29kb / brotli: 3.40kb
  //  total: 13.18kb / 3.86kb


  /* rx-js-light */

  // withRXJSLight();

  // time:
  //  388.719970703125 ms
  //  => 3.2x faster

  // size:
  //  dist/assets/index.f4437db2.js    1.09kb / brotli: 0.52kb
  //  => 12.1x / 6.53x smaller
}
```

</details>
