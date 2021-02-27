import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../../../types';

// https://github.com/lifaon74/observables/blob/master/src/observables/dom-resize/ResizeObserver.ts

export function fromIntersectionObserver(
  element: Element,
  options?: IntersectionObserverInit,
): ISubscribeFunction<IntersectionObserverEntry> {
  return (emit: IEmitFunction<IntersectionObserverEntry>): IUnsubscribeFunction => {
    const observer: IntersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      emit(entries[0]);
    }, options);
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  };
}


// export type IIntersectionObserverSubscribePipeInValue = readonly Element[];
// export type IIntersectionObserverSubscribePipeOutValue = IntersectionObserverEntry[];
//
// export function intersectionObserverSubscribePipe(
//   options?: IntersectionObserverInit,
// ): ISubscribePipeFunction<IIntersectionObserverSubscribePipeInValue, IIntersectionObserverSubscribePipeOutValue> {
//   return (subscribe: ISubscribeFunction<IIntersectionObserverSubscribePipeInValue>): ISubscribeFunction<IIntersectionObserverSubscribePipeOutValue> => {
//     let running: boolean = true;
//     return (emit: IEmitFunction<IIntersectionObserverSubscribePipeOutValue>): IUnsubscribeFunction => {
//       const observer: IntersectionObserver = new IntersectionObserver(emit, options);
//       const unsubscribe: IUnsubscribeFunction = subscribe((elements: IIntersectionObserverSubscribePipeInValue) => {
//         observer.disconnect();
//         for (let i = 0, l = elements.length; i < l; i++) {
//           observer.observe(elements[i])
//         }
//       });
//       return () => {
//         if (running) {
//           running = false;
//           observer.disconnect();
//           unsubscribe();
//         }
//       };
//     };
//   };
// }


