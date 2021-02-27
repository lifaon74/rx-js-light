import { ILines } from '../../../compiler.types';

export function compileStaticTextNode(
  node: Text,
): ILines | null {
  return compileStaticText(node.data);
}

/*------*/

export function compileStaticText(
  text: string,
): ILines | null {
  return (text === '')
    ? null
    : generateStaticTextNodeLines(text);
}

export function generateStaticTextNodeLines(
  text: string,
): ILines {
  return [
    `// static text node`,
    `nodeAppendChild(parentNode, createTextNode(${ JSON.stringify(text) }));`,
  ];
}
