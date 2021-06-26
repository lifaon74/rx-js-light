import { ISourceToReadonlySource } from './source-to-readonly-source.type';
import { IGenericSource } from '../source.type';
import { freeze } from '../../misc';

export function sourceToReadonlySource<GSource extends IGenericSource>(
  source: GSource,
): ISourceToReadonlySource<GSource> {
  const { emit, ...readonlySource } = source;
  return freeze(readonlySource);
}

