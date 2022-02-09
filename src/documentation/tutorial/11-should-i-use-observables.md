# Should I use Observables ?

Observables are great when working with asynchronous data streams, so if you're working on front-end applications,
there's a great chance  they'll help you a lot.

The most common use case appends when you destroy a component (custom element, react, angular, or any framework)
and you want to abort/cancel any async/pending tasks to free resources or avoid side effects.
Observables perfectly match and solve this scenario.

### API calls / http(s) requests

Usually, without `rx-js-light`, you'll have a function that performs a `fetch`
and transforms the data using some Promise's methods or helpers like `.then`, `.all`, `.race`, etc...
**So the entire pipeline is built and resolved when the function is called.**
If any abort is required, it's not an easy task, because Promises doesn't support `AbortSignal` except for a few.

```ts
function addAbortSignalSupport<GValue>(
  promise: Promise<GValue>,
  signal: AbortSignal,
): Promise<GValue> {
  return promise.then((value: GValue): GValue => {
    if (signal.aborted) {
      throw new Error(`Aborted`);
    } else {
      return value;
    }
  });
}

/**
 * API Request
 */
function fetchData(signal: AbortSignal): Promise<IData> {
  return fetch(`https://api.com`, { signal })
    .then((response: Response): IData => {
      return addAbortSignalSupport(response.json(), signal);
    });
}

function main(): void {
  const controller = new AbortController();

  fetchData(controller.signal)
    .then((data: IData) => { /* ...code */ });

  // abort if the request takes more than 5s
  setTimeout(() => controller.abort(), 5000);
}

main();
```


With Observables, things are different: first you set up your pipeline using functions like
`fromFetch`, `fulfilled$$$`, `forkJoin` etc... which generates an Observable.
Then, you *subscribe* to the Observable to start the http request.
As opposed to the previous method, the pipeline is build *before* and run *later*:
the Observables are build when the pipeline is defined, where the Promises are build at the moment we call the function.
Moreover, aborting async tasks happening in the pipeline is a breeze: you simply have to call the returned *unsubscribe* function.
You may even continue to chain naturally this Observable to other ones.


```ts
const request$ = pipe$$(fromFetch(`https://api.com`), [
  fulfilled$$$((response: Response): IObservable<IData> => {
    return fromPromise(response.json());
  }),
]);

function main(): void {
  const unsubscribe = request$(notificationObserver({
    next(data: IData) { /* ...code */ },
  }));

  setTimeout(unsubscribe, 5000);
}

main();
```

<details>
  <summary>racing</summary>

```ts
const requestWithRace$ = raceWithNotifications(
  request$,
  timeoutWithErrorNotification(5000),
);

function main(): void {
  requestWithRace$(notificationObserver({
    next(data: IData) { /* ...code */ },
  }));
}

main();
```

</details>

### Computed variables

Another interesting use case, is updating some values based on events.


**Example:** a string built and refresh dynamically from a user's input

```ts
const input = document.createElement('input');
input.type = 'number';
document.body.appendChild(input);

const output = document.createElement('output');
document.body.appendChild(output);

// an observable emiting a number provided by the user
const number$ = map$$(fromEventTarget(input, 'change'), () => Number(input.value));

// an observable built from a template string
const text$ = string$$`User input: ${number$}`;

text$((text: string) => {
  output.value = text;
});
```


**Example:** a text translated automatically when the user selects a new locale

```ts
// an observable emiting a locale selected by the user
// assumes 'input' is a <select> with a list of locales
const inputLocale$ = map$$(fromEventTarget(input, 'change'), () => input.value);

// an observable emiting the navigator locale
const navigatorLocale$ = single(navigator.language);

const locale$ = merge([inputLocale$, navigatorLocale$]);

// an observable fetching some translations when the locale changes 
type ITranslations = { [key: string]: string };
const translations$ = mergeMapS$$(locale$, (locale: string) => fromFetchJSON<ITranslations>(`https://my-website.com/api/translations/${locale}`));

// an observable using 'translations$' and 'key' to output the correct translation
const key = 'button.ok';
const text$ = map$$(translations$, translations => translations[key]);

text$((translated: string) => {
  console.log(translated);
});
```



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

