import { IMapFunction, mapEmitPipe } from '../../../../pipes/map-emit-pipe';
import {
  emitPipeToSubscribePipeWithNotifications, IInferEmitPipeToSubscribePipeEmitPipeInValue,
  IEmitPipeToSubscribePipeWithNotificationsReturn
} from './emit-pipe-to-subscribe-pipe-with-notification';


/**
 * @see mapEmitPipe
 */
export function mapSubscribePipeWithNotifications<GIn, GMapOut>(
  mapFunction: IMapFunction<IInferEmitPipeToSubscribePipeEmitPipeInValue<GIn>, GMapOut>,
): IEmitPipeToSubscribePipeWithNotificationsReturn<GIn, GMapOut> {
  return emitPipeToSubscribePipeWithNotifications<GIn, GMapOut>(
    mapEmitPipe<IInferEmitPipeToSubscribePipeEmitPipeInValue<GIn>, GMapOut>(mapFunction),
  );
}

