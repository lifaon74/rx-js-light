# Notifications replace RxJS events

RxJS's Observables may emit 3 kind of events: `next`, `complete` and `error`.

rx-js-light, uses *Notification* instead.

This choice is due to a simple observation: most Observables do not have a final state.
They just send values until we unsubscribe, so a `complete` or `error` is unnecessary.
Having such states, impact negatively RxJS: the bundle size is increased, end the overall performances are decreased.

Moreover, some *Observables* may want to emit more than this 3 *events*: we may imagine an XHR
Observable which emits an `upload-progress` and `download-progress` *events*.

So rx-js-light took the bet to use only *Notifications*.

## Definition of a Notification

```ts
interface INotification<GName extends string, GValue> {
  readonly name: GName;
  readonly value: GValue;
}
```

Instead of emitting values, you'll emit some *Notification*. They will cary for you a value and a state.

For example, the `subscriber.next()` is replaced by a `INextNotification`

## How to create a Notification ?

To create a Notification, you may use a plain object `{ name, value }` or use the
function [createNotification](../../misc/notifications/create-notification.ts):

```ts
function createNotification<GName extends string, GValue>(
  name: GName,
  value: GValue,
): INotification<GName, GValue>;
```

Moreover, some pre-existing *Notifications* may be found in [built-in](../../misc/notifications/built-in)


## Example of an Observable based on a Promise and emitting some Notifications

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

## How to consume your notifications ?

It's simple: you just have to `switch` on the received notification's name, and perform the action you want:

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

You may also use the function [notificationObserver](../../misc/notifications/notification-observer.ts) if you prefer:

```ts
function notificationObserver<GNotificationsUnion extends IGenericNotification>(
  map: IInferNotificationsObserverMapFromNotificationsUnion<GNotificationsUnion>,
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
  })
);
```

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
