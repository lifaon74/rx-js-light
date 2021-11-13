import { IObservable } from '../observable.type';

export type IMapValueTupleToObservableTuple<GValueTuple extends readonly any[]> =
  GValueTuple extends []
    ? []
    : (
      GValueTuple extends [infer GFirst, ...infer GRest]
        ? [IObservable<GFirst>, ...IMapValueTupleToObservableTuple<GRest>]
        : (
          GValueTuple extends (infer GValue)[]
            ? IObservable<GValue>[]
            : never[]
          )
      );

// type A = [a: number, b: number, ...rest: any[]];
// type A = string[];
// const a: IMapValueTupleToObservableTuple<A>;
