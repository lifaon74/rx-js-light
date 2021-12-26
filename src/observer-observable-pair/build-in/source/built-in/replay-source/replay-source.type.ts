import { IGenericSource, ISource } from '../../type/source.type';

export interface IReplaySourceMethods<GValue> {
  getValues(): readonly GValue[];
}

export type IReplaySource<GValue, GSource extends ISource<GValue>> =
  Omit<GSource, keyof IReplaySourceMethods<GValue>>
  & IReplaySourceMethods<GValue>;

/* derived */

export type IGenericReplaySource = IReplaySource<any, IGenericSource>;


