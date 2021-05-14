## reactiveFunction

```ts
function reactiveFunction<GFunction extends IGenericFunction>(
  subscribeFunctions: IReactiveFunctionSubscribeFunctions<GFunction>,
  fnc: GFunction,
): IReactiveFunctionReturn<GFunction>;
```

Used to create a *"reactive function"* from a list of SubscribeFunctions: when a SubscribeFunction changes, the function
is called, and the return is emitted.

It simply does:

```ts
pipeSubscribeFunction(combineLatest<GSubscribeFunctions>(subscribeFunctions), [
  mapSubscribePipe<GCombineLastSubscribeFunctions, GOut>((args: GCombineLastSubscribeFunctions) => fnc(...(args as any))),
]);
```

Build-in ReactiveFunctions may be found in the [build-in](./built-in) folder.

### Examples

#### Perform the "sum" of two SubscribeFunctions

```ts

const obs1 = createMulticastReplayLastSource<number>({ initialValue: 0 });
const obs2 = createMulticastReplayLastSource<number>({ initialValue: 0 });

const subscribe = reactiveFunction(
  [obs1.subscribe, obs2.subscribe],
  (a: number, b: number) => {
    return a + b;
  },
);

subscribe((sum: number) => {
  console.log(sum);
});
// => 0
obs1.emit(2); // => 2
obs2.emit(1); // => 3

```

Output:

```text
0
2
3
```

---

⚠️ Avoid using a log of ReactiveFunctions when you could juste create one:

```text
((obs1 + obs2) * obs3) === obs4
```

```ts
// DONT
reactiveEqual(reactiveMultiply(reactiveAdd(obs1, obs2), obs3), obs4)

// DO
reactiveFunction(
  [obs1, obs2, obs3, obs4],
  (obs1, obs2, obs3, obs4) => {
    return ((obs1 + ob2) * obs3) === obs4;
  },
);

```
