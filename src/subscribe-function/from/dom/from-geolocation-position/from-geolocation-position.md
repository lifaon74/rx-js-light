## fromGeolocationPosition

```ts
function fromGeolocationPosition(
  options?: PositionOptions
): ISubscribeFunction<ISubscribeFunctionFromGeolocationPositionNotifications>
```

Creates a SubscribeFunction that emits the geolocation position of the user.

### Examples

#### Prints the user's position

```ts

const subscribe = fromGeolocationPosition();

subscribe(notificationObserver({
  next: (position: GeolocationPosition) => {
    console.log(position);
  },
}));
```


