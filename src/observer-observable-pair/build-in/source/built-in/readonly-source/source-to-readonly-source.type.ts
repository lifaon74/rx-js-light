import { IGenericSource } from '../../type/source.type';

export type ISourceToReadonlySource<GSource extends IGenericSource> = Omit<GSource, 'emit'>;
