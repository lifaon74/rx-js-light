import { pipeSubscribeFunction } from '../../functions/piping/pipe-subscribe-function/pipe-subscribe-function';
import { interval } from '../../subscribe-function/from/time-related/interval/interval';
import { onNodeConnectedTo } from '../light-dom/node/state/on-node-connected-to';
import { $timeout } from '../../debug-observables-v5';
import { createReactiveIfNode } from '../reactive-dom/template/reactive-if-node/create-reactive-if-node';
import { nodeAppendChild } from '../light-dom/node/move/devired/dom-like/node/node-append-child';
import { createElementNode } from '../light-dom/node/create/create-element-node';
import { createTextNode } from '../light-dom/node/create/create-text-node';
import { createDocumentFragment } from '../light-dom/node/create/create-document-fragment';
import { createReactiveForLoopNode } from '../reactive-dom/template/reactive-for-loop-node/create-reactive-for-loop-node';
import { createContainerNode } from '../light-dom/node/create/container-node/create-container-node';
import { ISubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';
import { mapSubscribePipe } from '../../subscribe-function/subscribe-pipe/emit-pipe-related/map-subscribe-pipe';
import { createReactiveTextNode } from '../reactive-dom/text/create-reactive-text-node';
import { logStateSubscribePipe } from '../../subscribe-function/subscribe-pipe/log-state-subscribe-pipe';
import { detachNodeWithEvent } from '../light-dom/node/move/node/with-event/detach-node-with-event';
import { attachNodeWithEvent } from '../light-dom/node/move/node/with-event/attach-node-with-event';
import { moveNodeWithEvent } from '../light-dom/node/move/node/with-event/move-node-with-event';
import { attachNode } from '../light-dom/node/move/node/attach-node';
import { attachDocumentFragmentWithAttachEvent } from '../light-dom/node/move/node/with-event/bulk/fragment/attach-document-fragment-with-event';
import { shareSubscribePipe } from '../../subscribe-function/subscribe-pipe/source-related/share-subscribe-pipe';
import { debounceFrameSubscribePipe } from '../../subscribe-function/subscribe-pipe/time-related/debounce-frame-subscribe-pipe';
import { createUnicastReplayLastSource } from '../../source/replay-last-source/derived/create-unicast-replay-last-source';
import { debugReactiveDOMCompiler } from './debug-reactive-dom-compiler';
import { createReactiveSwitchNode } from '../reactive-dom/template/reactive-switch-node/create-reactive-switch-node';


/*---*/

// async function debugObservableReactive1() {
//   const source1 = pipeSubscribeFunction(idle(), [
//     mapOperator<IdleDeadline, string>(() => new Date().toString()),
//     // mapOperator<void, string>(() => Date.now().toString()),
//     distinctOperator<string>(),
//     replayLastSharedOperator<string>(),
//   ]);
//
//   const source2 = pipeSubscribeFunction(interval(1000), [
//     mapOperator<void, number>(() => Math.floor(Math.random() * 100)),
//     currencyOperator(navigator.languages, { currency: 'EUR' }),
//     replayLastSharedOperator<string>()
//   ]);
//
//   // const text1 = createReactiveTextNode(source1);
//   // const text2 = createReactiveTextNode(source2);
//   const text1 = createTextNode('abc');
//
//   // onNodeAttachedListener(node)(() => {
//   //   console.log('attached');
//   // });
//
//   const unsubscribe = onNodeConnectedTo(text1, document.body)((connected: boolean) => {
//     console.log('connected', connected);
//   });
//
//   // const container1 = document.createElement('span');
//   // attachNode(text1, container1, null);
//   // attachNode(text2, container1, null);
//   //
//   // const container2 = document.createElement('div');
//   // attachNode(container1, container2, null);
//   // console.log('--');
//   // attachNode(container2, document.body, null);
//
//   const container3 = createDocumentFragment();
//   nodeAppendChild(text1, container3);
//   nodeAppendChild(container3, document.body);
//
//   // unsubscribe();
//   // detachNode(node);
//   // detachNode(container1);
//   // detachNode(container2);
//   // detachNode(document.body);
// }
//
// async function debugObservableReactive2() {
//   const container = new ContainerNode();
//   attachStandardNode(createTextNode('a'), container, null);
//   attachStandardNode(createTextNode('b'), container, null);
//   attachStandardNode(container, document.body, null);
//   attachStandardNode(createTextNode('c'), container, null);
//
//   await $timeout(2000);
//   detachStandardNode(container);
//
//   await $timeout(2000);
//   attachStandardNode(container, document.body, null);
// }
//
//
// async function debugObservableReactive4() {
//   const source = pipeSubscribeFunction(idle(), [
//     mapOperator<IdleDeadline, string>(() => new Date().toString()),
//     replayLastSharedOperator<string>(),
//   ]);
//
//   const element = createElementAuto('div');
//   nodeAppendChild(document.body, element);
//   setReactiveAttribute(source, element, 'attr');
// }
//
// async function debugObservableReactive5() {
//   let value: boolean = false;
//   const source = pipeSubscribeFunction(interval(1000), [
//     mapOperator<void, boolean>(() => (value = !value))
//   ]);
//
//   const element = createElementAuto('div');
//   nodeAppendChild(document.body, element);
//   setReactiveClass(source, element, 'some-class');
// }
//
// async function debugObservableReactive6() {
//   const source = createMulticastSource<IReactiveClassListValue>();
//
//   const element = createElementAuto('div');
//   nodeAppendChild(document.body, element);
//   setReactiveClassList(source.subscribe, element);
//
//   await $timeout(2000);
//   source.emit(['a', 'b']);
//   await $timeout(1000);
//   source.emit({ c: true, b: false });
//   await $timeout(1000);
//   source.emit('d e');
//   await $timeout(1000);
//   source.emit(null);
//   await $timeout(1000);
// }
//
// async function debugObservableReactive7() {
//   let value: boolean = false;
//   const source = pipeSubscribeFunction(interval(1000), [
//     mapOperator<void, boolean>(() => (value = !value))
//   ]);
//
//   const element = createElementAuto('input');
//   nodeAppendChild(document.body, element);
//   setReactiveProperty(source, element, 'disabled');
// }
//
// async function debugObservableReactive8() {
//   const source = createMulticastSource<IDynamicStyleValue>();
//
//   const element = createElementAuto('div');
//   nodeAppendChild(document.body, element);
//   setReactiveStyle(source.subscribe, element, 'font-size.px');
//
//   await $timeout(2000);
//   source.emit(15);
//   await $timeout(1000);
//   source.emit(null);
//   await $timeout(1000);
// }
//
// async function debugObservableReactive9() {
//   const source = createMulticastSource<IDynamicStyleListValue>();
//
//   const element = createElementAuto('div');
//   nodeAppendChild(document.body, element);
//   setReactiveStyleList(source.subscribe, element);
//
//   await $timeout(2000);
//   source.emit({
//     'font-size.px': 15,
//   });
//   await $timeout(1000);
//   source.emit([
//     ['font-size.px', 20],
//   ]);
//   await $timeout(1000);
//   source.emit('color: red; font-size: 48px;');
//   await $timeout(1000);
//   source.emit(null);
//   await $timeout(1000);
// }
//
// async function debugObservableReactive10() {
//   const element = createElementAuto('div');
//   element.style.width = '500px';
//   element.style.height = '500px';
//   element.style.backgroundColor = '#fafafa';
//   nodeAppendChild(document.body, element);
//
//   setReactiveEventListener<'click', MouseEvent>((event: MouseEvent) => {
//     console.log(event);
//   }, element, 'click');
// }



async function debugOnNodeConnectedTo1() {
  const text1 = createTextNode('abc');
  const text2 = createTextNode('123');
  const container1 = createElementNode('span');
  const container2 = createElementNode('div');
  const container3 = createElementNode('a');
  const fragment = createDocumentFragment();
  const containerNode = createContainerNode();

  onNodeConnectedTo(text1, document.body)((connected: boolean) => {
    console.log('connected', connected);
  });


  const steps = [
    () => attachNodeWithEvent(text1, document.body), // true
    () => detachNodeWithEvent(text1), // false
    () => attachNodeWithEvent(text1, container1), // -
    () => attachNodeWithEvent(text2, container1), // -
    () => attachNodeWithEvent(container1, container2),// -
    () => attachNodeWithEvent(container2, document.body), // true
    () => detachNodeWithEvent(container1), // false
    () => attachNodeWithEvent(container3, document.body), // -
    () => moveNodeWithEvent(text1, document.body), // true
    () => moveNodeWithEvent(text1, document.body), // false & true (if triggerOnMove === true)
    () => moveNodeWithEvent(text1, container1), // false
    () => detachNodeWithEvent(text1), // -
    () => attachNode(text1, fragment), // -
    () => attachDocumentFragmentWithAttachEvent(fragment, document.body), // true
  ];

  // const steps = [
  //   () => attachNodeWithEvent(text1, container1), // -
  //   () => moveNodeWithEvent(text1, document.body), // true
  //   () => moveNodeWithEvent(text1, document.body), // --
  //   // () => moveNodeWithEvent(text1, document.body), // false -> true if triggerOnMove === true
  // ];

  steps.forEach((step, index: number) => {
    console.warn('step', index, step.toString());
    step();
  });

}

async function debugOnNodeConnectedTo2() {
  const text1 = createTextNode('abc');

  onNodeConnectedTo(text1, document)((connected: boolean) => {
    console.log('connected', connected);
  });


  const steps = [
    () => attachNodeWithEvent(text1, document.body), // true
  ];

  steps.forEach((step, index: number) => {
    console.warn('step', index, step.toString());
    step();
  });

}

async function debugContainerNode1() {
  const container = createContainerNode();
  attachNodeWithEvent(createTextNode('a'), container);
  attachNodeWithEvent(createTextNode('b'), container);
  attachNodeWithEvent(container, document.body);
  attachNodeWithEvent(createTextNode('c'), container);

  // await $timeout(2000);
  // detachStandardNode(container);
  //
  // await $timeout(2000);
  // attachStandardNode(container, document.body);

  await $timeout(2000);
  moveNodeWithEvent(container, document.body, document.body.firstChild);
}

async function debugReactiveIfNode1() {
  let value: boolean = false;
  const subscribe = pipeSubscribeFunction(interval(1000), [
    mapSubscribePipe<void, boolean>(() => (value = !value)),
  ]);

  // const source = createUnicastReplayLastSource<boolean>(true);
  // const subscribe = source.subscribe;

  const date = pipeSubscribeFunction(interval(1000), [
    logStateSubscribePipe<any>('interval'),
    mapSubscribePipe<any, string>(() => new Date().toString()),
    shareSubscribePipe<string>(),
  ]);

  const node = createReactiveIfNode(subscribe, () => {
    const fragment = createDocumentFragment();
    nodeAppendChild(fragment, createTextNode(`Hello world !`));
    nodeAppendChild(fragment, createReactiveTextNode(date));
    return fragment;
  });

  nodeAppendChild(document.body, node);

  // await $timeout(1000);
  // nodeRemove(node);
  // await $timeout(1000);
  // nodeAppendChild(document.body, node);
}


async function debugReactiveForLoopNode1() {
  const source = createUnicastReplayLastSource<number[]>();


  const node = createReactiveForLoopNode(source.subscribe, ({ item, index }) => {
    // console.log('create fragment');
    const _index = pipeSubscribeFunction(index, [mapSubscribePipe<number, string>(String)]);
    const fragment = createDocumentFragment();
    const container = createElementNode('div');
    nodeAppendChild(container, createTextNode(`node: ${ item } - `));
    nodeAppendChild(container, createReactiveTextNode(_index));
    nodeAppendChild(fragment, container);
    return fragment;
  });


  // const frame = (cb: () => void) => cb();
  const frame = requestAnimationFrame;

  // nodeAppendChild(document.body, node);

  // source.emit([1, 2, 3]);
  // console.warn('-----');
  // source.emit([1, 2, 3, 4]);
  // console.warn('-----');
  // source.emit([3, 2, 1]);
  // console.warn('-----');

  const array1 = Array.from({ length: 1e4 }, (v: any, index: number) => index);
  source.emit(array1);

  // nodeAppendChild(document.body, node);
  // detachStandardNode(node);

  frame(() => {
    console.time('nodeAppendChild');
    nodeAppendChild(document.body, node);
    console.timeEnd('nodeAppendChild');

    // console.time('nodeAppendChildRemove');
    // frame(() => {
    //   source.emit([]);
    //   console.timeEnd('nodeAppendChildRemove');
    // });

    frame(() => {
      console.time('nodeAppendChild2');
      source.emit(array1);
      console.timeEnd('nodeAppendChild2');
    });
  });


  // nodeAppendChild(document.body, node);
  // frame(() => {
  //   console.time('nodeAppendChild');
  //   source.emit(Array.from({ length: 1e4 }, (v: any, index: number) => index)); // 800~1000
  //   console.timeEnd('nodeAppendChild');
  // });

  // frame(() => {
  //   console.time('nodeAppendChildFast');
  //   const data: number[] = source.getValue();
  //   for (let i = 0, l = data.length; i < l; i++) {
  //     const container = createElementNode('div');
  //     container.appendChild(createTextNode(`node: ${ data[i] } - ${ i }`));
  //     document.body.appendChild(container);
  //   }
  //   console.timeEnd('nodeAppendChildFast');
  // });

  // console.time('nodeAppendChildFaster');
  // frame(() => {
  //   const fragment = createDocumentFragment();
  //   const data: number[] = source.getValue();
  //
  //   for (let i = 0, l = data.length; i < l; i++) {
  //     const container = createElementNode('div');
  //     container.appendChild(createTextNode(`node: ${ data[i] } - ${ i }`));
  //     fragment.appendChild(container);
  //   }
  //
  //   document.body.appendChild(fragment);
  //   console.timeEnd('nodeAppendChildFaster');
  // });

}

async function debugReactiveForLoopNode2() {
  const items = createUnicastReplayLastSource<ISubscribeFunction<string>[]>();

  const date = pipeSubscribeFunction(interval(1000), [
    logStateSubscribePipe<void>('interval'),
    debounceFrameSubscribePipe<void>(),
    mapSubscribePipe<void, string>(() => new Date().toString()),
    shareSubscribePipe<string>(),
  ]);

  const node = createReactiveForLoopNode(items.subscribe, ({ item }) => {
    const fragment = createDocumentFragment();
    const container = createElementNode('div');
    nodeAppendChild(container, createReactiveTextNode(item));
    nodeAppendChild(fragment, container);
    return fragment;
  });


  items.emit(Array.from({ length: 1e3 }, (v: any, index: number) => date));

  nodeAppendChild(document.body, node);
  // setTimeout(() => {
  //   nodeRemove(node);
  // }, 5000);
}


async function debugReactiveSwitchNode1() {
  let value: number = 0;
  const subscribe = pipeSubscribeFunction(interval(1000), [
    mapSubscribePipe<void, number>(() => (value = (value + 1) % 3)),
  ]);

  const node = createReactiveSwitchNode(subscribe, new Map([
    [0, () => {
      const fragment = createDocumentFragment();
      nodeAppendChild(fragment, createTextNode(`=> 0`));
      return fragment;
    }],
    [1, () => {
      const fragment = createDocumentFragment();
      nodeAppendChild(fragment, createTextNode(`=> 1`));
      return fragment;
    }]
  ]), () => {
    const fragment = createDocumentFragment();
    nodeAppendChild(fragment, createTextNode(`default`));
    return fragment;
  });

  nodeAppendChild(document.body, node);
}


/*----*/


export async function debugReactiveDOM() {
  // await debugObservableReactive1();
  // await debugObservableReactive2();
  // await debugObservableReactive3();
  // await debugObservableReactive4();
  // await debugObservableReactive5();
  // await debugObservableReactive6();
  // await debugObservableReactive7();
  // await debugObservableReactive8();
  // await debugObservableReactive9();
  // await debugObservableReactive10();

  // await debugOnNodeConnectedTo1();
  // await debugOnNodeConnectedTo2();

  // await debugContainerNode1();

  // await debugReactiveIfNode1();
  // await debugReactiveForLoopNode1();
  // await debugReactiveForLoopNode2();
  // await debugReactiveSwitchNode1();

  await debugReactiveDOMCompiler();
}
