import { IObserver } from '../../../../type/observer.type';
import { IObserverPipe } from '../../../type/observer-pipe.type';
import { filterObserverStrict } from './filter-observer-strict';
import { IFilterFunctionStrict } from './filter-function-strict.type';

export function filterObserverPipeStrict<GIn, GOut extends GIn>(
  filterFunction: IFilterFunctionStrict<GIn, GOut>,
): IObserverPipe<GIn, GOut> {
  return (emit: IObserver<GOut>): IObserver<GIn> => {
    return filterObserverStrict<GIn, GOut>(emit, filterFunction);
  };
}
