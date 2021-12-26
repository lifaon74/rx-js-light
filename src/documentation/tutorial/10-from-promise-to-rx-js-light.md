# From Promise to rx-js-light

Promises are great, and you should continue to use them.
However, sometimes your code requires to cancel a "promise pipeline",
or to setup the pipeline and then, on subscribe, start the async tasks.For these use-cases, you may use some Observables.

### Difference between a Promise and an Observable

First, we need to understand the differences between a Promise and an Observable:

An Observable may emit many values, where a Promise only resolves with one.

It's not possible to unsubscribe of a Promise, so aborting one is tricky (usually it's done with an AbortSignal).

A Promise has an internal state: 
  - `pending`: the Promise is not resolved yet
  - `fulfilled`: the Promise is resolved without error and has a `value`
  - `rejected`: the Promise is rejected with an `error`
  
However, an Observable may emit any kind of values, so to mimic the behaviour of a Promise we will use some Notifications:

- `type INextNotification<GValue> = INotification<'next', GValue>`: used to emit a value
- `type ICompleteNotification = INotification<'complete', void>`:  used to notify of a `complete` state (success)
- `type IErrorNotification<GError = any> = INotification<'error', GError>`: used to notify of an `error` state

So to represent a `fulfilled` Promise we have to emit a `next` Notification followed by a `complete` one,
and to represent a `rejected` Promise  we have to emit an `error` Notification.


#### Promise.resolve

Here is an equivalent of `Promise.resolve`, but using an Observable instead:

```ts
function singleWithNotifications<GValue>(
  value: GValue,
): IObservable<ISingleObservableNotifications<GValue>> {
  return (emit: IObserver<ISingleObservableNotifications<GValue>>): IUnsubscribe => {
    emit(createNextNotification<GValue>(value));
    emit(STATIC_COMPLETE_NOTIFICATION);
    return noop;
  };
}
```

You can find more details here: [singleWithNotifications](../../observable/built-in/from/with-notifications/values/single/single-with-notifications.md)


#### Promise.reject

```ts
function throwError<GError>(
  error: GError,
): IObservable<IErrorNotification<GError>> {
  return (emit: IObserver<IErrorNotification<GError>>): IUnsubscribe => {
    emit(createErrorNotification<GError>(error));
    return noop;
  };
}
```

[throwError](../../observable/built-in/from/with-notifications/others/throw-error/throw-error.md)

#### Promise.all

[forkJoin](../../observable/built-in/from/with-notifications/many-observables/fork-join/fork-join.md)

#### Chaining -> then / catch

##### then

[thenObservablePipe](../../observable/pipes/built-in/with-notifications/then/then-observable-pipe.md)

[fulfilledObservablePipe](../../observable/pipes/built-in/with-notifications/then/derived/fulfilled/fulfilled-observable-pipe.ts)


##### catch

[rejectedObservablePipe](../../observable/pipes/built-in/with-notifications/then/derived/rejected/rejected-observable-pipe.ts)

#### Casting an Observable to a Promise

In most cases, you simply want the last received value (last `next` Notification), so you can use the function 
[toPromiseLast](src/observable/built-in/to/with-notifications/promise/last/to-promise-last.md)
, but if for some reasons you prefer to receive all the values as an array, you can use the function
[toPromiseAll](src/observable/built-in/to/with-notifications/promise/all/to-promise-all.md)


### Example

```ts
function noCORS(url: string): string {
  const _url: URL = new URL(`https://cors-anywhere.herokuapp.com/`);
  _url.pathname = url;
  return _url.href;
}

interface IGeoJSGetGeoJSON {
  organization_name: string;
  region: string;
  accuracy: number;
  asn: number;
  organization: string;
  timezone: string;
  longitude: string;
  country_code3: string;
  area_code: string;
  ip: string;
  city: string;
  country: string;
  continent_code: string;
  country_code: string;
  latitude: string;
}

// 1) prepare the request pipiline
const request$ = pipe$$(fromFetch(noCORS(`https://get.geojs.io/v1/ip/geo.json`)), [
  fulfilled$$$((response: Response): IObservable<IDefaultNotificationsUnion<IGeoJSGetGeoJSON>> => {
    if (response.ok) {
      return fromPromise(response.json());
    } else {
      return throwError(createNetworkError());
    }
  }),
  fulfilled$$$((data: IGeoJSGetGeoJSON): IObservable<IDefaultNotificationsUnion<string>> => {
    return singleN<string>(data.country);
  }),
]);

const doRequestOnClick$ = pipe$$(fromEventTarget(window, 'click'), [
  mergeMapS$$$(() => request$),
]);

doRequestOnClick$((notification: IDefaultNotificationsUnion<string>) => {
  console.log(notification.name, notification.value);
});
```

Output:

```text
// user clicks
'next', United States
'complete', undefined
```

[Try it on stackblitz](https://stackblitz.com/edit/typescript-a6j2xx)

---

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

