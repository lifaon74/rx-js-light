import { ILines } from '../../../compiler.types';

export function compileStaticAttribute(
  attribute: Attr,
): ILines {
  return [
    `// static attribute '${ attribute.name }'`,
    `setAttributeValue(node, ${ JSON.stringify(attribute.name) }, ${ JSON.stringify(attribute.value) });`,
  ];
}

