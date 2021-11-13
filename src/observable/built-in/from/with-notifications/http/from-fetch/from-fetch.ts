import {
  fromPromiseFactory, IObservableFromPromiseFactoryNotifications,
} from '../../promise/from-promise-factory/from-promise-factory';
import { IObservable } from '../../../../../type/observable.type';

export type IObservableFromFetchNotifications = IObservableFromPromiseFactoryNotifications<Response>;

/**
 * Uses the Fetch API to make an HTTP request.
 */
export function fromFetch(
  requestInfo: RequestInfo,
  requestInit?: RequestInit,
): IObservable<IObservableFromFetchNotifications> {
  return fromPromiseFactory(
    (signal: AbortSignal): Promise<Response> => {
      return fetch(requestInfo, {
        ...requestInit,
        signal,
      });
    },
    requestInit,
  );
}

