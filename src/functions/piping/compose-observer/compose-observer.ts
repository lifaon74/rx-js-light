import { IGenericObserverPipe } from '../../../observer/pipes/type/observer-pipe.type';
import { IGenericObserver } from '../../../observer/type/observer.type';
import { composeNow } from '../../../misc/functional/compose/compose-now';
import { IInferComposeNowReturn } from '../../../misc/functional/compose/types/infer-compose-now-return.type';
import { IComposeConstraint } from '../../../misc/functional/compose/types/compose-constraint.type';
import { IComposeNowValueConstraint } from '../../../misc/functional/compose/types/compose-now-value-constraint.type';

export type IObserverComposeConstraint<// generics
  GFunctions extends readonly IGenericObserverPipe[],
  //
  > =
  IComposeConstraint<GFunctions, any, IGenericObserverPipe>;

type IGenericObserverConstraint<GValue> =
  GValue extends IGenericObserver
    ? GValue
    : never;

export type IObserverComposeValueConstraint<// generics
  GFunctions extends readonly IGenericObserverPipe[],
  //
  > =
  IGenericObserverConstraint<IComposeNowValueConstraint<GFunctions, IGenericObserverPipe>>;

export type IObserverComposeReturn<// generics
  GFunctions extends readonly IGenericObserverPipe[],
  GObserver extends IGenericObserver,
  //
  >
  = IInferComposeNowReturn<GFunctions, GObserver>;

export function composeObserver<// generics
  GFunctions extends IObserverComposeConstraint<GFunctions>,
  GObserver extends IObserverComposeValueConstraint<GFunctions>,
  //
  >(
  fns: GFunctions,
  Observer: GObserver,
): IObserverComposeReturn<GFunctions, GObserver> {
  return composeNow<GFunctions, GObserver, IGenericObserverPipe>(fns, Observer);
}
