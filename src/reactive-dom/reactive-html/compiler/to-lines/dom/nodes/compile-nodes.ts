import { compileDefaultNodes } from './compilers/compile-default-nodes';
import { createSimpleIteratorCompiler, ISimpleIteratorCompiler } from '../../helpers/create-simple-iterator-compiler';

export interface INodesCompiler extends ISimpleIteratorCompiler<ArrayLike<Node>> {
}

export const DEFAULT_NODES_COMPILERS: INodesCompiler[] = [
  compileDefaultNodes,
];

export const compileNodes = createSimpleIteratorCompiler<ArrayLike<Node>>(DEFAULT_NODES_COMPILERS);


