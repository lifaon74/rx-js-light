import { createNetworkErrorFromResponse } from '../../../../../../../../misc/errors/network-error/create-network-error';
import { fulfilledObservable } from '../../../../../../../pipes/built-in/with-notifications/then/derived/fulfilled/fulfilled-observable';
import { IObservable } from '../../../../../../../type/observable.type';
import { throwError } from '../../../../others/throw-error/throw-error';
import { fromPromise } from '../../../../promise/from-promise/from-promise';
import { fromFetch } from '../../from-fetch';
import { IFromFetchJSONObservableNotifications } from './from-fetch-json-observable-notifications.type';

/**
 * Uses the Fetch API to make an HTTP request, and returns a JSON object
 */
export function fromFetchJSON<GResult>(
  requestInfo: RequestInfo,
  requestInit?: RequestInit,
): IObservable<IFromFetchJSONObservableNotifications<GResult>> {
  return fulfilledObservable(
    fromFetch(
      requestInfo,
      requestInit,
    ),
    (response: Response): IObservable<IFromFetchJSONObservableNotifications<GResult>> => {
      if (response.ok) {
        return fromPromise<GResult>(response.json());
      } else {
        return throwError(createNetworkErrorFromResponse(response));
      }
    },
  );
}

