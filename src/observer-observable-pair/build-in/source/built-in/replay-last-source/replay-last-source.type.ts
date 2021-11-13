import { IGenericSource, ISource } from '../../type/source.type';

export interface IReplayLastSourceMethods<GValue> {
  getValue(): GValue;
}

export type IReplayLastSource<GValue, GSource extends ISource<GValue>> =
  Omit<GSource, keyof IReplayLastSourceMethods<GValue>>
  & IReplayLastSourceMethods<GValue>;

/* derived */

export type IGenericReplayLastSource = IReplayLastSource<any, IGenericSource>;


