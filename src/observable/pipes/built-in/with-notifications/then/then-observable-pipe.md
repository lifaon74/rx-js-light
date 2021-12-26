## thenObservablePipe or then$$$

```ts
function thenObservablePipe<GInNextValue, GOut>(
  onFulfilled: IThenObservableOnFulfilled<GInNextValue, GOut>,
  onRejected: IThenObservableOnRejected<GOut>,
): IObservablePipe<IThenObservableInNotifications<GInNextValue>, GOut>
```

With:

```ts
interface IThenObservableOnFulfilled<GInNextValue, GOut> {
  (value: GInNextValue): IObservable<GOut>;
}

interface IThenObservableOnRejected<GOut> {
  (error: any): IObservable<GOut>;
}

```

This function subscribes to an *Observable* that emits some Notifications (`next`, `complete` and `error`).

If a `complete` Notification is received, it calls `onFulfilled` with the last received value coming from a `next` Notification.

If an `error` Notification is received, it calls `onRejected` with this error.

Then, it emits the values from the Observable returned by `onFulfilled` or `onRejected`.

This is useful to mimic the behaviour of Promises but with Observables.

It comes with two helpers: `fulfilledObservablePipe` and `rejectedObservablePipe`.

**WARNING:** do not throw into any of `onFulfilled` or `onRejected` and expects that it will send an `error` Notification.
Instead use `throwError`.

### Examples

#### Example 1

```ts
const subscribe = pipe$$(fromFetch(`https://www.w3.org/TR/PNG/iso_8859-1.txt`), [
  then$$$(
    (response: Response): IObservable<IFromPromiseObservableNotifications<string>> => {
      if (response.ok) {
        return fromPromise(response.text());
      } else {
        return throwError(createNetworkError());
      }
    },
    (error: any): IObservable<IDefaultNotificationsUnion<string>> => {
      if (navigator.onLine) {
        return throwError(error);
      } else {
        return singleWithNotifications('Offline');
      }
    }
  ),
]);

subscribe((notification) => {
  console.log(notification.name, notification.value);
});
```

Output (if request succeed):

```text
'next', 'The following are the gr...'
'complete', undefined
```

#### Example 2

```ts
const subscribe = pipe$$(request$, [
  fulfilled$$$((response: Response): IObservable<IFromPromiseObservableNotifications<string>> => {
    if (response.ok) {
      return fromPromise(response.text());
    } else {
      return throwError(createNetworkError());
    }
  }),
]);

subscribe((notification) => {
  console.log(notification.name, notification.value);
});
```

Output (if request succeed):

```text
'next', 'The following are the gr...'
'complete', undefined
```


#### Example 3

```ts
const subscribe = pipe$$(throwError(new Error(`Rejected`)), [
  rejected$$$((error: any): IObservable<IDefaultNotificationsUnion<string>> => {
    if (navigator.onLine) {
      return throwError(error);
    } else {
      return singleWithNotifications('Offline');
    }
  }),
]);

subscribe((notification) => {
  console.log(notification.name, notification.value);
});
```

Output (if browser is online):

```text
'error', Error(`Rejected`)
```

Output (if browser is offline):

```text
'next', 'Offline'
'complete', undefined
```

#### Example 4

```ts
const subscribe = pipe$$(request$, [
  finally$$$((): IObservable<IEmptyObservableNotifications> => {
    return mergeMapS$$(timeout(2000), () => emptyWithNotifications());
  }),
]);

subscribe((notification) => {
  console.log(notification.name, notification.value);
});
```

Output:

```text
// request
// 2000ms
'next', Response
'complete', undefined
```

