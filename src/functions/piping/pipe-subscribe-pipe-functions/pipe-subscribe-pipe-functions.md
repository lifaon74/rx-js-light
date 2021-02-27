## pipeSubscribePipeFunctions

```ts
function pipeSubscribePipeFunctions<// generics
  GFunctions extends ISubscribePipeFunctionPipeConstraint<GFunctions>
  //
  >(
  fns: GFunctions
): IPipeSubscribePipeFunctionsReturn<GFunctions>
```

This function allows you to pipe (chain) many [SubscribePipeFunction](../../../types/subscribe-pipe-function/subscribe-pipe-function.md).

This is equivalent the RxJS [pipe](https://rxjs-dev.firebaseapp.com/api/index/function/pipe) function

### Examples

#### SubscribePipe which keeps only positive numbers and convert them to strings

```ts
const subscribePipe = pipeSubscribePipeFunctions([
  filterSubscribePipe<number, number>((value: number): value is number => (value >= 0)),
  mapSubscribePipe<number, string>((value: number) => value.toString(10)),
]);

const subscribe = subscribePipe(of(-2, -1, 0, 1, 2));

const unsubscribe = subscribe((value: string) => {
  console.log(value);
});
```

Output:

```text
0
1
2
```

##### RxJS equivalent

```ts
pipe(
  filter<number>((value: number): boolean => (value >= 0)),
  map<number, string>((value: number) => value.toString(10)),
);
```
