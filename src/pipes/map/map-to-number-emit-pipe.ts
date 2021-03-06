import { IEmitPipeFunction } from '../../types/emit-pipe-function/emit-pipe-function.type';
import { mapEmitPipe } from './map-emit-pipe';

export function mapToStringEmitPipe(): IEmitPipeFunction<any, string> {
  return mapEmitPipe(String);
}
