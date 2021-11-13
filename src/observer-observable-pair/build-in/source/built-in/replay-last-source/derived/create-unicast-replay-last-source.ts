import { IReplayLastSource } from '../replay-last-source.type';
import { createReplayLastSource, ICreateReplayLastSourceOptions } from '../create-replay-last-source';
import { IUnicastSource } from '../../unicast-source/unicast-source.type';
import { createUnicastSource } from '../../unicast-source/create-unicast-source';

export interface ICreateUnicastReplayLastSourceOptions<GValue> extends ICreateReplayLastSourceOptions<GValue> {
}

export type IUnicastReplayLastSource<GValue> = IReplayLastSource<GValue, IUnicastSource<GValue>>;

export function createUnicastReplayLastSource<GValue>(
  options?: ICreateUnicastReplayLastSourceOptions<GValue>,
): IUnicastReplayLastSource<GValue> {
  return createReplayLastSource<GValue, IUnicastSource<GValue>>(
    createUnicastSource<GValue>(),
    options,
  );
}
