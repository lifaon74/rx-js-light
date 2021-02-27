## Subscription

```ts
interface ISubscription<GValue> {
  readonly subscribe: ISubscribeFunction<GValue>;
  readonly emit: IEmitFunction<GValue>;

  isActivated(): boolean;

  activate(): this;

  deactivate(): this;

  toggle(activate?: boolean): this;
}
```

```ts
interface ISubscriptionConstructor {
  new<GValue>(
    subscribe: ISubscribeFunction<GValue>,
    emit: IEmitFunction<GValue>,
  ): ISubscription<GValue>;
}
```

An *Subscription* is used to link a *SubscribeFunction* with an *EmitFunction* using an `activate`/`deactivate` mechanism.

### Examples

#### Toggle a 'mousemove' SubscribeFunction on 'click'

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

