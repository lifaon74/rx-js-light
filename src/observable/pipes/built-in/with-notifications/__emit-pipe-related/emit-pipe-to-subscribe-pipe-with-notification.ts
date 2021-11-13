import { createNextNotification } from '../../../../../misc/notifications/built-in/next/create-next-notification';
import { isNextNotification } from '../../../../../misc/notifications/built-in/next/is-next-notification';
import { IGenericNextNotification, INextNotification } from '../../../../../misc/notifications/built-in/next/next-notification.type';
import { IObserver } from '../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../type/observable.type';
import { IObservablePipe } from '../../../type/observable-pipe.type';

export type IInferEmitPipeToObservablePipeEmitPipeInValue<GIn> =
  GIn extends INextNotification<infer GValue>
    ? GValue
    : never;

export type IEmitPipeToObservablePipeOutValue<GIn, GEmitPipeOut> =
  Exclude<GIn, IGenericNextNotification> | INextNotification<GEmitPipeOut>;

export type IEmitPipeToObservablePipeWithNotificationsReturn<GIn, GEmitPipeOut> =
  IObservablePipe<GIn, IEmitPipeToObservablePipeOutValue<GIn, GEmitPipeOut>>;

/**
 * Converts an emit pipe function to a subscribe pipe function
 */
export function emitPipeToObservablePipeWithNotifications<GIn, GEmitPipeOut>(
  emitPipeFunction: IObservablePipe<IInferEmitPipeToObservablePipeEmitPipeInValue<GIn>, GEmitPipeOut>,
): IEmitPipeToObservablePipeWithNotificationsReturn<GIn, GEmitPipeOut> {
  type GEmitPipeIn = IInferEmitPipeToObservablePipeEmitPipeInValue<GIn>;
  type GOut = IEmitPipeToObservablePipeOutValue<GIn, GEmitPipeOut>;

  return (subscribe: IObservable<GIn>): IObservable<GOut> => {
    return (emit: IObserver<GOut>): IUnsubscribe => {

      const next: IObserver<GEmitPipeIn> = emitPipeFunction((value: GEmitPipeOut): void => {
        emit(createNextNotification<GEmitPipeOut>(value));
      });

      return subscribe((value: GIn): void => {
        if (isNextNotification<GEmitPipeIn>(value)) {
          next(value.value);
        } else {
          emit(value as GOut);
        }
      });
    };
  };
}
