import { IMapFunction } from '../../../../../observer/pipes/built-in/map/map-function.type';
import { mapObserverPipe } from '../../../../../observer/pipes/built-in/map/map-observer-pipe';
import {
  emitPipeToObservablePipeWithNotifications,
  IEmitPipeToObservablePipeWithNotificationsReturn,
  IInferEmitPipeToObservablePipeEmitPipeInValue,
} from './emit-pipe-to-subscribe-pipe-with-notification';

/**
 * @see mapObserverPipe
 */
export function mapObservablePipeWithNotifications<GIn, GMapOut>(
  mapFunction: IMapFunction<IInferEmitPipeToObservablePipeEmitPipeInValue<GIn>, GMapOut>,
): IEmitPipeToObservablePipeWithNotificationsReturn<GIn, GMapOut> {
  return emitPipeToObservablePipeWithNotifications<GIn, GMapOut>(
    mapObserverPipe<IInferEmitPipeToObservablePipeEmitPipeInValue<GIn>, GMapOut>(mapFunction),
  );
}

