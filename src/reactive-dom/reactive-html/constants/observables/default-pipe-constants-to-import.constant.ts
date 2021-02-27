import { pipeSubscribeFunction } from '../../../../functions/piping/pipe-subscribe-function/pipe-subscribe-function';
import { mapSubscribePipe } from '../../../../subscribe-function/subscribe-pipe/emit-pipe-related/map-subscribe-pipe';
import { filterSubscribePipe } from '../../../../subscribe-function/subscribe-pipe/emit-pipe-related/filter-subscribe-pipe';
import { distinctSubscribePipe } from '../../../../subscribe-function/subscribe-pipe/emit-pipe-related/distinct-subscribe-pipe';

export const DEFAULT_PIPE_CONSTANTS_TO_IMPORT = {
  pipe: pipeSubscribeFunction,
  map: mapSubscribePipe,
  filter: filterSubscribePipe,
  distinct: distinctSubscribePipe,
};



