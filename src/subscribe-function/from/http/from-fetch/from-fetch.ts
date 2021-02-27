import { fromPromiseFactory, ISubscribeFunctionFromPromiseFactoryNotifications } from '../../promise/from-promise-factory/from-promise-factory';
import { ISubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';

export type ISubscribeFunctionFromFetchNotifications = ISubscribeFunctionFromPromiseFactoryNotifications<Response>;

/**
 * Uses the Fetch API to make an HTTP request.
 */
export function fromFetch(
  requestInfo: RequestInfo,
  requestInit?: RequestInit,
): ISubscribeFunction<ISubscribeFunctionFromFetchNotifications> {
  return fromPromiseFactory(
    (signal: AbortSignal) => {
      return fetch(requestInfo, {
        ...requestInit,
        signal,
      });
    },
    requestInit,
  );
}

