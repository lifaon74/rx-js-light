## forkJoin

```ts
function forkJoin<GObservables extends IGenericForkInObservables>(
  observables: GObservables,
): IObservable<IForkJoinObservableNotifications<GObservables>

```

`forkJoin` will wait for all passed observables to complete (`complete` Notification)
and then it will emit an array with the last values received through the `next` Notifications for each observable.
Finally, it will complete (`complete` Notification).

It is somehow equivalent of a `Promise.all`.

### Examples

#### Example 1

```ts
const observable1$ = singleN(false);
const observable2$ = mergeMapS$$(timeout(2000), () => singleN(true)); // emits 'true' after 2000ms

const result$ = forkJoin([observable1$, observable2$]);

result$((notification) => {
  console.log(notification.name, notification.value);
});

```

Output:

```text
// 2000ms
'next', [false, true]
'complete', undefined
```
