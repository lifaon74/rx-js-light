import { IObserver } from '../../../../type/observer.type';
import { filterObserverStrict } from '../strict/filter-observer-strict';
import { IFilterFunctionGeneric } from './filter-function-generic.type';
import { IFilterFunctionStrict } from '../strict/filter-function-strict.type';

export function filterObserverGeneric<GValue>(
  emit: IObserver<GValue>,
  filterFunction: IFilterFunctionGeneric<GValue>,
): IObserver<GValue> {
  return filterObserverStrict<GValue, GValue>(emit, filterFunction as IFilterFunctionStrict<GValue, GValue>);
}
