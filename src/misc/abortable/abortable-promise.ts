import { wrapPromiseFactoryWithAbortSignal } from './for-promise';

/** TYPES **/

/* CONSTRUCTOR */

export interface IAbortablePromiseResolveFunction<GValue> {
  (value: GValue | PromiseLike<GValue>): void;
}

export interface IAbortablePromiseRejectFunction {
  (reason?: any): void;
}

export interface IAbortablePromiseConstructorFunction<GValue> {
  (
    resolve: IAbortablePromiseResolveFunction<GValue>,
    reject: IAbortablePromiseRejectFunction,
    signal: AbortSignal,
  ): void;
}

/* ON FULFILLED */

export interface IAbortablePromiseOnFulfilledFunction<GValue, GReturn> {
  (
    value: GValue,
  ): GReturn | PromiseLike<GReturn>;
}

export type IAbortablePromiseOnFulfilled<GValue, GReturn> = IAbortablePromiseOnFulfilledFunction<GValue, GReturn> | undefined | null;

/* ON REJECTED */

export interface IAbortablePromiseOnRejectedFunction<GReturn> {
  (
    reason: any,
  ): GReturn | PromiseLike<GReturn>;
}

export type IAbortablePromiseOnRejected<GReturn> = IAbortablePromiseOnRejectedFunction<GReturn> | undefined | null;

/** CLASS **/

// export class AbortablePromise<GValue> implements Promise<GValue> {
//   protected _promise: Promise<GValue>;
//
//   constructor(
//     executor: IAbortablePromiseConstructorFunction<GValue>,
//     signal: AbortSignal,
//   ) {
//     this._promise = wrapPromiseFactoryWithAbortSignal<GValue>(
//       () => new Promise<GValue>(
//         (
//           resolve: IAbortablePromiseResolveFunction<GValue>,
//           reject: IAbortablePromiseRejectFunction,
//         ) => {
//           executor(
//             resolve,
//             reject,
//             signal,
//           );
//         },
//       ),
//       signal,
//     );
//   }
//
//   then<GResult1 = GValue, GResult2 = never>(
//     onFulfilled?: IAbortablePromiseOnFulfilled<GValue, GResult1>,
//     onRejected?: IAbortablePromiseOnRejected<GResult2>,
//   ): Promise<GResult1 | GResult2> {
//     return this._promise.then(
//       () => {
//
//       },
//       () => {
//
//       },
//     );
//   }
//
//   // finally(onfinally?: (() => void) | undefined | null): Promise<T>
// }
//
