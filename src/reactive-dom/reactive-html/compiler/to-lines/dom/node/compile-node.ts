import { compileDefaultNode } from './compilers/compile-default-node';
import { createSimpleIteratorCompiler, ISimpleIteratorCompiler } from '../../helpers/create-simple-iterator-compiler';

export interface INodeCompiler extends ISimpleIteratorCompiler<Node> {
}

export const DEFAULT_NODE_COMPILERS: INodeCompiler[] = [
  compileDefaultNode,
];

export const compileNode = createSimpleIteratorCompiler<Node>(DEFAULT_NODE_COMPILERS);




