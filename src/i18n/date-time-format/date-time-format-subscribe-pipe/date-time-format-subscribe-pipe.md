## dateTimeFormatSubscribePipe

```ts
function dateTimeFormatSubscribePipe(
  locales: ISubscribeFunction<ILocales>,
  options: ISubscribeFunction<IDateTimeFormatOptions>,
): ISubscribePipeFunction<IDateTimeFormatValue, string>
```

This SubscribePipe formats incoming number or date values into strings according to a locale and some configuration.

---

```ts
function dateTimeShortcutFormatSubscribePipe(
  locales: ISubscribeFunction<ILocales>,
  format: ISubscribeFunction<IDateTimeShortcutFormat>,
): ISubscribePipeFunction<IDateTimeFormatValue, string>
```

Like `dateTimeFormatSubscribePipe` but accepts a `IDateTimeShortcutFormat` instead.

`format` is similar to the [angular date pipe](https://angular.io/api/common/DatePipe)

### Examples

#### Display current date

```ts
const $locales$ = createLocalesSource();

const dateTimeText$ = pipeSubscribeFunction(interval(1000), [
  mapSubscribePipe<void, number>(() => Date.now()),
  dateTimeShortcutFormatSubscribePipe($locales$.subscribe, of<IDateTimeShortcutFormat>('medium')),
]);


dateTimeText$((value: string) => {
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

