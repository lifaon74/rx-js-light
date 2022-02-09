## mapObservablePipe or map$$$

```ts
function mapObservablePipe<GIn, GOut>(
  mapFunction: IMapFunction<GIn, GOut>,
): IObservablePipe<GIn, GOut>
```

Applies a given `mapFunction` function to each value emitted by the source Observable, and emits the resulting values as an Observable.

The RxJS equivalent is [map](https://rxjs-dev.firebaseapp.com/api/operators/map)

### Diagram

[![](https://mermaid.ink/img/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG5cbnBhcnRpY2lwYW50IG9ic2VydmFibGVcbnBhcnRpY2lwYW50IG1hcE9ic2VydmFibGVQaXBlIGFzIG1hcE9ic2VydmFibGVQaXBlKHggPT4geCAqIDEwKVxucGFydGljaXBhbnQgT1VUXG5cbnJlY3QgcmdiKDE5MSwgMjIzLCAyNTUpXG5vYnNlcnZhYmxlLT4-bWFwT2JzZXJ2YWJsZVBpcGU6IHZhbHVlXG5Ob3RlIG92ZXIgbWFwT2JzZXJ2YWJsZVBpcGU6IGNhbGxzIG1hcEZ1bmN0aW9uKHZhbHVlKVxubWFwT2JzZXJ2YWJsZVBpcGUtLT4-T1VUOiB2YWx1ZSByZXR1cm5lZCBieSBtYXBGdW5jdGlvblxuZW5kXG5cbm9ic2VydmFibGUtPj5tYXBPYnNlcnZhYmxlUGlwZTogMVxubWFwT2JzZXJ2YWJsZVBpcGUtPj5PVVQ6IDEwXG5cbm9ic2VydmFibGUtPj5tYXBPYnNlcnZhYmxlUGlwZTogMlxubWFwT2JzZXJ2YWJsZVBpcGUtPj5PVVQ6IDIwXG5cbm9ic2VydmFibGUtPj5tYXBPYnNlcnZhYmxlUGlwZTogM1xubWFwT2JzZXJ2YWJsZVBpcGUtPj5PVVQ6IDMwXG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCIsInRoZW1lVmFyaWFibGVzIjp7ImJhY2tncm91bmQiOiJ3aGl0ZSIsInByaW1hcnlDb2xvciI6IiNFQ0VDRkYiLCJzZWNvbmRhcnlDb2xvciI6IiNmZmZmZGUiLCJ0ZXJ0aWFyeUNvbG9yIjoiaHNsKDgwLCAxMDAlLCA5Ni4yNzQ1MDk4MDM5JSkiLCJwcmltYXJ5Qm9yZGVyQ29sb3IiOiJoc2woMjQwLCA2MCUsIDg2LjI3NDUwOTgwMzklKSIsInNlY29uZGFyeUJvcmRlckNvbG9yIjoiaHNsKDYwLCA2MCUsIDgzLjUyOTQxMTc2NDclKSIsInRlcnRpYXJ5Qm9yZGVyQ29sb3IiOiJoc2woODAsIDYwJSwgODYuMjc0NTA5ODAzOSUpIiwicHJpbWFyeVRleHRDb2xvciI6IiMxMzEzMDAiLCJzZWNvbmRhcnlUZXh0Q29sb3IiOiIjMDAwMDIxIiwidGVydGlhcnlUZXh0Q29sb3IiOiJyZ2IoOS41MDAwMDAwMDAxLCA5LjUwMDAwMDAwMDEsIDkuNTAwMDAwMDAwMSkiLCJsaW5lQ29sb3IiOiIjMzMzMzMzIiwidGV4dENvbG9yIjoiIzMzMyIsIm1haW5Ca2ciOiIjRUNFQzAwIiwic2Vjb25kQmtnIjoiI2ZmZmZkZSIsImJvcmRlcjEiOiIjOTM3MERCIiwiYm9yZGVyMiI6IiNhYWFhMzMiLCJhcnJvd2hlYWRDb2xvciI6IiMzMzMzMzMiLCJmb250RmFtaWx5IjoiXCJ0cmVidWNoZXQgbXNcIiwgdmVyZGFuYSwgYXJpYWwiLCJmb250U2l6ZSI6IjE2cHgiLCJsYWJlbEJhY2tncm91bmQiOiIjZThlOGU4Iiwibm9kZUJrZyI6IiNFQ0VDRkYiLCJub2RlQm9yZGVyIjoiIzkzNzBEQiIsImNsdXN0ZXJCa2ciOiIjZmZmZmRlIiwiY2x1c3RlckJvcmRlciI6IiNhYWFhMzMiLCJkZWZhdWx0TGlua0NvbG9yIjoiIzMzMzMzMyIsInRpdGxlQ29sb3IiOiIjMzMzIiwiZWRnZUxhYmVsQmFja2dyb3VuZCI6IiNlOGU4ZTgiLCJhY3RvckJvcmRlciI6ImhzbCgyNTkuNjI2MTY4MjI0MywgNTkuNzc2NTM2MzEyOCUsIDg3LjkwMTk2MDc4NDMlKSIsImFjdG9yQmtnIjoiI0VDRUNGRiIsImFjdG9yVGV4dENvbG9yIjoiYmxhY2siLCJhY3RvckxpbmVDb2xvciI6ImdyZXkiLCJzaWduYWxDb2xvciI6IiMzMzMiLCJzaWduYWxUZXh0Q29sb3IiOiIjMzMzIiwibGFiZWxCb3hCa2dDb2xvciI6IiNFQ0VDRkYiLCJsYWJlbEJveEJvcmRlckNvbG9yIjoiaHNsKDI1OS42MjYxNjgyMjQzLCA1OS43NzY1MzYzMTI4JSwgODcuOTAxOTYwNzg0MyUpIiwibGFiZWxUZXh0Q29sb3IiOiJibGFjayIsImxvb3BUZXh0Q29sb3IiOiJibGFjayIsIm5vdGVCb3JkZXJDb2xvciI6IiNhYWFhMzMiLCJub3RlQmtnQ29sb3IiOiIjZmZmNWFkIiwibm90ZVRleHRDb2xvciI6ImJsYWNrIiwiYWN0aXZhdGlvbkJvcmRlckNvbG9yIjoiIzY2NiIsImFjdGl2YXRpb25Ca2dDb2xvciI6IiNmNGY0ZjQiLCJzZXF1ZW5jZU51bWJlckNvbG9yIjoid2hpdGUiLCJzZWN0aW9uQmtnQ29sb3IiOiJyZ2JhKDEwMiwgMTAyLCAyNTUsIDAuNDkpIiwiYWx0U2VjdGlvbkJrZ0NvbG9yIjoid2hpdGUiLCJzZWN0aW9uQmtnQ29sb3IyIjoiI2ZmZjQwMCIsInRhc2tCb3JkZXJDb2xvciI6IiM1MzRmYmMiLCJ0YXNrQmtnQ29sb3IiOiIjOGE5MGRkIiwidGFza1RleHRMaWdodENvbG9yIjoid2hpdGUiLCJ0YXNrVGV4dENvbG9yIjoid2hpdGUiLCJ0YXNrVGV4dERhcmtDb2xvciI6ImJsYWNrIiwidGFza1RleHRPdXRzaWRlQ29sb3IiOiJibGFjayIsInRhc2tUZXh0Q2xpY2thYmxlQ29sb3IiOiIjMDAzMTYzIiwiYWN0aXZlVGFza0JvcmRlckNvbG9yIjoiIzUzNGZiYyIsImFjdGl2ZVRhc2tCa2dDb2xvciI6IiNiZmM3ZmYiLCJncmlkQ29sb3IiOiJsaWdodGdyZXkiLCJkb25lVGFza0JrZ0NvbG9yIjoibGlnaHRncmV5IiwiZG9uZVRhc2tCb3JkZXJDb2xvciI6ImdyZXkiLCJjcml0Qm9yZGVyQ29sb3IiOiIjZmY4ODg4IiwiY3JpdEJrZ0NvbG9yIjoicmVkIiwidG9kYXlMaW5lQ29sb3IiOiJyZWQiLCJsYWJlbENvbG9yIjoiYmxhY2siLCJlcnJvckJrZ0NvbG9yIjoiIzU1MjIyMiIsImVycm9yVGV4dENvbG9yIjoiIzU1MjIyMiIsImNsYXNzVGV4dCI6IiMxMzEzMDAiLCJmaWxsVHlwZTAiOiIjRUNFQ0ZGIiwiZmlsbFR5cGUxIjoiI2ZmZmZkZSIsImZpbGxUeXBlMiI6ImhzbCgzMDQsIDEwMCUsIDk2LjI3NDUwOTgwMzklKSIsImZpbGxUeXBlMyI6ImhzbCgxMjQsIDEwMCUsIDkzLjUyOTQxMTc2NDclKSIsImZpbGxUeXBlNCI6ImhzbCgxNzYsIDEwMCUsIDk2LjI3NDUwOTgwMzklKSIsImZpbGxUeXBlNSI6ImhzbCgtNCwgMTAwJSwgOTMuNTI5NDExNzY0NyUpIiwiZmlsbFR5cGU2IjoiaHNsKDgsIDEwMCUsIDk2LjI3NDUwOTgwMzklKSIsImZpbGxUeXBlNyI6ImhzbCgxODgsIDEwMCUsIDkzLjUyOTQxMTc2NDclKSJ9fSwidXBkYXRlRWRpdG9yIjpmYWxzZSwiYXV0b1N5bmMiOnRydWUsInVwZGF0ZURpYWdyYW0iOmZhbHNlfQ)](https://mermaid-js.github.io/mermaid-live-editor/edit/#eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG5cbnBhcnRpY2lwYW50IG9ic2VydmFibGVcbnBhcnRpY2lwYW50IG1hcE9ic2VydmFibGVQaXBlIGFzIG1hcE9ic2VydmFibGVQaXBlKHggPT4geCAqIDEwKVxucGFydGljaXBhbnQgT1VUXG5cbnJlY3QgcmdiKDE5MSwgMjIzLCAyNTUpXG5vYnNlcnZhYmxlLT4-bWFwT2JzZXJ2YWJsZVBpcGU6IHZhbHVlXG5Ob3RlIG92ZXIgbWFwT2JzZXJ2YWJsZVBpcGU6IGNhbGxzIG1hcEZ1bmN0aW9uKHZhbHVlKVxubWFwT2JzZXJ2YWJsZVBpcGUtLT4-T1VUOiB2YWx1ZSByZXR1cm5lZCBieSBtYXBGdW5jdGlvblxuZW5kXG5cbm9ic2VydmFibGUtPj5tYXBPYnNlcnZhYmxlUGlwZTogMVxubWFwT2JzZXJ2YWJsZVBpcGUtPj5PVVQ6IDEwXG5cbm9ic2VydmFibGUtPj5tYXBPYnNlcnZhYmxlUGlwZTogMlxubWFwT2JzZXJ2YWJsZVBpcGUtPj5PVVQ6IDIwXG5cbm9ic2VydmFibGUtPj5tYXBPYnNlcnZhYmxlUGlwZTogM1xubWFwT2JzZXJ2YWJsZVBpcGUtPj5PVVQ6IDMwXG4iLCJtZXJtYWlkIjoie1xuICBcInRoZW1lXCI6IFwiZGVmYXVsdFwiLFxuICBcInRoZW1lVmFyaWFibGVzXCI6IHtcbiAgICBcImJhY2tncm91bmRcIjogXCJ3aGl0ZVwiLFxuICAgIFwicHJpbWFyeUNvbG9yXCI6IFwiI0VDRUNGRlwiLFxuICAgIFwic2Vjb25kYXJ5Q29sb3JcIjogXCIjZmZmZmRlXCIsXG4gICAgXCJ0ZXJ0aWFyeUNvbG9yXCI6IFwiaHNsKDgwLCAxMDAlLCA5Ni4yNzQ1MDk4MDM5JSlcIixcbiAgICBcInByaW1hcnlCb3JkZXJDb2xvclwiOiBcImhzbCgyNDAsIDYwJSwgODYuMjc0NTA5ODAzOSUpXCIsXG4gICAgXCJzZWNvbmRhcnlCb3JkZXJDb2xvclwiOiBcImhzbCg2MCwgNjAlLCA4My41Mjk0MTE3NjQ3JSlcIixcbiAgICBcInRlcnRpYXJ5Qm9yZGVyQ29sb3JcIjogXCJoc2woODAsIDYwJSwgODYuMjc0NTA5ODAzOSUpXCIsXG4gICAgXCJwcmltYXJ5VGV4dENvbG9yXCI6IFwiIzEzMTMwMFwiLFxuICAgIFwic2Vjb25kYXJ5VGV4dENvbG9yXCI6IFwiIzAwMDAyMVwiLFxuICAgIFwidGVydGlhcnlUZXh0Q29sb3JcIjogXCJyZ2IoOS41MDAwMDAwMDAxLCA5LjUwMDAwMDAwMDEsIDkuNTAwMDAwMDAwMSlcIixcbiAgICBcImxpbmVDb2xvclwiOiBcIiMzMzMzMzNcIixcbiAgICBcInRleHRDb2xvclwiOiBcIiMzMzNcIixcbiAgICBcIm1haW5Ca2dcIjogXCIjRUNFQzAwXCIsXG4gICAgXCJzZWNvbmRCa2dcIjogXCIjZmZmZmRlXCIsXG4gICAgXCJib3JkZXIxXCI6IFwiIzkzNzBEQlwiLFxuICAgIFwiYm9yZGVyMlwiOiBcIiNhYWFhMzNcIixcbiAgICBcImFycm93aGVhZENvbG9yXCI6IFwiIzMzMzMzM1wiLFxuICAgIFwiZm9udEZhbWlseVwiOiBcIlxcXCJ0cmVidWNoZXQgbXNcXFwiLCB2ZXJkYW5hLCBhcmlhbFwiLFxuICAgIFwiZm9udFNpemVcIjogXCIxNnB4XCIsXG4gICAgXCJsYWJlbEJhY2tncm91bmRcIjogXCIjZThlOGU4XCIsXG4gICAgXCJub2RlQmtnXCI6IFwiI0VDRUNGRlwiLFxuICAgIFwibm9kZUJvcmRlclwiOiBcIiM5MzcwREJcIixcbiAgICBcImNsdXN0ZXJCa2dcIjogXCIjZmZmZmRlXCIsXG4gICAgXCJjbHVzdGVyQm9yZGVyXCI6IFwiI2FhYWEzM1wiLFxuICAgIFwiZGVmYXVsdExpbmtDb2xvclwiOiBcIiMzMzMzMzNcIixcbiAgICBcInRpdGxlQ29sb3JcIjogXCIjMzMzXCIsXG4gICAgXCJlZGdlTGFiZWxCYWNrZ3JvdW5kXCI6IFwiI2U4ZThlOFwiLFxuICAgIFwiYWN0b3JCb3JkZXJcIjogXCJoc2woMjU5LjYyNjE2ODIyNDMsIDU5Ljc3NjUzNjMxMjglLCA4Ny45MDE5NjA3ODQzJSlcIixcbiAgICBcImFjdG9yQmtnXCI6IFwiI0VDRUNGRlwiLFxuICAgIFwiYWN0b3JUZXh0Q29sb3JcIjogXCJibGFja1wiLFxuICAgIFwiYWN0b3JMaW5lQ29sb3JcIjogXCJncmV5XCIsXG4gICAgXCJzaWduYWxDb2xvclwiOiBcIiMzMzNcIixcbiAgICBcInNpZ25hbFRleHRDb2xvclwiOiBcIiMzMzNcIixcbiAgICBcImxhYmVsQm94QmtnQ29sb3JcIjogXCIjRUNFQ0ZGXCIsXG4gICAgXCJsYWJlbEJveEJvcmRlckNvbG9yXCI6IFwiaHNsKDI1OS42MjYxNjgyMjQzLCA1OS43NzY1MzYzMTI4JSwgODcuOTAxOTYwNzg0MyUpXCIsXG4gICAgXCJsYWJlbFRleHRDb2xvclwiOiBcImJsYWNrXCIsXG4gICAgXCJsb29wVGV4dENvbG9yXCI6IFwiYmxhY2tcIixcbiAgICBcIm5vdGVCb3JkZXJDb2xvclwiOiBcIiNhYWFhMzNcIixcbiAgICBcIm5vdGVCa2dDb2xvclwiOiBcIiNmZmY1YWRcIixcbiAgICBcIm5vdGVUZXh0Q29sb3JcIjogXCJibGFja1wiLFxuICAgIFwiYWN0aXZhdGlvbkJvcmRlckNvbG9yXCI6IFwiIzY2NlwiLFxuICAgIFwiYWN0aXZhdGlvbkJrZ0NvbG9yXCI6IFwiI2Y0ZjRmNFwiLFxuICAgIFwic2VxdWVuY2VOdW1iZXJDb2xvclwiOiBcIndoaXRlXCIsXG4gICAgXCJzZWN0aW9uQmtnQ29sb3JcIjogXCJyZ2JhKDEwMiwgMTAyLCAyNTUsIDAuNDkpXCIsXG4gICAgXCJhbHRTZWN0aW9uQmtnQ29sb3JcIjogXCJ3aGl0ZVwiLFxuICAgIFwic2VjdGlvbkJrZ0NvbG9yMlwiOiBcIiNmZmY0MDBcIixcbiAgICBcInRhc2tCb3JkZXJDb2xvclwiOiBcIiM1MzRmYmNcIixcbiAgICBcInRhc2tCa2dDb2xvclwiOiBcIiM4YTkwZGRcIixcbiAgICBcInRhc2tUZXh0TGlnaHRDb2xvclwiOiBcIndoaXRlXCIsXG4gICAgXCJ0YXNrVGV4dENvbG9yXCI6IFwid2hpdGVcIixcbiAgICBcInRhc2tUZXh0RGFya0NvbG9yXCI6IFwiYmxhY2tcIixcbiAgICBcInRhc2tUZXh0T3V0c2lkZUNvbG9yXCI6IFwiYmxhY2tcIixcbiAgICBcInRhc2tUZXh0Q2xpY2thYmxlQ29sb3JcIjogXCIjMDAzMTYzXCIsXG4gICAgXCJhY3RpdmVUYXNrQm9yZGVyQ29sb3JcIjogXCIjNTM0ZmJjXCIsXG4gICAgXCJhY3RpdmVUYXNrQmtnQ29sb3JcIjogXCIjYmZjN2ZmXCIsXG4gICAgXCJncmlkQ29sb3JcIjogXCJsaWdodGdyZXlcIixcbiAgICBcImRvbmVUYXNrQmtnQ29sb3JcIjogXCJsaWdodGdyZXlcIixcbiAgICBcImRvbmVUYXNrQm9yZGVyQ29sb3JcIjogXCJncmV5XCIsXG4gICAgXCJjcml0Qm9yZGVyQ29sb3JcIjogXCIjZmY4ODg4XCIsXG4gICAgXCJjcml0QmtnQ29sb3JcIjogXCJyZWRcIixcbiAgICBcInRvZGF5TGluZUNvbG9yXCI6IFwicmVkXCIsXG4gICAgXCJsYWJlbENvbG9yXCI6IFwiYmxhY2tcIixcbiAgICBcImVycm9yQmtnQ29sb3JcIjogXCIjNTUyMjIyXCIsXG4gICAgXCJlcnJvclRleHRDb2xvclwiOiBcIiM1NTIyMjJcIixcbiAgICBcImNsYXNzVGV4dFwiOiBcIiMxMzEzMDBcIixcbiAgICBcImZpbGxUeXBlMFwiOiBcIiNFQ0VDRkZcIixcbiAgICBcImZpbGxUeXBlMVwiOiBcIiNmZmZmZGVcIixcbiAgICBcImZpbGxUeXBlMlwiOiBcImhzbCgzMDQsIDEwMCUsIDk2LjI3NDUwOTgwMzklKVwiLFxuICAgIFwiZmlsbFR5cGUzXCI6IFwiaHNsKDEyNCwgMTAwJSwgOTMuNTI5NDExNzY0NyUpXCIsXG4gICAgXCJmaWxsVHlwZTRcIjogXCJoc2woMTc2LCAxMDAlLCA5Ni4yNzQ1MDk4MDM5JSlcIixcbiAgICBcImZpbGxUeXBlNVwiOiBcImhzbCgtNCwgMTAwJSwgOTMuNTI5NDExNzY0NyUpXCIsXG4gICAgXCJmaWxsVHlwZTZcIjogXCJoc2woOCwgMTAwJSwgOTYuMjc0NTA5ODAzOSUpXCIsXG4gICAgXCJmaWxsVHlwZTdcIjogXCJoc2woMTg4LCAxMDAlLCA5My41Mjk0MTE3NjQ3JSlcIlxuICB9XG59IiwidXBkYXRlRWRpdG9yIjpmYWxzZSwiYXV0b1N5bmMiOnRydWUsInVwZGF0ZURpYWdyYW0iOmZhbHNlfQ)

### Examples

#### Example 1

```ts
const subscribe = pipeObservable(of(1, 2, 3), [
  mapObservablePipe(x => x * 10),
]);

subscribe((value) => {
  console.log(value);
});
```

Output:

```text
10
20
30
```