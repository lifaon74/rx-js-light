*Example:*

```ts
function interval(
  period: number,
): ISubscribeFunction<number> {
  return (emit: IEmitFunction<number>): IUnsubscribeFunction => {
    console.log('interval started');
    let count: number = 0;
    const timer: any = setInterval(() => emit(count++), period);
    return (): void => {
      clearInterval(timer);
      console.log('interval stopped');
    };
  };
}

const subscribe = interval(500);

const unsubscribe = subscribe((value: number) => {
  console.log('tick', value);
});

setTimeout(unsubscribe, 1100);
```

Output:

```text
interval started
tick 0
tick 1
interval stopped
```
