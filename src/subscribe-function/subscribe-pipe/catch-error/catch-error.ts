import { IEmitFunction, ISubscribeFunction, ISubscribePipeFunction, IUnsubscribeFunction } from '../../../types';
import { IErrorNotification, IGenericErrorNotification, isErrorNotification } from '../../../misc';
import { asyncUnsubscribe } from '../../../misc/helpers/async-unsubscribe';


export interface ICatchErrorSubscribePipeOnError<GError, GOnErrorOut> {
  (error: GError): ISubscribeFunction<GOnErrorOut>;
}

export type IInferCatchErrorSubscribePipeInError<GIn> =
  GIn extends IErrorNotification<infer GError>
    ? GError
    : never;

export type ICatchErrorSubscribePipeOutValue<GIn, GOnErrorOut> =
  Exclude<GIn, IGenericErrorNotification> | GOnErrorOut;

export type ICatchErrorSubscribePipeWithNotificationsReturn<GIn, GEmitPipeOut> =
  ISubscribePipeFunction<GIn, ICatchErrorSubscribePipeOutValue<GIn, GEmitPipeOut>>;


export function catchErrorSubscribePipe<GIn, GOnErrorOut>(
  onError: ICatchErrorSubscribePipeOnError<IInferCatchErrorSubscribePipeInError<GIn>, GOnErrorOut>
): ICatchErrorSubscribePipeWithNotificationsReturn<GIn, GOnErrorOut> {
  type GError = IInferCatchErrorSubscribePipeInError<GIn>;
  type GOut = ICatchErrorSubscribePipeOutValue<GIn, GOnErrorOut>;

  return (subscribe: ISubscribeFunction<GIn>): ISubscribeFunction<GOut> => {
    return (emit: IEmitFunction<GOut>): IUnsubscribeFunction => {
      let running: boolean = true;
      let childUnsubscribe: IUnsubscribeFunction | undefined;
      let parentRunning: boolean = true;

      const parentUnsubscribe = subscribe((value: GIn) => {
        if (isErrorNotification<GError>(value)) {
          asyncUnsubscribe(() => parentUnsubscribe, () => {
            parentRunning = false;
          });
          childUnsubscribe = onError(value.value)(emit);
        } else {
          emit(value as GOut);
        }
      });


      return () => {
        if (running) {
          running = false;
          if (parentRunning) {
            parentUnsubscribe();
          }
          if (childUnsubscribe !== void 0) {
            childUnsubscribe();
          }
        }
      };
    };
  };
}
