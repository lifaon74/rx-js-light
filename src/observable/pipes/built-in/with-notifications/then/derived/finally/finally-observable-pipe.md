## finallyObservablePipe or finally$$$

```ts
function finallyObservablePipe<GInNextValue>(
  onFinally: IFinallyObservableCallback<GInNextValue>,
): IObservablePipe<IThenObservableInNotifications<GInNextValue>, IFinallyObservableOutNotifications<GInNextValue>>
```

This function is similar to the method `.finally` of a Promise:

When a `complete` or `error` Notification is received, `onFinally` is called with the resolved state.

Then, we await on a `complete` Notification from the returned Observable and re-emit the notifications received from the original Observable,
except if the returned Observable sent an `error` Notification (in this case it emits this error).

### Example

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


