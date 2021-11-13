## idle

```ts
function idle(
  options?: IdleRequestOptions,
): IObservable<IdleDeadline>
```

Creates an Observable that emits when idle time is available.

### Examples

#### Recurring 'ping'

```ts
const subscribe = idle();

const unsubscribe = subscribe((notification) => {
  console.log('ping');
})
```

Output:

```text
ping
ping
ping
ping
...
```

