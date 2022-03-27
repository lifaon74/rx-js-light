
## 2.3.0 (unreleased)

### What's new ?

- add `takeUntilObservable`
- 
- add `fromFetchText` and `fromFetchStream`
- 
- add `createLogObserver` and `$log`

- add `defaultNotificationObserver`

- add `open` and `close` Notifications
- 
- add `IOStream` - **WARN** experimental (could change in the future)

### Breaking changes

- rework the `ICustomError`


## 2.2.0 (2022-02-09)

### What's new ?

- improved documentation:
  - add sequential diagrams for many Observables and pipes
  - add `ofWithNotifications` doc
  - add `ReplaySource` doc
  - add `Should I use Observables ?` doc


- improve `fromAsyncIterator`: when unsubscribed, the method `return` is called on the iterator.
it allows `try { ... yield ... } finally { ... }` to enter into the `finally` as expected .

- add `findObservablePipe`

- add `raceWithNotifications`


## 2.1.0 (2021-12-26)

### What's new ?

- improved documentation: update tutorial and many functions' documentation.

- `conditionalObservable` now only subscribes/unsubscribes on **distinct** values received from its `condition`

- add `emptyWithNotifications`

- add `singleWithNotifications`

- add `forkJoin`

- add many shortcuts for Observables emitting Notifications => ends with `N`

- add `thenObservablePipe` and its derivatives to pipe Notifications

- add `ReplaySource`

- add `debounceMicrotaskObservablePipe`

- add `toAsyncIterable`

- add `fromFetchJSON`

- add `takeObservablePipe`

- add `firstObservablePipe`


