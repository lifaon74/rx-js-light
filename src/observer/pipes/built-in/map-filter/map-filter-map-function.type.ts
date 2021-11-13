import { IMapFunction } from '../map/map-function.type';
import { IMapFilterDiscard } from './map-filter-discard.constant';

export type IMapFilterMapFunctionReturn<GOut> = GOut | IMapFilterDiscard;
export type IMapFilterMapFunction<GIn, GOut> = IMapFunction<GIn, IMapFilterMapFunctionReturn<GOut>>;
