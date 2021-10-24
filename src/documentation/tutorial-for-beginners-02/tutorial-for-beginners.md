# Getting started

We will use [stackblitz](https://stackblitz.com/) for this
examples, [with a preinstalled playgroud here](https://stackblitz.com/edit/typescript-5ksaqe?file=index.ts)

To install locally `rx-js-light`:

```bash
yarn add @lifaon/rx-js-light
# or
npm install @lifaon/rx-js-light --save
```

## setInterval

Ok let's start with a simple example: sometimes, you have to refresh some data with a specific period.

```ts
const timer = setInterval(() => {
  console.log('tick');
}, 500);

setTimeout(() => {
  clearInterval(timer);
}, 2000);
```

[Here is the exact equivalent with Observables:](https://stackblitz.com/edit/typescript-9swej8?file=index.ts)

```ts
const unsubscribe = interval(500)(() => {
  console.log('tick');
});

timeout(2000)(unsubscribe);
```

## addEventListener

What about addEventListener ?

```ts
let count: number = 0;

const callback = () => {
  count++;
  console.log(`clicked: ${count}`);
  if (count >= 2) {
    window.removeEventListener('click', callback);
    console.log('clicked twice');
  }
};

window.addEventListener('click', callback);
```

[Here is the equivalent with Observables:](https://stackblitz.com/edit/typescript-crwffj?file=index.ts)

```ts
let count: number = 0;

const subscribe = pipeSubscribeFunction(fromEventTarget(window, 'click'), [
  mapSubscribePipe(() => ++count),
  filterSubscribePipe(() => count >= 2),
]);

const unsubscribe = subscribe(() => {
  console.log('clicked twice');
  unsubscribe();
});
```

## fetch

Ok now, let's use fetch:

```ts
const controller = new AbortController();

fetch('https://jsonplaceholder.typicode.com/todos/1', {
  signal: controller.signal,
})
  .then((response) => response.json())
  .then(
    (json) => console.log(json),
    (error) => console.warn(error)
  );

controller.abort();
```

[Here is the equivalent with Observables:](https://stackblitz.com/edit/typescript-a9etbj?file=index.ts)

```ts
const subscribeFetch = pipeSubscribeFunction(fromFetch('https://jsonplaceholder.typicode.com/todos/1'), [
  mergeMapSingleSubscribePipeWithNotifications<ISubscribeFunctionFromFetchNotifications, any>(
    (response: Response) => fromPromise<any>(response.json()),
  ),
]);

const unsubscribeFetch = subscribeFetch(notificationObserver({
  next: (json) => console.log(json),
  error: (error) => console.warn(error),
}));

unsubscribeFetch();
```
