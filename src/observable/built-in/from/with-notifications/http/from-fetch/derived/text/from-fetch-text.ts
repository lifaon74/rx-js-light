import { createNetworkErrorFromResponse } from '../../../../../../../../misc/errors/network-error/create-network-error';
import { fulfilledObservable } from '../../../../../../../pipes/built-in/with-notifications/then/derived/fulfilled/fulfilled-observable';
import { IObservable } from '../../../../../../../type/observable.type';
import { throwError } from '../../../../others/throw-error/throw-error';
import { fromPromise } from '../../../../promise/from-promise/from-promise';
import { fromFetch } from '../../from-fetch';
import { IFromFetchTextObservableNotifications } from './from-fetch-text-observable-notifications.type';

/**
 * Uses the Fetch API to make an HTTP request, and returns the result as text
 */
export function fromFetchText(
  requestInfo: RequestInfo,
  requestInit?: RequestInit,
): IObservable<IFromFetchTextObservableNotifications> {
  return fulfilledObservable(
    fromFetch(
      requestInfo,
      requestInit,
    ),
    (response: Response): IObservable<IFromFetchTextObservableNotifications> => {
      if (response.ok) {
        return fromPromise<string>(response.text());
      } else {
        return throwError(createNetworkErrorFromResponse(response));
      }
    },
  );
}

