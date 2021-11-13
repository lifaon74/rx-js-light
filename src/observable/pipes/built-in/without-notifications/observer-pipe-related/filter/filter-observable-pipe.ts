import { IFilterFunctionGeneric } from '../../../../../../observer/pipes/built-in/filter/generic/filter-function-generic.type';
import { IFilterFunctionStrict } from '../../../../../../observer/pipes/built-in/filter/strict/filter-function-strict.type';
import { IObservable } from '../../../../../type/observable.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { filterObservable } from './filter-observable';

export function filterObservablePipe<GValue>(
  filterFunction: IFilterFunctionGeneric<GValue>,
): IObservablePipe<GValue, GValue>;
export function filterObservablePipe<GIn, GOut extends GIn>(
  filterFunction: IFilterFunctionStrict<GIn, GOut>,
): IObservablePipe<GIn, GOut>;
export function filterObservablePipe<GIn, GOut extends GIn>(
  filterFunction: IFilterFunctionStrict<GIn, GOut> | IFilterFunctionGeneric<GIn>,
): IObservablePipe<GIn, GOut> {
  return (subscribe: IObservable<GIn>): IObservable<GOut> => {
    return filterObservable<GIn, GOut>(subscribe, filterFunction as IFilterFunctionStrict<GIn, GOut>);
  };
}
