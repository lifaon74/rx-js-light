import { IGenericSource } from '../source.type';

export type ISourceToReadonlySource<GSource extends IGenericSource> = Omit<GSource, 'emit'>;
