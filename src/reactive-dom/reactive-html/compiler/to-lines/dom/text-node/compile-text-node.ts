import { createSimpleIteratorCompiler, ISimpleIteratorCompiler } from '../../helpers/create-simple-iterator-compiler';
import { compileReactiveTextNode } from './compilers/compile-reactive-text-node';
import { compileStaticTextNode } from './compilers/compile-static-text-node';

export interface ITextNodeCompiler extends ISimpleIteratorCompiler<Text> {
}

export const DEFAULT_TEXT_NODE_COMPILERS: ITextNodeCompiler[] = [
  compileReactiveTextNode,
  compileStaticTextNode,
];

export const compileTextNode = createSimpleIteratorCompiler<Text>(DEFAULT_TEXT_NODE_COMPILERS);

