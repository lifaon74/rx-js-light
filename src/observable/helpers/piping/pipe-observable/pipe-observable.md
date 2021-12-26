## pipeObservable or pipe$$

```ts
function pipeObservable<
  GObservable extends IGenericObservable,
  GFunctions extends IObservablePipeConstraint<GObservable, GFunctions>
>(
  subscribe: GObservable,
  fns: GFunctions,
): IObservablePipeReturn<GObservable, GFunctions>
```

This function allows you to pipe (chain) an [Observable](../../../type/observable.md)
with many [ObservablePipes](../../../pipes/type/observable-pipe.md).

This is equivalent the RxJS [Observable.pipe](https://rxjs-dev.firebaseapp.com/api/index/class/Observable#pipe) method.

### Examples

#### ObservablePipe which keeps only positive numbers and convert them to strings

```ts
const subscribe = pipeObservable(of(-2, -1, 0, 1, 2), [
  filterObservablePipe<number, number>((value: number): boolean => (value >= 0)),
  mapObservablePipe<number, string>((value: number): string => value.toString(10)),
]);

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
of(-2, -1, 0, 1, 2)
  .pipe(
    filter<number>((value: number): boolean => (value >= 0)),
    map<number, string>((value: number): string => value.toString(10)),
  )
  .subscribe((value: string) => {
    console.log(value);
  });
```
