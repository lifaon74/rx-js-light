## Observable

```ts
interface IObservable<GValue> {
  (emit: IObserver<GValue>): IUnsubscribe;
}

interface IUnsubscribe {
  (): void;
}
```

An *Observable* emits values when subscribed, and stops when unsubscribed.

This is equivalent to a *push source*, a *[RxJS Observable](https://rxjs-dev.firebaseapp.com/guide/observable)*
or somehow an *[EventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)*.

**INFO:** it's common to have your Observables ending with `$`. Ex: `value$ = of(1, 2, 3)`

### Examples

#### Observable which emits 'void' every 500ms when subscribed

```ts
const subscribe: IObservable<void> = (emit: IObserver<void>): IUnsubscribe => {
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
