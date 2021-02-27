## SubscribeFunction

```ts
interface ISubscribeFunction<GValue> {
  (emit: IEmitFunction<GValue>): IUnsubscribeFunction;
}

interface IUnsubscribeFunction {
  (): void;
}
```

A *SubscribeFunction* emits values when subscribed, and stops when unsubscribed.

This is equivalent to a *push source*, an *[Observable](https://rxjs-dev.firebaseapp.com/guide/observable)*
or somehow an *[EventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)*.

### Examples

#### SubscribeFunction which emits 'void' every 500ms when subscribed*

```ts
const subscribe: ISubscribeFunction<void> = (emit: IEmitFunction<void>): IUnsubscribeFunction => {
  const timer: any = setInterval(() => emit(), 500);
  return (): void => {
    clearInterval(timer);
  };
};

const unsubscribe = subscribe(() => {
  console.log('tick');
});

setTimeout(unsubscribe, 2100);
```

Output:

```text
tick
tick
tick
tick
```

##### RxJS equivalent

```ts
new Observable<void>((subscriber) => {
  const timer: any = setInterval(() => subscriber.next(), 500);
  return (): void => {
    clearInterval(timer);
  };
});
```
