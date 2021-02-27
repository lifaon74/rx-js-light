import { ILines } from '../../../../compiler.types';
import { extractRXAttributes, IMappedAttributes } from '../helpers/extract-rx-attributes';
import { compileRXSwitchCase } from './compile-rx-switch-case';
import { getChildNodes } from '../../../../../../../light-dom/node/properties/get-child-nodes';
import { scopeLines } from '../../../../helpers/lines-formating-helpers';
import { isElementNode } from '../../../../../../../light-dom/node/type/is-element';
import { compileRXSwitchDefault } from './compile-rx-switch-default';


const TAG_NAME: string = 'rx-switch';

const SWITCH_MAP_NAME: string = 'switchMap';
const SWITCH_DEFAULT_NAME: string = 'switchDefault';

const EXPRESSION_ATTRIBUTE_NAME: string = 'expression';

const ATTRIBUTE_NAMES: Set<string> = new Set<string>([
  EXPRESSION_ATTRIBUTE_NAME,
]);


export function compileRXSwitch(
  node: Element,
): ILines | null {
  const name: string = node.tagName.toLowerCase();
  if (name === TAG_NAME) {
    const attributes: IMappedAttributes = extractRXAttributes(node.attributes, ATTRIBUTE_NAMES);
    const expression: string | undefined = attributes.get(EXPRESSION_ATTRIBUTE_NAME);

    if (expression === void 0) {
      throw new Error(`Missing attribute '${ EXPRESSION_ATTRIBUTE_NAME }'`);
    }

    const existingSwitchCaseValues: Set<string> = new Set<string>();

    const childNodes: ChildNode[] = getChildNodes(node);
    const childLines: ILines = [];
    let switchDefaultFound: boolean = false;

    for (let i = 0, l = childNodes.length; i < l; i++) {
      const childNode: ChildNode = childNodes[i];
      if (isElementNode(childNode)) {
        const result: ILines | null = compileRXSwitchCase(childNode, SWITCH_MAP_NAME, existingSwitchCaseValues);
        if (result === null) {
           const result: ILines | null = compileRXSwitchDefault(childNode, SWITCH_DEFAULT_NAME);
          if (result === null) {
            throw new Error(`Fond invalid element '${ childNode.tagName.toLowerCase() }'`);
          } else {
            if (switchDefaultFound) {
              throw new Error(`Switch - default already defined`);
            } else {
              switchDefaultFound = true;
              childLines.push(...result);
            }
          }
        } else {
          childLines.push(...result);
        }
      }
    }

    return generateRXSwitchLines(expression, childLines, SWITCH_MAP_NAME);
  } else {
    return null;
  }
}


export function generateRXSwitchLines(
  expression: string,
  childLines: ILines,
  switchMapName: string = SWITCH_MAP_NAME,
  switchDefaultName: string = SWITCH_DEFAULT_NAME,
): ILines {
  return scopeLines([
    `// reactive switch`,
    `const ${ switchMapName } = new Map();`,  // INFO let and const are important, because they SCOPE and fix the variables
    `let ${ switchDefaultName } = null;`,
    ...childLines,
    `nodeAppendChild(parentNode, createReactiveSwitchNode(${ expression }, ${ switchMapName }, ${ switchDefaultName }));`,
  ]);
}


