import { IEmitPipeFunction } from '../types/emit-pipe-function/emit-pipe-function.type';
import { tapEmitPipe } from './tap-emit-pipe';


export function logEmitPipe<GValue>(
  name?: string,
): IEmitPipeFunction<GValue, GValue> {
  return tapEmitPipe<GValue>(
    (name === void 0)
      ? (value: GValue) => console.log(value)
      : (value: GValue) => console.log(name, value)
  );
}




