import { IFilterFunctionGeneric } from '../../../../../../observer/pipes/built-in/filter/generic/filter-function-generic.type';
import { IFilterFunctionStrict } from '../../../../../../observer/pipes/built-in/filter/strict/filter-function-strict.type';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

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
  return (emit: IObserver<GOut>): IUnsubscribe => {
    return subscribe((value: GIn): void => {
      if (filterFunction(value)) {
        emit(value);
      }
    });
  };
  // return transformObservableWithObserverPipe<GIn, GOut>(subscribe, filterObserverPipe<GIn, GOut>(filterFunction as IFilterFunctionStrict<GIn, GOut>));
}
