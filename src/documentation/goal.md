## What problems is rx-js-light trying to solve ?

### Computed variables

I'll call a *computed variable* a variable which depends on other variables:

```ts
const STATE = {
  name: 'Alice',
  count: 5,
  message: '',
};
STATE.message = `${ STATE.name } owns ${ STATE.count } cars`;
// if any of 'name' or 'count' is updated later, 'message' won't be updated
````

Having such variables, may easily lead to **INCONSISTENCY**:

If any of `name` or `count` changes, it's easy to forget to update `message`, creating a potential incoherent state in
your application.

I've seen and fixed hundreds of bugs related to these inaccurate implementations, especially when multiple developers
works on the same codebase. On big applications, this grows in a nightmare:
it becomes very complicated to maintain a consistent state between all your variables.

A common workaround is using a method or a getter:

```ts
const STATE = {
  name: 'Alice',
  count: 5,
  get message(): string {
    return `${ STATE.name } owns ${ STATE.count } cars`;
  },
};
```

This is far better than the first implementation, however, it lacks of a *event* / *notification* that `message`
changed when any of `name` or `count` changed.

*I'm pretty sure you've experienced many times the same issue in your different projects.*

`rx-js-light` perfectly handles this problem: if any of `name` or `count` changes, `message` will be updated too and
immediately reflected or cascaded to other computed variables using it.

```ts
const $name$ = let$$('Alice');
const $count$ = let$$(5);
const message$ = string$$`${ $name$.subscribe } owns ${ $count$.subscribe } cars`;

const STATE = {
  $name$,
  $count$,
  message$,
};

// $count$.emit(10) will instaltly update message$ 
```

Each variables mutating over time, **SHOULD** be converted into *SubscribeFunctions*. And every computed values **
SHOULD** be *SubscribeFunctions* built from piping these variables (mostly using map or filter for example).

### Async disposal

It's extremely frequent to start async tasks like:

- http request (fetch)
- events listener (element.createEventListener)
- or timers (setInterval)

However, most of the time (mostly due to laziness, let's admit it 🙄) developers don't handle cancellation (AbortSignal,
removeEventListener, clearInterval), leading to memory leaks, unwanted concurrent / duplicate tasks, or incorrect
resolve order.

For example, it's pretty common to start a http request when a user clicks on a button. If the user performs a
double-click (or more), you may end up with concurrent http requests, and unexpected results
(incorrect resolve order, server answering 'error' because the request was expected unique like a DELETE, etc...).

`rx-js-light` covers very well this use case, because *SubscribeFunctions* are lazy sources which when unsubscribed,
release their resources and cancel any pending tasks.

So every async job, **SHOULD** begin with an *SubscribeFunctions*.

Example:

```ts
const container = document.body;

const button = document.createElement('button');
button.innerText = 'do request';
container.appendChild(button);

const resultContainer = document.createElement('div');
container.appendChild(resultContainer);

/* THE COMPLEX PART */
const subscribe = pipe$$(fromEventTarget<'click', MouseEvent>(button, 'click'), [ // creates an observable listening for 'click' on 'button'
  debounce$$$<MouseEvent>(1000), // if the user clics twice or more, we only keep the last event for a period of 1000ms
  mergeMapS$$$<MouseEvent, ISubscribeFunctionFromFetchNotifications>( // maps incoming values and converts an Observable of Observables into a lower order Observable
    () => fromFetch(API_URL), // creates an Observable performing an http request using the fetch API
  ), // mergeMapS$$$ limits to one the number of parallel merged Observables (optimization => cancels previous request, if any)
  mergeMapSN$$$<ISubscribeFunctionFromFetchNotifications, IAPIResponseJSON>( // same as mergeMap but works with notifications instead
    (response: Response) => fromPromise<IAPIResponseJSON>(response.json()), // creates an Observable from a Promise
  ),
]);

// until 'subscribe' is called, no event listener is created, nor http calls

const unsubscribe = subscribe(notificationObserver({
  next: (data: IAPIResponseJSON) => {
    console.log(data);
    button.parentNode?.removeChild(button);
    resultContainer.innerText = `Request succeed`;
  },
  error: () => {
    resultContainer.innerText = `Request failed`;
  }
}));

const unsbubscribeButton = document.createElement('button');
unsbubscribeButton.innerText = 'unsbubscribe';
container.appendChild(unsbubscribeButton);
fromEventTarget(unsbubscribeButton, 'click')(unsubscribe);

// when 'unsubscribe' is called every async tasks will be properly cancelled (any pending requests, event listener removed, etc...)
```

It may look complicated if you're not familiar with Observables, but as you may see, by calling only one function
(here: `unsubscribe`) you'll properly cancel all the async stuff.

At the end your code will be more compact, and with fewer bugs.

### Is it slower to code with 'rx-js-light' ?

**YES**, but you are more consistent, generate fewer bugs, and wins a lot of performances.

Instead of using:

- event emitters/listeners
- getters/setters
- methods

And having hard time to handle yourself every possibility, state, and update,
`rx-js-light` provides a frameworks to support all these async events.

If a value evolves through time, you'll create a *SubscribeFunction* (example with `let$$`), and use it through one or
many *SubscribePipeFunctions* (example with `map$$`, `filter$$`, `function$$`, ...).

So yes, writing:

```ts
const valueA = 1;
const valueB = 2;
const sum = valueA + valueB;

```

Is simpler than writing:

```ts
const $valueA$ = let$$(1);
const $valueB$ = let$$(2);
const sum$ = add$$($valueA$.subscribe, $valueB$.subscribe);
```

But it's not the same usage:

- in one case you have static values
- in the other one, you have values that evolves and are always updated and accurate

