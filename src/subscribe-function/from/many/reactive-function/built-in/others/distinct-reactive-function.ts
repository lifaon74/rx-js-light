import { pipeSubscribeFunction } from '../../../../../../functions/piping/pipe-subscribe-function/pipe-subscribe-function';
import { IGenericFunction } from '../../../../../../misc/types/generic-function.type';
import { distinctSubscribePipe } from '../../../../../subscribe-pipe/emit-pipe-related/distinct-subscribe-pipe';
import { IReactiveFunctionReturn, IReactiveFunctionSubscribeFunctions, reactiveFunction } from '../../reactive-function';

export function distinctReactiveFunction<GFunction extends IGenericFunction>(
  subscribeFunctions: IReactiveFunctionSubscribeFunctions<GFunction>,
  fnc: GFunction,
): IReactiveFunctionReturn<GFunction> {
  type GOut = ReturnType<GFunction>;

  return pipeSubscribeFunction(reactiveFunction<GFunction>(subscribeFunctions, fnc), [
    distinctSubscribePipe<GOut>(),
  ]);
}

