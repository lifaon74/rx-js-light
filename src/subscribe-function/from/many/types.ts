import {
  IGenericSubscribeFunction, ISubscribeFunction
} from '../../../types/subscribe-function/subscribe-function.type';


export type TMapValueTupleToSubscribeFunctionTuple<GValueTuple extends readonly any[]> =
  GValueTuple extends []
    ? []
    : (
      GValueTuple extends [infer GFirst, ...infer GRest]
        ? [ISubscribeFunction<GFirst>, ...TMapValueTupleToSubscribeFunctionTuple<GRest>]
        : (
          GValueTuple extends (infer GValue)[]
            ? ISubscribeFunction<GValue>[]
            : never[]
          )
      );

// type A = [a: number, b: number, ...rest: any[]];
// type A = string[];
// const a: TMapValueTupleToSubscribeFunctionTuple<A>;


export type TMapSubscribeFunctionTupleToValueTuple<GSubscribeFunctionTuple extends readonly IGenericSubscribeFunction[]> =
  GSubscribeFunctionTuple extends readonly []
    ? []
    : (
      GSubscribeFunctionTuple extends readonly [infer GFirst, ...infer GRest]
        ? [
          (
            GFirst extends ISubscribeFunction<infer GValue>
              ? GValue
              : never
            ),
          ...(
            GRest extends readonly IGenericSubscribeFunction[]
              ? TMapSubscribeFunctionTupleToValueTuple<GRest>
              : never[]
            )
        ]
        : (
          GSubscribeFunctionTuple extends readonly (infer GSubscribeFunction)[]
            ? (
              GSubscribeFunction extends ISubscribeFunction<infer GValue>
                ? GValue[]
                : never
              )
            : never[]
          )
      );


// type A = [a: ISubscribeFunction<string>, b: ISubscribeFunction<number>, ...rest: ISubscribeFunction<any>[]];
// const a: TMapSubscribeFunctionTupleToValueTuple<A>;
// const a: TMapSubscribeFunctionTupleToValueTuple<readonly ISubscribeFunction<string>[]>;
// const a: Readonly<TMapSubscribeFunctionTupleToValueTuple<ISubscribeFunction<string>[]>>;
