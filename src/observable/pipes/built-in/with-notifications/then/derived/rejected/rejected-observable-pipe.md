## rejectedObservablePipe or rejected$$$

```ts
function rejectedObservablePipe<GInNextValue, GOut>(
  onRejected: IThenObservableOnRejected<GOut>,
): IObservablePipe<IThenObservableInNotifications<GInNextValue>, IRejectedObservableOutNotifications<GInNextValue, GOut>>
```

With:

```ts
export type IRejectedObservableFulfilledNotifications<GInNextValue> =
  INextNotification<GInNextValue>
  | ICompleteNotification;

export type IRejectedObservableOutNotifications<GInNextValue, GOut> =
  GOut
  | IRejectedObservableFulfilledNotifications<GInNextValue>;
```

This function is similar to the method `.catch` of a Promise. It returns:

```ts
thenObservablePipe<GInNextValue, IRejectedObservableOutNotifications<GInNextValue, GOut>>(
  singleWithNotifications,
  onRejected,
);
```



### Example

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
