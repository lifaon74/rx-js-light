## interval

```ts
function interval(
  period: number,
): ISubscribeFunction<void>
```


Creates a SubscribeFunction that emits void every specified interval of time.

### Examples

#### Recurring 'ping'

```ts
const subscribe = interval(1000);

const unsubscribe = subscribe((notification) => {
  console.log('ping');
})

setTiimeout(4500, unsubscribe);
```

Output:

```text
ping
ping
ping
ping
```

