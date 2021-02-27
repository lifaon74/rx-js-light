import { compileDefaultElement } from './compilers/compile-default-element';
import { createSimpleIteratorCompiler, ISimpleIteratorCompiler } from '../../helpers/create-simple-iterator-compiler';
import { compileRXComponent } from '../rx-component/compile-rx-component';

export interface IElementCompiler extends ISimpleIteratorCompiler<Element> {
}

export const DEFAULT_ELEMENT_COMPILERS: IElementCompiler[] = [
  compileRXComponent,
  compileDefaultElement,
];

export const compileElement = createSimpleIteratorCompiler<Element>(DEFAULT_ELEMENT_COMPILERS);
