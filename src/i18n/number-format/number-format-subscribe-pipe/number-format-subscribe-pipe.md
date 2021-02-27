## numberFormatSubscribePipe

```ts
function numberFormatSubscribePipe(
  locales: ISubscribeFunction<ILocales>,
  options: ISubscribeFunction<INumberFormatOptions> = of({}),
): ISubscribePipeFunction<INumberFormatValue, string>
```

This SubscribePipe formats incoming numbers into strings according to a locale and some configuration.

### Examples

#### Display a formatted price

```ts
const $locales$ = createLocalesSource();

const $price$ = createMulticastReplayLastSource();

const priceText$ = pipeSubscribeFunction($price$.subscribe, [
  numberFormatSubscribePipe($locales$.subscribe, of<INumberFormatOptions>({
    style: 'currency',
    currency: 'USD',
  })),
]);


priceText$((value: string) => {
  console.log(value);
});
```

Output:

```text
Jan 25, 2021, 1:31:53 PM
Jan 25, 2021, 1:31:54 PM
Jan 25, 2021, 1:31:55 PM
...
```

