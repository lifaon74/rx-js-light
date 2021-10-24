import { pipeSubscribeFunction } from '../../../../../../functions';
import { distinctSubscribePipe } from '../../../../../subscribe-pipe';
import {
  IReactiveFunctionReturn, IReactiveFunctionSubscribeFunctions, reactiveFunction,
} from '../../reactive-function';
import { IGenericFunction } from '../../../../../../misc';

export function distinctReactiveFunction<GFunction extends IGenericFunction>(
  subscribeFunctions: IReactiveFunctionSubscribeFunctions<GFunction>,
  fnc: GFunction,
): IReactiveFunctionReturn<GFunction> {
  type GOut = ReturnType<GFunction>;

  return pipeSubscribeFunction(reactiveFunction<GFunction>(subscribeFunctions, fnc), [
    distinctSubscribePipe<GOut>(),
  ]);
}

