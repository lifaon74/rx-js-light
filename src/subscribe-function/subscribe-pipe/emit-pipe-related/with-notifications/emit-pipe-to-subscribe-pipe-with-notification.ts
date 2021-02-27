import { IEmitPipeFunction } from '../../../../types/emit-pipe-function/emit-pipe-function.type';
import { ISubscribePipeFunction } from '../../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';
import { IEmitFunction } from '../../../../types/emit-function/emit-function.type';
import { createNextNotification } from '../../../../misc/notifications/built-in/next/create-next-notification';
import {
  IGenericNextNotification, INextNotification
} from '../../../../misc/notifications/built-in/next/next-notification.type';
import { isNextNotification } from '../../../../misc/notifications/built-in/next/is-next-notification';

export type IInferEmitPipeToSubscribePipeEmitPipeInValue<GIn> =
  GIn extends INextNotification<infer GValue>
    ? GValue
    : never;

export type IEmitPipeToSubscribePipeOutValue<GIn, GEmitPipeOut> =
  Exclude<GIn, IGenericNextNotification> | INextNotification<GEmitPipeOut>;

export type IEmitPipeToSubscribePipeWithNotificationsReturn<GIn, GEmitPipeOut> =
  ISubscribePipeFunction<GIn, IEmitPipeToSubscribePipeOutValue<GIn, GEmitPipeOut>>;

/**
 * Converts an emit pipe function to a subscribe pipe function
 */
export function emitPipeToSubscribePipeWithNotifications<GIn, GEmitPipeOut>(
  emitPipeFunction: IEmitPipeFunction<IInferEmitPipeToSubscribePipeEmitPipeInValue<GIn>, GEmitPipeOut>,
): IEmitPipeToSubscribePipeWithNotificationsReturn<GIn, GEmitPipeOut> {
  type GEmitPipeIn = IInferEmitPipeToSubscribePipeEmitPipeInValue<GIn>;
  type GOut = IEmitPipeToSubscribePipeOutValue<GIn, GEmitPipeOut>;

  return (subscribe: ISubscribeFunction<GIn>): ISubscribeFunction<GOut> => {
    return (emit: IEmitFunction<GOut>): IUnsubscribeFunction => {

      const next: IEmitFunction<GEmitPipeIn> = emitPipeFunction((value: GEmitPipeOut) => {
        emit(createNextNotification<GEmitPipeOut>(value));
      });

      return subscribe((value: GIn) => {
        if (isNextNotification<GEmitPipeIn>(value)) {
          next(value.value);
        } else {
          emit(value as GOut);
        }
      });
    };
  };
}
