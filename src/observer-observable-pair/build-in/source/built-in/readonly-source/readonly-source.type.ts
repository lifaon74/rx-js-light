import { ISource } from '../../type/source.type';
import { ISourceToReadonlySource } from './source-to-readonly-source.type';

export type IReadonlySource<GValue> = ISourceToReadonlySource<ISource<GValue>>;
