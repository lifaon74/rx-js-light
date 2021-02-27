# 📑 rx-dom

[comment]: <> (https://github.com/tusharmath/reactive-dom#virtualdomvsreactivedom)

**rx-dom** is an [observable based](https://github.com/lifaon74/rx-js-light) library for building very high performance user interfaces.

It binds DOM nodes with observables to automatically update only the relevant nodes, ensuring maximal efficiency.

It's light, it's fast, and it's simple ! Give it a try !


#### Differences with other popular frameworks:

Popular frameworks are more mature and offers more tools, but this project may close the gap in the future.
Here we'll speak only on the methods used by the frameworks to update the DOM, and how this library improved these weaknesses.

##### Angular

Angular uses [zone.js](https://github.com/angular/zone.js/) to refresh the DOM:

- it binds the nodes with the *expressions* we assigned to them
- when an async function executes in the context of your component, it re-evaluates all these *expressions* to refresh the DOM

It's very efficient, and offers a simple syntax, but with hundreds of properties per component it's not optimal, as all of them are evaluated each time.

**rx-dom** only updates the nodes bound with an observable. So updating one property only changes the nodes which listen to it.


##### React (or any virtual DOM based framework like Vue.js)

It uses [hooks](https://reactjs.org/docs/hooks-intro.html) to re-generate a VirtualDOM and reflect it on the DOM.

Actually *hooks* are extremely close to observables, but re-generating each time the VirtualDOM when a hook is updated is not efficient at all.

Check [this comparison table](https://github.com/tusharmath/reactive-dom#virtualdomvsreactivedom) for more details.


At the end, we may conclude that current framework trade a lot of the performances for an elegant syntax.
**rx-dom** tries to accomplish both: an elegant syntax with maximal performances.
