import { IObserverPipe } from '../../../type/observer-pipe.type';
import { filterObserverPipeStrict } from '../strict/filter-observer-pipe-strict';
import { IFilterFunctionGeneric } from './filter-function-generic.type';
import { IFilterFunctionStrict } from '../strict/filter-function-strict.type';

export function filterObserverPipeGeneric<GValue>(
  filterFunction: IFilterFunctionGeneric<GValue>,
): IObserverPipe<GValue, GValue> {
  return filterObserverPipeStrict<GValue, GValue>(filterFunction as IFilterFunctionStrict<GValue, GValue>);
}
