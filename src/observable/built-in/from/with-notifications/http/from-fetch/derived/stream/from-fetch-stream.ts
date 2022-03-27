import { createNetworkErrorFromResponse } from '../../../../../../../../misc/errors/network-error/create-network-error';
import { fulfilledObservable } from '../../../../../../../pipes/built-in/with-notifications/then/derived/fulfilled/fulfilled-observable';
import { IObservable } from '../../../../../../../type/observable.type';
import { throwError } from '../../../../others/throw-error/throw-error';
import { fromReadableStream } from '../../../../readable-stream/w3c/from-readable-stream/from-readable-stream';
import { fromFetch } from '../../from-fetch';
import { IFromFetchStreamObservableNotifications } from './from-fetch-stream-observable-notifications.type';

/**
 * Uses the Fetch API to make an HTTP request, and returns the result as a stream of Uint8Array
 */
export function fromFetchStream(
  requestInfo: RequestInfo,
  requestInit?: RequestInit,
): IObservable<IFromFetchStreamObservableNotifications> {
  return fulfilledObservable(
    fromFetch(
      requestInfo,
      requestInit,
    ),
    (response: Response): IObservable<IFromFetchStreamObservableNotifications> => {
      if (response.ok) {
        if (response.body === null) {
          return throwError(new Error(`Response's body is null`));
        } else {
          return fromReadableStream<Uint8Array>(response.body);
        }
      } else {
        return throwError(createNetworkErrorFromResponse(response));
      }
    },
  );
}

