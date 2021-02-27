import { IEmitFunction } from '../types/emit-function/emit-function.type';
import { IEmitPipeFunction } from '../types/emit-pipe-function/emit-pipe-function.type';

/**
 * Returns an EmitFunction that emits all items emitted by the source EmitFunction that are distinct by comparison from previous values
 */
export function distinctEmitPipe<GValue>(): IEmitPipeFunction<GValue, GValue> {
  return (emit: IEmitFunction<GValue>): IEmitFunction<GValue> => {
    let previousValue: GValue;
    return (value: GValue): void => {
      if (value !== previousValue) {
        previousValue = value;
        emit(value);
      }
    };
  };
}


