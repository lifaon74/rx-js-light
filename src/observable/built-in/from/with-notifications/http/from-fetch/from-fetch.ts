import { IObservable } from '../../../../../type/observable.type';
import { fromPromiseFactory } from '../../promise/from-promise-factory/from-promise-factory';
import { IFromFetchObservableNotifications } from './from-fetch-observable-notifications.type';

/**
 * Uses the Fetch API to make an HTTP request.
 */
export function fromFetch(
  requestInfo: RequestInfo,
  requestInit?: RequestInit,
): IObservable<IFromFetchObservableNotifications> {
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

