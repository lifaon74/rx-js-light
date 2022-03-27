## Notification

```ts
interface INotification<GName extends string, GValue> {
  readonly name: GName;
  readonly value: GValue;
}
```

A *Notification* is used as a replacement of the `next`, `complete`and `error` *events*:
you will emit directly a `INextNotification` instead of calling `subscriber.next()` for example.

To create a Notification, you may use a plain object `{ name, value }` or use the
function [createNotification](./create-notification.ts):

```ts
function createNotification<GName extends string, GValue>(
  name: GName,
  value: GValue,
): INotification<GName, GValue>;
```

Moreover, some pre-existing *Notifications* may be found in [built-in](./built-in)

### Examples

#### Create an Observable from a Promise

```ts
type IObservableFromPromiseNotifications<GValue> =
  INextNotification<GValue>
  | ICompleteNotification
  | IErrorNotification
  ;

function fromPromise<GValue>(
  promise: Promise<GValue>,
): IObservable<IObservableFromPromiseNotifications<GValue>> {
  type GNotificationsUnion = IObservableFromPromiseNotifications<GValue>;
  return (emit: IObserver<GNotificationsUnion>): IUnsubscribe => {
    let running: boolean = true;
    promise
      .then(
        (value: GValue) => {
          if (running) {
            emit(createNextNotification<GValue>(value));
          }
          if (running) {
            emit(createCompleteNotification());
          }
        },
        (error: any) => {
          if (running) {
            emit(createErrorNotification<any>(error));
          }
        }
      );
    return (): void => {
      running = false;
    };
  };
}
```

#### Consumes your notifications

```ts
const subscribe = fromPromise(Promise.resolve(5));

subscribe((notification: IObservableFromPromiseNotifications<number>) => {
  switch (notification.name) {
    case 'next':
      console.log('next', notification.value);
      break;
    case 'complete':
      console.log('resolved');
      break;
    case 'error':
      console.log('rejected', notification.value);
      break;
  }
});
```

Output:

```text
next: 5
resolved
```

You may also use [notificationObserver](./notification-observer.ts) if you prefer:

```ts
function notificationObserver<GNotificationsUnion extends IGenericNotification>(
  map: TInferNotificationsObserverMapFromNotificationsUnion<GNotificationsUnion>,
): IObserver<GNotificationsUnion>
```

```ts
subscribe(
  notificationObserver({
    next: (value: number) => {
      console.log('next', value);
    },
    complete: () => {
      console.log('resolved');
    },
    error: (error: any) => {
      console.log('rejected', error);
    },
  }),
);
```

[//]: # (Or even shorter:)

[//]: # ()
[//]: # (```ts)

[//]: # (subscribe&#40;)

[//]: # (  defaultNotificationObserver&#40;)

[//]: # (    &#40;value: number&#41; => {)

[//]: # (      console.log&#40;'next', value&#41;;)

[//]: # (    },)

[//]: # (    &#40;&#41; => {)

[//]: # (      console.log&#40;'resolved'&#41;;)

[//]: # (    },)

[//]: # (    &#40;error: any&#41; => {)

[//]: # (      console.log&#40;'rejected', error&#41;;)

[//]: # (    },)

[//]: # (  &#41;,)

[//]: # (&#41;;)

[//]: # (```)

