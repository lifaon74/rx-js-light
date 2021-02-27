import { IEmitFunction } from '../types/emit-function/emit-function.type';
import { IEmitPipeFunction } from '../types/emit-pipe-function/emit-pipe-function.type';


/** STRICT **/

export interface IFilterFunctionStrict<GIn, GOut extends GIn> {
  (value: GIn): value is GOut;
}

export function filterEmitPipeStrict<GIn, GOut extends GIn>(
  filterFunction: IFilterFunctionStrict<GIn, GOut>,
): IEmitPipeFunction<GIn, GOut> {
  return (emit: IEmitFunction<GOut>): IEmitFunction<GIn> => {
    return (value: GIn): void => {
      if (filterFunction(value)) {
        emit(value);
      }
    };
  };
}

/** BASIC **/

export interface IFilterFunctionBasic<GValue> {
  (value: GValue): boolean;
}

export function filterEmitPipeBasic<GValue>(
  filterFunction: IFilterFunctionBasic<GValue>,
): IEmitPipeFunction<GValue, GValue> {
  return filterEmitPipeStrict<GValue, GValue>(filterFunction as IFilterFunctionStrict<GValue, GValue>);
}


/** BOTH **/

export function filterEmitPipe<GValue>(
  filterFunction: IFilterFunctionBasic<GValue>,
): IEmitPipeFunction<GValue, GValue>;
export function filterEmitPipe<GIn, GOut extends GIn>(
  filterFunction: IFilterFunctionStrict<GIn, GOut>,
): IEmitPipeFunction<GIn, GOut>;
export function filterEmitPipe<GIn, GOut extends GIn>(
  filterFunction: IFilterFunctionStrict<GIn, GOut> | IFilterFunctionBasic<GIn>,
): IEmitPipeFunction<GIn, GOut> {
  return filterEmitPipeStrict<GIn, GOut>(filterFunction as IFilterFunctionStrict<GIn, GOut>);
}

