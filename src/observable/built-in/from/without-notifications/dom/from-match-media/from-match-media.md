## fromMatchMedia

```ts
function fromMatchMedia(
  query: string,
): IObservable<boolean>
```

Creates an Observable that emits true if the window matches `query` (a css @media query).

### Examples

#### Body's background color is green when window width is greater than 600px, else it's red

```ts
const subscribe = fromMatchMedia('(max-width: 600px)');

subscribe((matches: boolean) => {
  document.body.style.backgroundColor = matches
    ? 'red'
    : 'green';
});
```


