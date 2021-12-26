## toAsyncIterable

```ts
function toAsyncIterable<GValue>(
  subscribe: IObservable<IObservableToAsyncGeneratorNotifications<GValue>>,
): AsyncGenerator<GValue>
```

Converts an Observable into an async iterable.

The Observable must emit the following Notifications:

- `next`: the values to yield
- `complete`: ends the async iterable (`done === true`)
- `error`: throws into the async iterable

**NOTE:** if you want to iterate calling `.next` instead of using `for await`, and want to break/throw/return before the AsyncIterable is `done`,
you'll have to call `.return` or `.throw` to unsubscribe from the original Observable. See example below.

### Examples

#### Yield values from 0 to 3 every 500ms

```ts
// simple function returning a Promise resolved after 'timeout' ms
function sleep(timeout: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, timeout));
}

// creates an observables from an AsyncIterable which sends values from 0 to 3 every 500ms
const values$ = fromAsyncIterable((async function * () {
  for (let i = 0; i < 4; i++) {
    await sleep(500);
    console.log('emit', i);
    yield i;
  }
})());

// tranforms this Observable into an AsyncIterable
const iterable = toAsyncIterable(values$);
```

```ts
// iterates using <for await>
for await (const value of iterable) {
  console.log('receive', value);
}
```

Output:

```text
emit 0
receive 0
emit 1
receive 1
emit 2
receive 2
emit 3
receive 3
```

#### Yield values from 0 to Infinity every 500ms, and break on the second iteration

```ts
// creates an observables from an AsyncIterable which sends values from 0 to Infinity every 500ms
const values$ = fromAsyncIterable((async function * () {
    let i = 0;
    while (true) {
      await sleep(500);
      console.log('emit', i);
      yield i;
      i++;
    }
  })());
```

```ts
let i = 0;
for await (const value of iterable) {
  console.log('receive', value);
  if (++i >= 2) {
    break;
  }
}
```

Output:

```text
emit 0
receive 0
emit 1
receive 1
// unsubscribe automatically
emit 2
```

If you want to use `.next` instead of `for await`, you'll have to call `.return` or `.throw`:

```ts
let i = 0;
let result: IteratorResult<number>;
while (!(result = await iterable.next()).done) {
  console.log('receive', result.value);
  if (++i >= 2) {
    // WARN: it's important to .return ot .throw the iterable to free resources from the original Observable
    await iterable.return(void 0);
    break;
  }
}
```

Output:

```text
emit 0
receive 0
emit 1
receive 1
// unsubscribe automatically
emit 2
```

If you don't, the original Observable will continue to send its values:

```text
emit 0
receive 0
emit 1
receive 1
// not unsubscribed
emit 2
emit 3
emit 4
...
```
