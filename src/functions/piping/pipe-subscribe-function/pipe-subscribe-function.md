## pipeSubscribeFunction

```ts
function pipeSubscribeFunction<// generics
  GSubscribeFunction extends IGenericSubscribeFunction,
  GFunctions extends ISubscribeFunctionPipeConstraint<GSubscribeFunction, GFunctions>
  //
  >(
  subscribe: GSubscribeFunction,
  fns: GFunctions
): ISubscribeFunctionPipeReturn<GSubscribeFunction, GFunctions>
```

This function allows you to pipe (chain) a [SubscribeFunction](../../../types/subscribe-function/subscribe-function.md)
with many [SubscribePipeFunction](../../../types/subscribe-pipe-function/subscribe-pipe-function.md).

This is equivalent the RxJS [Observable.pipe](https://rxjs-dev.firebaseapp.com/api/index/class/Observable#pipe) method.

### Examples

#### SubscribePipe which keeps only positive numbers and convert them to strings

```ts
const subscribe = pipeSubscribeFunction(of(-2, -1, 0, 1, 2), [
  filterSubscribePipe<number, number>((value: number): value is number => (value >= 0)),
  mapSubscribePipe<number, string>((value: number) => value.toString(10)),
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
    map<number, string>((value: number) => value.toString(10)),
  )
  .subscribe((value: string) => {
    console.log(value);
  });
```
