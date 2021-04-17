## notificationsToValuesSubscribePipe

```ts
function notificationsToValuesSubscribePipe<GValue>(
  onError?: INotificationsToValuesSubscribePipeOnErrorFunction<GValue>,
  maxNumberOfValues: number = Number.POSITIVE_INFINITY,
): ISubscribePipeFunction<IDefaultInNotificationsUnion<GValue>, GValue[]>
```

Accumulates all values emitted using `next` *Notifications*, until `complete` is received.
Then emit these values as an array.

You may provide:

- `onError`: called when an `error` *Notification* is received
- `maxNumberOfValues`: maximal size of the array containing the values (retains `maxNumberOfValues` last values)


### Examples

#### Emits each values of an array individually, then regroups them

```ts
const subscribe = pipeSubscribeFunction(fromArrayWithNotifications([1, 2, 3, 4]), [
  notificationsToValuesSubscribePipe<number>(),
]);

subscribe((values: number[]) => {
  console.log(values);
});
```

Output:

```text
[1, 2, 3, 4]
```
