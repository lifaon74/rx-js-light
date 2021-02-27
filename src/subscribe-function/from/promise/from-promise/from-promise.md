## fromPromise

```ts
function fromPromise<GValue>(
  promise: Promise<GValue>,
): ISubscribeFunction<ISubscribeFunctionFromPromiseNotifications<GValue>>
```

Creates a SubscribeFunction from a Promise.

The SubscribeFunction emits values in the form of Notifications:

- `next`: the returned value of the promise
- `complete`: when the promise is fulfilled
- `error`: when the promise is rejected


⚠️ `fromPromise` should be used only if you already have a Promise,
else you should prefer to use [fromPromiseFactory](../from-promise-factory/from-promise-factory.md) which provides an AbortSignal to properly cancel any pending tasks.

### Examples

#### Simple fulfilled Promise

```ts
const subscribe = fromPromise(Promise.resolve('Hello World !'));

subscribe((notification) => {
  console.log(notification.name, ':', notification.value);
})
```

Output:

```text
next: Hello World !
complete
```

#### Simple rejected Promise

```ts
const subscribe = fromPromise(Promise.reject(new Error('Rejected')));

subscribe((notification) => {
  console.log(notification.name, ':', notification.value);
})
```

Output:

```text
error: Error('Rejected')
```
