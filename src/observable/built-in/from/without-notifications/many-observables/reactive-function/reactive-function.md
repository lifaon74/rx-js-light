## reactiveFunction

```ts
function reactiveFunction<GFunction extends IGenericFunction>(
  observables: IReactiveFunctionObservables<GFunction>,
  fnc: GFunction,
): IReactiveFunctionReturn<GFunction>;
```

Used to create a *"reactive function"* from a list of Observables: when an Observable changes, the function
is called, and the return is emitted.

It simply does:

```ts
pipeObservable(combineLatest<GObservables>(subscribeFunctions), [
  mapObservablePipe<GCombineLastObservables, GOut>((args: GCombineLastObservables) => fnc(...(args as any))),
]);
```

Build-in ReactiveFunctions may be found in the [build-in](built-in) folder.

### Examples

#### Perform the "sum" of two Observables

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

⚠️ You should avoid using a lot of ReactiveFunctions when you could juste create one:

```text
((obs1 + obs2) * obs3) === obs4
```

```ts
// AVOID
reactiveEqual(reactiveMultiply(reactiveAdd(obs1, obs2), obs3), obs4)

// PREFER
reactiveFunction(
  [obs1, obs2, obs3, obs4],
  (obs1, obs2, obs3, obs4) => {
    return ((obs1 + ob2) * obs3) === obs4;
  },
);

```
