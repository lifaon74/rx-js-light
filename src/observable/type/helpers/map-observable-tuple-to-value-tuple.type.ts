import { IGenericObservable, IObservable } from '../observable.type';

export type IMapObservableTupleToValueTuple<GObservableTuple extends readonly IGenericObservable[]> =
  GObservableTuple extends readonly []
    ? []
    : (
      GObservableTuple extends readonly [infer GFirst, ...infer GRest]
        ? [
          (
            GFirst extends IObservable<infer GValue>
              ? GValue
              : never
            ),
          ...(
            GRest extends readonly IGenericObservable[]
              ? IMapObservableTupleToValueTuple<GRest>
              : never[]
            )
        ]
        : (
          GObservableTuple extends readonly (infer GObservable)[]
            ? (
              GObservable extends IObservable<infer GValue>
                ? GValue[]
                : never
              )
            : never[]
          )
      );

// type A = [a: IObservable<string>, b: IObservable<number>, ...rest: IObservable<any>[]];
// const a: IMapObservableTupleToValueTuple<A>;
// const a: IMapObservableTupleToValueTuple<readonly IObservable<string>[]>;
// const a: Readonly<IMapObservableTupleToValueTuple<IObservable<string>[]>>;
