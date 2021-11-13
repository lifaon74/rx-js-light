import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export function fromIntersectionObserver(
  element: Element,
  options?: IntersectionObserverInit,
): IObservable<IntersectionObserverEntry> {
  return (emit: IObserver<IntersectionObserverEntry>): IUnsubscribe => {
    const observer: IntersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]): void => {
      emit(entries[0]);
    }, options);
    observer.observe(element);
    return (): void => {
      observer.disconnect();
    };
  };
}

// export type IIntersectionObserverObservablePipeInValue = readonly Element[];
// export type IIntersectionObserverObservablePipeOutValue = IntersectionObserverEntry[];
//
// export function intersectionObserverObservablePipe(
//   options?: IntersectionObserverInit,
// ): IObservablePipe<IIntersectionObserverObservablePipeInValue, IIntersectionObserverObservablePipeOutValue> {
//   return (subscribe: IObservable<IIntersectionObserverObservablePipeInValue>): IObservable<IIntersectionObserverObservablePipeOutValue> => {
//     let running: boolean = true;
//     return (emit: IObserver<IIntersectionObserverObservablePipeOutValue>): IUnsubscribe => {
//       const observer: IntersectionObserver = new IntersectionObserver(emit, options);
//       const unsubscribe: IUnsubscribe = subscribe((elements: IIntersectionObserverObservablePipeInValue): void => {
//         observer.disconnect();
//         for (let i = 0, l = elements.length; i < l; i++) {
//           observer.observe(elements[i])
//         }
//       });
//       return (): void => {
//         if (running) {
//           running = false;
//           observer.disconnect();
//           unsubscribe();
//         }
//       };
//     };
//   };
// }


