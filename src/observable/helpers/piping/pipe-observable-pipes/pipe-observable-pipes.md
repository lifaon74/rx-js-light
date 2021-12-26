## pipeObservablePipes or pipe$$$

```ts
function pipeObservablePipes<// generics
  GFunctions extends IObservablePipePipeConstraint<GFunctions>
  //
  >(
  fns: GFunctions
): IPipeObservablePipesReturn<GFunctions>
```

This function allows you to pipe (chain)
many [ObservablePipes](../../../pipes/type/observable-pipe.md).

This is equivalent the RxJS [pipe](https://rxjs-dev.firebaseapp.com/api/index/function/pipe) function

### Examples

#### ObservablePipe which keeps only positive numbers and convert them to strings

```ts
const observablePipe = pipeObservablePipes([
  filterObservablePipe<number, number>((value: number): value is number => (value >= 0)),
  mapObservablePipe<number, string>((value: number) => value.toString(10)),
]);

const subscribe = observablePipe(of(-2, -1, 0, 1, 2));

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
