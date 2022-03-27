import { freeze } from '../../../../../misc/helpers/freeze';
import { createCloseNotification } from '../../../../../misc/notifications/built-in/close/create-close-notification';
import { createErrorNotification } from '../../../../../misc/notifications/built-in/error/create-error-notification';
import { createOpenNotification } from '../../../../../misc/notifications/built-in/open/create-open-notification';
import { fromEventTarget } from '../../../../../observable/built-in/from/without-notifications/dom/from-event-target/from-event-target';
import { pipe$$ } from '../../../../../observable/helpers/piping/pipe-observable/pipe-observable.shortcut';
import {
  map$$$
} from '../../../../../observable/pipes/built-in/without-notifications/observer-pipe-related/map/map-observable-pipe.shortcut';
import { IUnsubscribe } from '../../../../../observable/type/observable.type';
import { IObserver } from '../../../../../observer/type/observer.type';
import {
  IWebSocketInValue, IWebSocketOutValue, IWebSocketStream, IWebSocketStreamObservable,
  IWebSocketStreamObservableNotifications,
} from './web-socket-stream.type';


export interface IWebSocketFactory {
  (): WebSocket;
}

export function createWebSocketStream(
  createWebSocket: IWebSocketFactory,
): IWebSocketStreamObservable {
  return (emit: IObserver<IWebSocketStreamObservableNotifications>): IUnsubscribe => {
    type GWebSocketStream = IWebSocketStream;

    const socket: WebSocket = createWebSocket();

    if (socket.readyState === socket.CONNECTING) {
      const end = (): void => {
        unsubscribeToOpenEvent();
        unsubscribeToCloseEvent();
        unsubscribeToErrorEvent();
      };

      const open$ = fromEventTarget<'open', Event>(socket, 'open');
      const message$ = fromEventTarget<'message', MessageEvent<IWebSocketInValue>>(socket, 'message');
      const close$ = fromEventTarget<'close', CloseEvent>(socket, 'close');
      const error$ = fromEventTarget<'error', Event>(socket, 'error');

      const unsubscribeToOpenEvent = open$((): void => {
        unsubscribeToOpenEvent();

        const stream = freeze<GWebSocketStream>({
          emit: (value: IWebSocketOutValue): void => {
            socket.send(value);
          },
          subscribe: pipe$$(message$, [
            // logStateSubscribePipe<MessageEvent<ArrayBuffer>>('socket'),
            map$$$<MessageEvent<IWebSocketInValue>, IWebSocketInValue>((event: MessageEvent<IWebSocketInValue>): IWebSocketInValue => {
              return event.data;
            }),
            // share$$$<ArrayBuffer>(),
          ]),
        });

        emit(createOpenNotification<GWebSocketStream>(stream));
      });

      const unsubscribeToCloseEvent = close$((event: CloseEvent): void => {
        end();
        emit(createCloseNotification(event));
      });

      const unsubscribeToErrorEvent = error$((): void => {
        end();
        emit(createErrorNotification(new Error(`WebSocket Error`)));
      });

      return (): void => {
        if (
          (socket.readyState === socket.CONNECTING)
          || (socket.readyState === socket.OPEN)
        ) {
          end();
          socket.close();
        }
      };
    } else {
      throw new Error(`Socket should be in a CONNECTING state`);
    }
  };
}

