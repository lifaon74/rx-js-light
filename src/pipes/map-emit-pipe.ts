import { IEmitFunction } from '../types/emit-function/emit-function.type';
import { IEmitPipeFunction } from '../types/emit-pipe-function/emit-pipe-function.type';

export interface IMapFunction<GIn, GOut> {
  (value: GIn): GOut;
}


export function mapEmitPipe<GIn, GOut>(
  mapFunction: IMapFunction<GIn, GOut>,
): IEmitPipeFunction<GIn, GOut> {
  return (emit: IEmitFunction<GOut>): IEmitFunction<GIn> => {
    return (value: GIn): void => {
      emit(mapFunction(value));
    };
  };
}
