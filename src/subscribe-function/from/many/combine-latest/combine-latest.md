## combineLatest

```ts
function combineLatest<GSubscribeFunctions extends readonly IGenericSubscribeFunction[]>(
  subscribeFunctions: GSubscribeFunctions,
): ISubscribeFunction<ICombineLatestSubscribeFunctionsValues<GSubscribeFunctions>>
```

`combineLatest` combines the values from all the SubscribeFunctions passed as arguments.
This is done by subscribing to each SubscribeFunction in order and, whenever any SubscribeFunction emits,
collecting an array of the most recent values from each SubscribeFunction.
So if you pass *n* SubscribeFunctions, the returned SubscribeFunction will always emit an array of *n* values,
in order corresponding to order of passed SubscribeFunctions (value from the first SubscribeFunction on the first place and so on).

### Examples

#### Example 1

```ts

// observable with generates 0, 1, 2, 3,... every 500ms
let i: number = 0;
const obs1 = pipeSubscribeFunction(interval(500), [
  mapSubscribePipe<void, number>(() => i++),
]);

// observable with generates 'a', 'b', 'c',... every 500ms
let j: number = 97;
const obs2 = pipeSubscribeFunction(interval(500), [
  mapSubscribePipe<void, string>(() => String.fromCharCode(j++)),
]);

const subscribe = combineLatest([obs1, obs2]);

let startTime: number = Date.now();
subscribe((result) => {
  console.log(`${ (Date.now() - startTime).toString(10) }ms`, result);
})
```

Output:

```text
500ms: [0, 'a']

1000ms: [1, 'a']
1000ms: [1, 'b']

1500ms: [2, 'b']
1500ms: [2, 'c']
```
