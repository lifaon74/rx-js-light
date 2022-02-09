## ofWithNotifications or ofN

```ts
function ofWithNotifications<GValue>(
  ...values: GValue[]
): IObservable<IOfObservableNotifications<GValue>>
```

```ts
type IOfObservableNotifications<GValue> = IFromArrayObservableNotifications<GValue>;
```

Creates an Observable from a list of values. It emits the values one by one in the form of `next` Notifications
and then complete (`complete` Notification).

It's identical of [fromArrayWithNotifications](../../iterable/sync/from-array/from-array-with-notifications.md) but used spread values instead.

### Examples

#### Basic example

```ts
const subscribe = of(0, 1, 2, 3);

subscribe((notification) => {
  console.log(notification.name, ':', notification.value);
});
```

Output:

```text
next: 0
next: 1
next: 2
next: 3
complete
```


