## interval

```ts
function idle(): ISubscribeFunction<IdleDeadline>
```

Creates a SubscribeFunction that emits when idle time is available.

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

