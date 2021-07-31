import { IEmitFunction } from '../../types/emit-function/emit-function.type';
import { IEmitPipeFunction } from '../../types/emit-pipe-function/emit-pipe-function.type';
import { IMapFunction } from './map-emit-pipe';


export const MAP_FILTER_DISCARD = Symbol('map-filter-discard');
export type IMapFilterDiscard = typeof MAP_FILTER_DISCARD;

export type IMapFilterMapFunctionReturn<GOut> = GOut | IMapFilterDiscard;
export type IMapFilterMapFunction<GIn, GOut> = IMapFunction<GIn, IMapFilterMapFunctionReturn<GOut>>;

export function mapFilterEmitPipe<GIn, GOut>(
  mapFunction: IMapFilterMapFunction<GIn, GOut>,
): IEmitPipeFunction<GIn, GOut> {
  return (emit: IEmitFunction<GOut>): IEmitFunction<GIn> => {
    return (value: GIn): void => {
      const result: IMapFilterMapFunctionReturn<GOut> = mapFunction(value);
      if (result !== MAP_FILTER_DISCARD) {
        emit(result);
      }
    };
  };
}
