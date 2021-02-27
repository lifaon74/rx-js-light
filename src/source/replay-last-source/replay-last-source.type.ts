import { ISource } from '../source.type';


export interface IReplayLastSourceMethods<GValue> {
  getValue(): GValue;
}

export type IReplayLastSource<GValue, GSource extends ISource<GValue>> =
  Omit<GSource, keyof IReplayLastSourceMethods<GValue>>
  & IReplayLastSourceMethods<GValue>;


