import { IEmitPipeFunction } from '../../types/emit-pipe-function/emit-pipe-function.type';
import { mapEmitPipe } from './map-emit-pipe';


export function mapToNumberEmitPipe(): IEmitPipeFunction<any, number> {
  return mapEmitPipe(Number);
}
