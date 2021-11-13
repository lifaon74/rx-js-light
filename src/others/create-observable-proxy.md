## createObservableProxy

```ts
function createObservableProxy<GData extends object>(
  data: IObservable<GData>,
  path: PropertyKey[] = [],
): IObservableProxy<GData>
```

Creates a **"magic"** object, so **read carefully**:

This proxy allows you to chain an infinite virtual amount of properties, until you *get* the property `$`.
(ex: `proxy.a.b.c.d.e.f.$`)

The property `$` returns a Observable on `data` for the *properties path* you
wrote (`['a', 'b', 'c', 'd', 'e', 'f']` in our example).

When you'll emit on `data`, it will update all your subscriptions in accordance with the new values at these paths
(`undefined` if the path is invalid).

**The proxy is purely virtual:** you cannot get the real value nor set one. You may only subscribe to a *properties
path*.

The purpose is to provide a simple and easy way allows us to subscribe on complex objects.

`proxy.a.b.c.$` is equivalent to:

```ts 
pipeObservable(data, [
  mapObservablePipe<GData, any>((data: GData) => data?.a?.b?.c),
]);
```

### Example

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

const proxy = createObservableProxy(dataSource.subscribe);

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

---

The proxy provides an experimental *get* `$array` property:

It returns a `IObservable<readonly IObservableProxy<any>[]>` for the provided properties' path, and
expects an array or will throw.

It is used to create a ObservableProxy on the elements of an array, allowing us to iterate over the elements of
this array and continuing to use these elements as proxy's too.

`proxy.a.b.c.$array` is similar to:

```ts 
pipeObservable(data, [
  mapObservablePipe<GData, any>((data: GData) => {
    return data.a.b.c.map(item => createObservableProxy(single(item)));
    // OR
    // return data.a.b.c.map((iten, index) => createObservableProxy(data, ['a', 'b', 'c'].concat(index)));
  }),
]);
```

This usecase is realy limited and is discouraged.

### Example

```ts

const data = {
  array: [{ value: 1 }, { value: 2 }],
};

const dataSource = createMulticastReplayLastSource({ initialValue: data });

const proxy = createObservableProxy(dataSource.subscribe);

/* THE IMPORTANT PART */

// list of unsubscriptions for the received array
const unsubscriptions: IUnsubscribe[] = [];

proxy.array.$array((items: readonly IObservableProxy<any>[]) => {
  
  const itemsLength = items.length;
  const unsubscriptionsLength = unsubscriptions.length;
  
  // if the received array's length is larger than the subscriptions we've already done
  if (unsubscriptionsLength < items.length) {
    unsubscriptions.length = itemsLength; // increase 'unsubscriptions' size
    // and only subscribe to the new ones
    for (let i = unsubscriptionsLength; i < itemsLength; i++) {
      // note that 'items[i]' is a proxy
      unsubscriptions[i] = items[i].value.$((value: any) => {
        console.log('value', value);
      });
    }
  } else {
    for (let i = itemsLength; i < unsubscriptionsLength; i++) {
      unsubscriptions[i]();
    }
    unsubscriptions.length = itemsLength;
  }
});
// outputs:
// value: 1
// value: 2

dataSource.emit({ array: [{ value: 5 }, { value: 8 }] });
// outputs:
// value: 5
// value: 8

dataSource.emit({ array: [{ value: 5 }, { value: 8 }] });
// outputs:
// value: 5
// value: 8
```


