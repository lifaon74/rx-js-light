import { IEmitFunction, IGenericEmitFunction } from '../types/emit-function/emit-function.type';
import { ISubscribeFunction } from '../types/subscribe-function/subscribe-function.type';

/**
 * A Source does the link between an EmitFunction and SubscribeFunction
 * 'emit' and 'subscribe' are tied together
 */
export interface ISource<GValue> {
  readonly emit: IEmitFunction<GValue>;
  readonly subscribe: ISubscribeFunction<GValue>;
}

/* derived */

export type IGenericSource = ISource<any>;

