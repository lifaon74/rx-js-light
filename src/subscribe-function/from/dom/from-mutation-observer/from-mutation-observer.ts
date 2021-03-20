import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../../../types';

export function fromMutationObserver(
  element: Element,
  options?: MutationObserverInit,
): ISubscribeFunction<MutationRecord> {
  return (emit: IEmitFunction<MutationRecord>): IUnsubscribeFunction => {
    const observer: MutationObserver = new MutationObserver((entries: MutationRecord[]) => {
      emit(entries[0]);
    });
    observer.observe(element, options);
    return () => {
      observer.disconnect();
    };
  };
}

// interface IMutationObserverAndSubscription {
//   readonly subscribe: ISubscribeFunction<ReadonlyArray<MutationRecord>>;
//   readonly observer: MutationObserver;
// }
//
// let RESIZE_OBSERVER_AND_SUBSCRIPTION_CACHED: IMutationObserverAndSubscription;
//
// function getMutationObserverAndSubscription(): IMutationObserverAndSubscription {
//   if (RESIZE_OBSERVER_AND_SUBSCRIPTION_CACHED === void 0) {
//     const source: IMulticastSource<ReadonlyArray<MutationRecord>> = createMulticastSource<ReadonlyArray<MutationRecord>>();
//     const observer: MutationObserver = new MutationObserver((entries: ReadonlyArray<MutationRecord>) => {
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
// ): ISubscribeFunction<MutationRecord> {
//   return (emit: IEmitFunction<MutationRecord>): IUnsubscribeFunction => {
//     let running: boolean = true;
//     const { subscribe, observer } = getMutationObserverAndSubscription();
//     const unsubscribe: IUnsubscribeFunction = subscribe((entries: ReadonlyArray<MutationRecord>) => {
//       for (let i = 0, l = entries.length; i < l; i++) {
//         const entry: MutationRecord = entries[i];
//         if (running && (entry.target === element)) {
//           emit(entry);
//           break;
//         }
//       }
//     })
//     observer.observe(element, options);
//     return () => {
//       if (running) {
//         running = false;
//         unsubscribe();
//         observer.unobserve(element);
//       }
//     };
//   };
// }


