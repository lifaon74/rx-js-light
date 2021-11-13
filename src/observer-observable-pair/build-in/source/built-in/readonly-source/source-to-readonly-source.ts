import { freeze } from '../../../../../misc/helpers/freeze';
import { IGenericSource } from '../../type/source.type';
import { ISourceToReadonlySource } from './source-to-readonly-source.type';

export function sourceToReadonlySource<GSource extends IGenericSource>(
  {
    emit,
    ...readonlySource
  }: GSource,
): ISourceToReadonlySource<GSource> {
  return freeze(readonlySource);
}

