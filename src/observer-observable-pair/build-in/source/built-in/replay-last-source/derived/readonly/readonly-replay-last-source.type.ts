import { ISourceToReadonlySource } from '../../../readonly-source/source-to-readonly-source.type';
import { ISource } from '../../../../type/source.type';
import { IReplayLastSource } from '../../replay-last-source.type';

export type IReadonlyReplayLastSource<GValue, GSource extends ISource<GValue>> =
  ISourceToReadonlySource<IReplayLastSource<GValue, GSource>>;



