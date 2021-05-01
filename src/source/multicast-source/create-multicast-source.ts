import { noop } from '../../misc/helpers/noop';
import { IEmitFunction } from '../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';
import { IMulticastSource } from './multicast-source.type';
import { freeze } from '../../misc/helpers/freeze';


export function createMulticastSource<GValue>(): IMulticastSource<GValue> {
  let _emitFunctions: IEmitFunction<GValue>[] = [];
  let _dispatchingEmitFunctions: IEmitFunction<GValue>[]; // what is dispatched
  let _dispatchingCount: number = 0; // number of dispatch remaining

  const cloneEmitFunctions = () => {
    if (_emitFunctions === _dispatchingEmitFunctions) {
      _emitFunctions = _emitFunctions.slice(); // clone _emitFunctions to avoid mutating _dispatchingEmitFunctions
    }
  };

  const emit: IEmitFunction<GValue> = (value: GValue): void => {
    if (_dispatchingCount === 0) {
      // fix dispatching variables
      _dispatchingEmitFunctions = _emitFunctions; // copied as reference for faster execution time
      _dispatchingCount = _dispatchingEmitFunctions.length;
      // iterates until we have nothing more to dispatch
      for (let i = 0; _dispatchingCount > 0; i++) {
        _dispatchingCount--; // optimization
        _dispatchingEmitFunctions[i](value);
      }
    } else {
      throw new Error(`Already dispatching.`);
    }
  };

  const subscribe: ISubscribeFunction<GValue> = (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
    let running: boolean = true;
    // if we are dispatching, we must clone _emitFunctions, to avoid changing _dispatchingEmitFunctions
    if (_dispatchingCount > 0) { // if we are dispatching
      cloneEmitFunctions();
    }
    _emitFunctions.push(emit);
    return () => {
      if (running) {
        running = false;
        if (_dispatchingCount > 0) { // if we are dispatching
          _dispatchingEmitFunctions[_dispatchingEmitFunctions.indexOf(emit)] = noop; // remove from _dispatchingEmitFunctions the emit function
          cloneEmitFunctions();
        }
        _emitFunctions.splice(_emitFunctions.indexOf(emit), 1);
      }
    };
  };

  return freeze({
    getObservers: (): readonly IEmitFunction<GValue>[] => {
      return _emitFunctions;
    },
    emit,
    subscribe,
  });
}


// export function createMulticastSource<GValue>(
//   disableDuplicateSubscribeVerification: boolean = false,
// ): IMulticastSource<GValue> {
//   let _emitFunctions: IEmitFunction<GValue>[] = [];
//   let _dispatchingEmitFunctions: IEmitFunction<GValue>[]; // what is dispatched
//   let _dispatchingCount: number = 0; // number of dispatch remaining
//
//   const emit: IEmitFunction<GValue> = (value: GValue): void => {
//     if (_dispatchingCount === 0) {
//       // fix dispatching variables
//       _dispatchingEmitFunctions = _emitFunctions; // copied as reference for faster execution time
//       _dispatchingCount = _dispatchingEmitFunctions.length;
//       // iterates until we have nothing more to dispatch
//       for (let i = 0; _dispatchingCount > 0; i++, _dispatchingCount--) {
//         _dispatchingEmitFunctions[i](value);
//       }
//     } else {
//       throw new Error(`The Source is already dispatching a value. You probably created a recursive loop.`);
//     }
//   };
//
//   const subscribe: ISubscribeFunction<GValue> = (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
//     let running: boolean = true;
//     // if we are dispatching, we must clone _emitFunctions, to avoid changing _dispatchingEmitFunctions
//     if (_dispatchingCount > 0) { // if we are dispatching
//       _emitFunctions = _emitFunctions.slice(); // clone _emitFunctions to avoid mutating _dispatchingEmitFunctions
//     }
//     _emitFunctions.push(emit);
//     return () => {
//       if (running) {
//         running = false;
//         if (_dispatchingCount > 0) { // if we are dispatching
//           _dispatchingEmitFunctions[_dispatchingEmitFunctions.indexOf(emit)] = noop; // remove from _dispatchingEmitFunctions the emit function
//           _emitFunctions = _emitFunctions.slice(); // clone _emitFunctions to avoid mutating _dispatchingEmitFunctions
//         }
//         _emitFunctions.splice(_emitFunctions.indexOf(emit), 1);
//       }
//     };
//   };
//
//   return freeze({
//     getObservers: (): readonly IEmitFunction<GValue>[] => {
//       return _emitFunctions;
//     },
//     emit,
//     subscribe: (
//       disableDuplicateSubscribeVerification
//         ? subscribe
//         : (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
//           if (_emitFunctions.includes(emit)) {
//             throw new Error(`Already subscribed to this Source`);
//           } else {
//             return subscribe(emit);
//           }
//         }
//     ),
//   });
// }


/**
 * Problem: cloning _emitFunctions induce that unsubscribing while dispatching is not accounted.
 */

