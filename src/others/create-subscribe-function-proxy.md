## createSubscribeFunctionProxy

```ts
function createSubscribeFunctionProxy<GData extends object>(
  data: ISubscribeFunction<GData>,
  path: PropertyKey[] = [],
): ISubscribeFunctionProxy<GData>
```

Creates a **"magic"** object, so read carefully:

This proxy allows you to chain an infinite virtual amount of properties, until you *get* the property `$`.
(ex: `proxy.a.b.c.d.e.f.$`)

The property `$` returns a SubscribeFunction on `data` for the *properties path* you wrote (`['a', 'b', 'c', 'd', 'e', 'f']` in our example).

When you'll emit on `data`, it will update all your subscriptions in accordance with the new values at these paths
(`undefined` if the path is invalid).

**The proxy is purely virtual:** you cannot get the real value nor set one. You may only subscribe to a *properties path*.

The purpose is to provide a simple and easy way allows us to subscribe on complex objects.


`proxy.a.b.c.$` is equivalent to:

```ts 
pipeSubscribeFunction(data, [
  mapSubscribePipe<GData, any>((data: GData) => data?.a?.b?.c),
]);
```
     
### Examples

#### Example 1

```ts
const data = {
  a: {
    b: {
      c: 'c'
    },
    b1: 'b1',
  },
};

const dataSource = createMulticastReplayLastSource({ initialValue: data });

const proxy = createSubscribeFunctionProxy(dataSource.subscribe);

proxy.a.b.c.$((value: any) => {
  console.log('c', value);
});

dataSource.emit({});
dataSource.emit({ a: 'h' });
dataSource.emit({ a: { b: { c: { d: 'd' }}}});
```

Output:

```text
c: 'c'
c: undefined
c: undefined
c: { d: 'd' }
```




