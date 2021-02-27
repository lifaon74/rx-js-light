*Example: build size*

```ts
import { fromEventTarget, mapSubscribePipe, pipeSubscribeFunction } from './packages/@lifaon/rx-js-light';

function run() {
  const subscribe = pipeSubscribeFunction(fromEventTarget<'click', MouseEvent>(window, 'click'), [
    mapSubscribePipe<MouseEvent, [number, number]>((event: MouseEvent) => [event.clientY, event.clientX] as [number, number])
  ]);

  subscribe((position) => {
    console.log(position);
  });
}

run();
```


```js
var e,n,t,r,c,i,o,u,l;e="complete",n=void 0,Object.freeze({name:e,value:n}),(o=window,u="click",t=e=>function(e,n,t,r){return e.addEventListener(n,t,r),()=>{e.removeEventListener(n,t,r)}}(o,u,e,l),r=[(c=e=>[e.clientY,e.clientX],i=function(e){return n=>t=>{n(e(t))}}(c),e=>n=>e(i(n)))],function(e,n){return function(e){return n=>e.reduce(((e,n)=>n(e)),n)}(n)(e)}(t,r))((e=>{console.log(e)}));
```

Only 391 Bytes !
