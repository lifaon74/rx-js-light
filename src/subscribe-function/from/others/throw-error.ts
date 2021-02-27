import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../../types';
import { createErrorNotification, IErrorNotification } from '../../../misc';
import { noop } from '../../../misc/helpers/noop';

export function throwError<GError>(
  error: GError,
): ISubscribeFunction<IErrorNotification<GError>> {
  return (emit: IEmitFunction<IErrorNotification<GError>>): IUnsubscribeFunction => {
    emit(createErrorNotification<GError>(error));
    return noop;
  };
}
