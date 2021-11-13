## Subscription

```ts
interface ISubscription<GValue> {
  readonly subscribe: IObservable<GValue>;
  readonly emit: IObserver<GValue>;

  isActivated(): boolean;

  activate(): this;

  deactivate(): this;

  toggle(activate?: boolean): this;
}
```

```ts
interface ISubscriptionConstructor {
  new<GValue>(
    subscribe: IObservable<GValue>,
    emit: IObserver<GValue>,
  ): ISubscription<GValue>;
}
```

An *Subscription* is used to link a *Observable* with an *Observer* using an `activate`/`deactivate`
mechanism.

### Examples

#### Toggle a 'mousemove' Observable on 'click'

```ts
const subscription = new Subscription(
  fromEventTarget(window, 'mousemove'),
  (event: MouseEvent) => {
    console.log(event.clientX, event.clientY);
  },
);

const subscribe = fromEventTarget(window, 'click');

subscribe(() => {
  subscription.toggle();
});
```

