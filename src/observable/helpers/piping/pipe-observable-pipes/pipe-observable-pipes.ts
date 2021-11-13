import { pipe } from '../../../../misc/functional/pipe/pipe';
import { IInferPipeReturn } from '../../../../misc/functional/pipe/types/infer-pipe-return.type';
import { IPipeNowConstraint } from '../../../../misc/functional/pipe/types/pipe-now-constraint.type';
import { IGenericObservablePipe } from '../../../pipes/type/observable-pipe.type';

export type IObservablePipePipeConstraint<// generics
  GFunctions
  //
  > =
  IPipeNowConstraint<any, GFunctions> extends readonly IGenericObservablePipe[]
    ? IPipeNowConstraint<any, GFunctions>
    : never;

export type IPipeObservablePipesReturn<// generics
  GFunctions extends readonly IGenericObservablePipe[]
  //
  >
  = IInferPipeReturn<GFunctions>;

export function pipeObservablePipes<// generics
  GFunctions extends IObservablePipePipeConstraint<GFunctions>
  //
  >(
  fns: GFunctions,
): IPipeObservablePipesReturn<GFunctions> {
  return pipe<GFunctions>(fns);
}


