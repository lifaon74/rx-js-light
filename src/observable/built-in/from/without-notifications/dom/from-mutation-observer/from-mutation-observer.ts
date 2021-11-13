import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export function fromMutationObserver(
  element: Element,
  options?: MutationObserverInit,
): IObservable<MutationRecord> {
  return (emit: IObserver<MutationRecord>): IUnsubscribe => {
    const observer: MutationObserver = new MutationObserver((entries: MutationRecord[]): void => {
      emit(entries[0]);
    });
    observer.observe(element, options);
    return (): void => {
      observer.disconnect();
    };
  };
}

// interface IMutationObserverAndSubscription {
//   readonly subscribe: IObservable<ReadonlyArray<MutationRecord>>;
//   readonly observer: MutationObserver;
// }
//
// let RESIZE_OBSERVER_AND_SUBSCRIPTION_CACHED: IMutationObserverAndSubscription;
//
// function getMutationObserverAndSubscription(): IMutationObserverAndSubscription {
//   if (RESIZE_OBSERVER_AND_SUBSCRIPTION_CACHED === void 0) {
//     const source: IMulticastSource<ReadonlyArray<MutationRecord>> = createMulticastSource<ReadonlyArray<MutationRecord>>();
//     const observer: MutationObserver = new MutationObserver((entries: ReadonlyArray<MutationRecord>): void => {
//       source.emit(entries);
//     });
//     RESIZE_OBSERVER_AND_SUBSCRIPTION_CACHED = freeze({
//       subscribe: source.subscribe,
//       observer,
//     });
//   }
//   return RESIZE_OBSERVER_AND_SUBSCRIPTION_CACHED;
// }
//
// /*---*/
//
// export function fromMutationObserver(
//   element: Element,
//   options?: MutationObserverInit,
// ): IObservable<MutationRecord> {
//   return (emit: IObserver<MutationRecord>): IUnsubscribe => {
//     let running: boolean = true;
//     const { subscribe, observer } = getMutationObserverAndSubscription();
//     const unsubscribe: IUnsubscribe = subscribe((entries: ReadonlyArray<MutationRecord>): void => {
//       for (let i = 0, l = entries.length; i < l; i++) {
//         const entry: MutationRecord = entries[i];
//         if (running && (entry.target === element)) {
//           emit(entry);
//           break;
//         }
//       }
//     })
//     observer.observe(element, options);
//     return (): void => {
//       if (running) {
//         running = false;
//         unsubscribe();
//         observer.unobserve(element);
//       }
//     };
//   };
// }


