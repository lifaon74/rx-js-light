import { ISource } from '../../../source.type';
import { ISourceToReadonlySource } from '../../../readonly-source';
import { IReplayLastSource } from '../../replay-last-source.type';

export type IReadonlyReplayLastSource<GValue, GSource extends ISource<GValue>> =
  ISourceToReadonlySource<IReplayLastSource<GValue, GSource>>;