// export function createMulticastSource<GValue>(
//   disableDuplicateSubscribeVerification: boolean = false,
// ): IMulticastSource<GValue> {
//   let _emitFunctions: IEmitFunction<GValue>[] = [];
//   let _dispatchingEmitFunctions: IEmitFunction<GValue>[] = [];
//   let _isDispatching = false;
//
//   const _cloneEmitFunctionsIfDispatching = (): void => {
//     if (_isDispatching) {
//       _emitFunctions = _emitFunctions.slice();
//     }
//   };
//
//   const emit: IEmitFunction<GValue> = (value: GValue): void => {
//     if (_isDispatching) {
//       throw new Error(`The Source is already dispatching a value. You probably created a recursive loop.`);
//     } else {
//       const emitFunctions: IEmitFunction<GValue>[] = _emitFunctions;
//       const lengthMinusOne: number = emitFunctions.length - 1;
//       if (lengthMinusOne >= 0) {
//         _isDispatching = true;
//         for (let i = 0; i < lengthMinusOne; i++) {
//           emitFunctions[i](value);
//         }
//         _isDispatching = false;
//         emitFunctions[lengthMinusOne](value);
//       }
//     }
//   };
//
//   const subscribe: ISubscribeFunction<GValue> = (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
//     let running: boolean = true;
//     _cloneEmitFunctionsIfDispatching();
//     _emitFunctions.push(emit);
//     return () => {
//       if (running) {
//         running = false;
//         const index: number = _emitFunctions.indexOf(emit);
//         _emitFunctions[index] = noop;
//         _cloneEmitFunctionsIfDispatching();
//         _emitFunctions.splice(index, 1);
//       }
//     };
//   };
//
//   return Object.freeze({
//     getObservers: (): readonly IEmitFunction<GValue>[] => {
//       return _emitFunctions;
//     },
//     emit,
//     subscribe: (
//       disableDuplicateSubscribeVerification
//         ? subscribe
//         : (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
//           if (_emitFunctions.includes(emit)) {
//             throw new Error(`Already subscribed to this Source`);
//           } else {
//             return subscribe(emit);
//           }
//         }
//     ),
//   });
// }
//


// export function createMulticastSource<GValue>(
//   disableDuplicateSubscribeVerification: boolean = false,
// ): IMulticastSource<GValue> {
//   let _emitFunctions: Set<IEmitFunction<GValue>> = new Set<IEmitFunction<GValue>>();
//   let _isDispatching = false;
//
//   // const _cloneEmitFunctionsIfDispatching = (): void => {
//   //   if (_isDispatching) {
//   //     _emitFunctions = new Set<IEmitFunction<GValue>>(_emitFunctions);
//   //   }
//   // };
//
//   const emit: IEmitFunction<GValue> = (value: GValue): void => {
//     if (_isDispatching) {
//       throw new Error(`The Source is already dispatching a value. You probably created a recursive loop.`);
//     } else {
//       // const emitFunctions: Set<IEmitFunction<GValue>> = _emitFunctions;
//       _isDispatching = true;
//       const iterator: Iterator<IEmitFunction<GValue>> = _emitFunctions.values();
//       let result: IteratorResult<IEmitFunction<GValue>>;
//       while (!(result = iterator.next()).done) {
//         result.value(value);
//       }
//       _isDispatching = false;
//     }
//   };
//
//   const subscribe: ISubscribeFunction<GValue> = (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
//     let running: boolean = true;
//     // _cloneEmitFunctionsIfDispatching();
//     _emitFunctions.add(emit);
//     return () => {
//       if (running) {
//         running = false;
//         _emitFunctions.delete(emit);
//         // _cloneEmitFunctionsIfDispatching();
//       }
//     };
//   };
//
//   return Object.freeze({
//     getObservers: (): readonly IEmitFunction<GValue>[] => {
//       throw 'TODO';
//       // return _emitFunctions;
//     },
//     emit,
//     subscribe: (
//       disableDuplicateSubscribeVerification
//         ? subscribe
//         : (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
//           if (_emitFunctions.has(emit)) {
//             throw new Error(`Already subscribed to this Source`);
//           } else {
//             return subscribe(emit);
//           }
//         }
//     ),
//   });
// }

// export interface ICreateSourceOptions {
//   disableDuplicateSubscribeVerification?: boolean;
// }


// export function createSourceUsingFastArrayIterator<GValue>(
//   disableDuplicateSubscribeVerification: boolean = false,
// ): ISource<GValue> {
//   const iterator: IFastArrayIterator<IEmitFunction<GValue>> = createFastArrayIterator<IEmitFunction<GValue>>();
//
//   const subscribe: ISubscribeFunction<GValue> = (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
//     let running: boolean = true;
//     iterator.mutate((array: IEmitFunction<GValue>[]): void => {
//       array.push(emit);
//     });
//     return () => {
//       if (running) {
//         running = false;
//         const array: IEmitFunction<GValue>[] = iterator.getArray() as IEmitFunction<GValue>[];
//         const index: number = array.indexOf(emit);
//         array[index] = noop;
//         iterator.mutate((array: IEmitFunction<GValue>[]): void => {
//           array.splice(index, 1);
//         });
//       }
//     };
//   };
//
//   return Object.freeze({
//     getObservers(): readonly IEmitFunction<GValue>[] {
//       return iterator.getArray();
//     },
//     emit: (value: GValue): void => {
//       iterator.iterate((emit: IEmitFunction<GValue>): boolean => {
//         emit(value);
//         return true;
//       });
//     },
//     subscribe: (
//       disableDuplicateSubscribeVerification
//         ? subscribe
//         : (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
//           if (iterator.getArray().includes(emit)) {
//             throw new Error(`Already subscribed to this Source`);
//           } else {
//           }
//           return subscribe(emit);
//         }
//     ),
//   });
// }
