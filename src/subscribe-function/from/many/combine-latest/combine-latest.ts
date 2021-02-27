import { TMapSubscribeFunctionTupleToValueTuple } from '../types';
import { IEmitFunction } from '../../../../types/emit-function/emit-function.type';
import {
  IGenericSubscribeFunction, ISubscribeFunction, IUnsubscribeFunction
} from '../../../../types/subscribe-function/subscribe-function.type';
import { createEmptyError } from '../../../../misc/errors/empty-error/create-empty-error';


export type ICombineLatestSubscribeFunctionsValues<GSubscribeFunctions extends readonly IGenericSubscribeFunction[]> = Readonly<TMapSubscribeFunctionTupleToValueTuple<GSubscribeFunctions>>;

/**
 * Combines multiple SubscribeFunctions to create an SubscribeFunction whose values are calculated from the latest values of each of its input SubscribeFunctions.
 * INFO: provided 'subscribeFunctions' array MUST not change.
 * INFO: received arrays are readonly.
 */
export function combineLatest<GSubscribeFunctions extends readonly IGenericSubscribeFunction[]>(
  subscribeFunctions: GSubscribeFunctions,
): ISubscribeFunction<ICombineLatestSubscribeFunctionsValues<GSubscribeFunctions>> {
  type GValue = ICombineLatestSubscribeFunctionsValues<GSubscribeFunctions>;
  const length: number = subscribeFunctions.length;
  if (length === 0) {
    throw createEmptyError();
  } else {
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      const values: unknown[] = Array.from({ length });
      const received: boolean[] = Array.from({ length });
      let receivedCount: number = 0;
      const unsubscribe: IUnsubscribeFunction[] = subscribeFunctions
        .map((subscribe: IGenericSubscribeFunction, index: number) => {
          return subscribe((value: GValue) => {
            values[index] = value;
            if (!received[index]) {
              received[index] = true;
              receivedCount++;
            }
            if (receivedCount === length) {
              emit(values as unknown as GValue);
            }
          });
        });
      return (): void => {
        for (let i = 0, l = unsubscribe.length; i < l; i++) {
          unsubscribe[i]();
        }
      };
    };
  }
}

