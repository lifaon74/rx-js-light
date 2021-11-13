import { filterObserverPipe } from '../../../../../../observer/pipes/built-in/filter/filter-observer-pipe';
import { IFilterFunctionGeneric } from '../../../../../../observer/pipes/built-in/filter/generic/filter-function-generic.type';
import { IFilterFunctionStrict } from '../../../../../../observer/pipes/built-in/filter/strict/filter-function-strict.type';
import { IObservable } from '../../../../../type/observable.type';
import { transformObservableWithObserverPipe } from '../helpers/transform-observable-with-observer-pipe';

/**
 * @see filterObserverPipe
 */
export function filterObservable<GValue>(
  subscribe: IObservable<GValue>,
  filterFunction: IFilterFunctionGeneric<GValue>,
): IObservable<GValue>;
export function filterObservable<GIn, GOut extends GIn>(
  subscribe: IObservable<GIn>,
  filterFunction: IFilterFunctionStrict<GIn, GOut>,
): IObservable<GOut>;
export function filterObservable<GIn, GOut extends GIn>(
  subscribe: IObservable<GIn>,
  filterFunction: IFilterFunctionStrict<GIn, GOut> | IFilterFunctionGeneric<GIn>,
): IObservable<GOut> {
  return transformObservableWithObserverPipe<GIn, GOut>(subscribe, filterObserverPipe<GIn, GOut>(filterFunction as IFilterFunctionStrict<GIn, GOut>));
}
