## fulfilledObservablePipe or fulfilled$$$

```ts
function fulfilledObservablePipe<GInNextValue, GOut>(
  onFulfilled: IThenObservableOnFulfilled<GInNextValue, GOut>,
): IObservablePipe<IThenObservableInNotifications<GInNextValue>, IFulfilledObservableOutNotifications<GOut>>
```

With:

```ts
export type IFulfilledObservableOutNotifications<GOut> =
  GOut
  | IErrorNotification;
```

This function is similar to the method `.then` of a Promise. It returns:

```ts
thenObservablePipe<GInNextValue, IFulfilledObservableOutNotifications<GOut>>(
  onFulfilled,
  throwError,
);
```

### Example

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
