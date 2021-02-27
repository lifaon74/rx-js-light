import { ICompilerReturn, ILines } from '../../../compiler.types';
import { nullIfEmptyLines } from '../../../helpers/lines-formating-helpers';
import { compileNode } from '../../node/compile-node';


export function compileDefaultNodes(
  nodes: ArrayLike<Node>,
): ICompilerReturn {
  const lines: ILines = [];
  for (let i = 0, l = nodes.length; i < l; i++) {
    const result: ICompilerReturn = compileNode(nodes[i]);
    if (result !== null) {
      lines.push(...result);
    }
  }
  return nullIfEmptyLines(lines);
}
