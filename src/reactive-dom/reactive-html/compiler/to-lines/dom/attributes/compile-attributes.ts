import { createSimpleIteratorCompiler, ISimpleIteratorCompiler } from '../../helpers/create-simple-iterator-compiler';
import { compileDefaultAttributes } from './compilers/compile-default-attributes';

export interface IAttributesCompiler extends ISimpleIteratorCompiler<ArrayLike<Attr>> {
}

export const DEFAULT_ATTRIBUTES_COMPILERS: IAttributesCompiler[] = [
  compileDefaultAttributes,
];

export const compileAttributes = createSimpleIteratorCompiler<ArrayLike<Attr>>(DEFAULT_ATTRIBUTES_COMPILERS);

