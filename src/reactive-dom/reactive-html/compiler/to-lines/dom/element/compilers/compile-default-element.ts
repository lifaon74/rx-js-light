import { ICompilerReturn, ILines } from '../../../compiler.types';
import { scopeLines } from '../../../helpers/lines-formating-helpers';
import { compileAttributes } from '../../attributes/compile-attributes';
import { compileNodes } from '../../nodes/compile-nodes';
import { getChildNodes } from '../../../../../../light-dom/node/properties/get-child-nodes';


export function compileDefaultElement(
  node: Element,
): ILines | null {
  const name: string = node.tagName.toLowerCase();
  const lines: ILines = [
    `// element '${ name }'`,
    `const node = createElementNode(${ JSON.stringify(name) });`,
    `nodeAppendChild(parentNode, node);`,
  ];

  const compiledAttributes: ICompilerReturn = compileAttributes(Array.from(node.attributes));
  if (compiledAttributes !== null) {
    lines.push(...[
      `// attributes`,
      ...compiledAttributes,
    ]);
  }

  const compiledChildren: ICompilerReturn = compileNodes(getChildNodes(node));
  if (compiledChildren !== null) {
    lines.push(...scopeLines([
      `// child nodes`,
      `const parentNode = node;`,
      ...compiledChildren,
    ]));
  }

  return scopeLines(lines);
}


