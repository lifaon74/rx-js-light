## toPromiseLast

```ts
function toPromiseLast<GValue>(
  subscribe: ISubscribeFunction<ISubscribeFunctionToPromiseNotifications<GValue>>,
  options?: ISubscribeFunctionToPromiseOptions
): Promise<GValue>
```

Converts a SubscribeFunction into a Promise.

It's similar to [toPromiseAll](../all/to-promise-all.md) but returns the last received `next` value instead of an Array.

### Examples

#### Simple http request

```ts
toPromise(fromFetch('https://some-url.site'))
  .then((response: Response) => {
    console.log(response.statusText);
  });
```

#### Simple http request aborted

```ts
const controller = new AbortController();

toPromise(fromFetch('https://some-url.site'), { signal: controller.signal })
  .then((response: Response) => {
    console.log(response.statusText);
  });

controller.abort(); // the request is properly aborted
```

