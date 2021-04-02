import { pipeSubscribeFunction } from '../../../../../../functions';
import { distinctSubscribePipe } from '../../../../../subscribe-pipe';
import {
  IReactiveFunctionReturn, IReactiveFunctionSubscribeFunctions, reactiveFunction
} from '../../reactive-function';
import { IGenericFunction } from '../../../../../../misc';

export function distinctReactiveFunction<GFunction extends IGenericFunction>(
  fnc: GFunction,
  subscribeFunctions: IReactiveFunctionSubscribeFunctions<GFunction>,
): IReactiveFunctionReturn<GFunction> {
  type GOut = ReturnType<GFunction>;

  return pipeSubscribeFunction(reactiveFunction<GFunction>(fnc, subscribeFunctions), [
    distinctSubscribePipe<GOut>(),
  ]);
}

