import { IEmitFunction } from '../types/emit-function/emit-function.type';
import { IEmitPipeFunction } from '../types/emit-pipe-function/emit-pipe-function.type';

export interface IScanFunction<GIn, GOut> {
  (previousValue: GOut, value: GIn): GOut;
}

export function scanEmitPipe<GIn, GOut>(
  scanFunction: IScanFunction<GIn, GOut>,
  initialValue: GOut,
): IEmitPipeFunction<GIn, GOut> {
  return (emit: IEmitFunction<GOut>): IEmitFunction<GIn> => {
    let  previousValue: GOut = initialValue;
    return (value: GIn): void => {
      previousValue = scanFunction(previousValue, value)
      emit(previousValue);
    };
  };
}
