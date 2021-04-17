## What problems is rx-js-light trying to solve ?

### Performances

`rx-js-light` is extremely performant because it relies only on pure functions:

- unbeatable speed: 3 times faster in the following performance test (simple test using 3 different operators).
- minimal size: up to 10 times smaller.

All of this due to the usage of functions instead of classes and methods:

- functions are parts of the javascript language, and are perfectly well optimized by the vendor engines.
- functions are extremely well minified and even reduced / simplified in some cases.

For large projects or browser applications requiring critical performances, `rx-js-light` is done for you.

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

  // speed:
  //  1259.89697265625 ms

  // size:
  //  dist/assets/index.df218447.js    0.89kb / brotli: 0.46kb
  //  dist/assets/vendor.85359b5f.js   12.29kb / brotli: 3.40kb
  //  total: 13.18kb / 3.86kb


  /* rx-js-light */

  // withRXJSLight();

  // speed:
  //  388.719970703125 ms
  //  => 3.2x faster

  // size:
  //  dist/assets/index.f4437db2.js    1.09kb / brotli: 0.52kb
  //  => 12.1x / 6.53x smaller
}
```

</details>


### Computed properties

I'll call a *computed variable* a variable which depends on other variables: 

```ts
let count = 5;
let name = 'Alice';
const str = `${ count } cars for ${ name }`;
// if any of 'count' or 'name' is updated later, 'str' won't be updated
````

Having such variables, may easily lead to **INCONSISTENCY**:

If any of `count` or `name` changes, it's easy to forget to update `str`,
creating a potential incoherent state in your application.

I've encountered hundreds of bugs, related to this **bad practice**,
especially when multiple developers works on the same codebase, leading sometimes to very difficult bugs to resolve.

**Assigning a computed value that may evolve through time should be avoided.**

A common workaround is to use getters or functions instead, but you still may forget to notify that these values have changed.
It is an extremely common source of errors, and for complex application with thousands of these variables,
it's sometimes very complicated to maintain a consistent state.


`rx-js-light` is perfect for computed properties: if any of `count` or `name` changes, `str` will be updated too
and immediately reflected or cascaded to other computed variables using it.

```ts
const $count$ = let$$(5);
const $name$ = let$$('Alice');
const str$ = string$$`${ $count$.subscribe } cars for ${ $name$.subscribe }`;
// $count$.emit(10) will instaltly update str$ 
```

Each variables mutating over time, **SHOULD** be converted into *SubscribeFunctions*.
And every computed values **SHOULD** be *SubscribeFunctions* built from piping these variables (mostly using map or filter for example).


### Async disposal

It's extremely frequent to start async tasks like:

 - http request (fetch)
 - events listener (createEventListener)
 - or timers (setInterval)

However, most of the time (mostly due to laziness, let's admit it 🙄) developers don't handle cancellation (AbortSignal, removeEventListener, clearInterval),
leading to memory leaks, unwanted concurrent / duplicate tasks, or incorrect resolve order.

For example, it's pretty common to start a http request when a user clicks on a button.
If the user double-clicks or more, you'll end up with concurrent http requests, and unexpected results
(incorrect resolve order, server answering 'error' because the request was expected uniq, etc...).

`rx-js-light` covers very well this use case, because *SubscribeFunctions* are lazy sources which when unsubscribed, 
release their resources and cancel any pending tasks.

So every async job, **SHOULD** begin with an *SubscribeFunctions*.

Example:

```ts
const container = document.body;

const button = document.createElement('button');
button.innerText = 'do request';
container.appendChild(button);

const resultContainer = document.createElement('div');
container.appendChild(resultContainer);

/* THE COMPLEX PART */
const subscribe = pipe$$(fromEventTarget<'click', MouseEvent>(button, 'click'), [ // creates an observable listening to 'clicks' on 'button'
  debounce$$$<MouseEvent>(1000), // if the user clics twice or more, we only keep the last event for a period of 1000ms
  mergeMap$$$<MouseEvent, ISubscribeFunctionFromFetchNotifications>( // maps incoming values and converts an Observable of Observables into a lower order Observable
    () => fromFetch(API_URL), // creates an Observable performing an http request using the fetch API
    1, // limit to one the number of parallel merged Observables (optimization => cancels previous request, if any)
  ),
  mergeMapN$$$<ISubscribeFunctionFromFetchNotifications, IAPIResponseJSON>( // same as mergeMap but works with notifications instead
    (response: Response) => fromPromise<IAPIResponseJSON>(response.json()), // creates an Observable from a Promise
    1,
  ),
]);

// until 'subscribe' is called, no event listener is created, nor http calls

const unsubscribe = subscribe(notificationObserver({
  next: (data: IAPIResponseJSON) => {
    console.log(data);
    button.parentNode?.removeChild(button);
    resultContainer.innerText = `Request succeed`;
  },
  error: () => {
    resultContainer.innerText = `Request failed`;
  }
}));

// if 'unsubscribe' is called every async tasks will be properly cancelled (any pending requests, event listener removed, etc...)
```

It may look complicated if you're not familiar with Observables, but as you may see, by calling only one function
(here: `unsubscribe`) you'll properly cancel all the async stuff.

At the end your code will be more compact, and with fewer bugs.

