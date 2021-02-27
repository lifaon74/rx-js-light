import { ILines } from '../../../../compiler.types';
import { hasChildNodes } from '../../../../../../../light-dom/node/state/has-child-nodes';
import { hasAttribute } from '../../../../../../../light-dom/attribute/has-attribute';
import { extractRXAttributes, IMappedAttributes } from '../helpers/extract-rx-attributes';
import { getAttributeValue } from '../../../../../../../light-dom/attribute/get-attribute-value';
import { generateObjectPropertiesLines, IObjectProperties } from '../../../../helpers/generate-object-properties-lines';
import { indentLines, scopeLines } from '../../../../helpers/lines-formating-helpers';
import { generateLocalTemplateLinesFromElement } from '../helpers/generate-local-template-lines-from-element';
import { setAttributeValue } from '../../../../../../../light-dom/attribute/set-attribute-value';
import { isRXContainer } from '../rx-container/compile-rx-container';
import { generateLocalTemplateLinesFromNodes } from '../helpers/generate-local-template-lines-from-nodes';
import { getChildNodes } from '../../../../../../../light-dom/node/properties/get-child-nodes';
import { generateLocalTemplateLinesFromRXContainerOrElement } from '../helpers/generate-local-template-lines-from-node';

/*
Syntax:

<rx-for-loop
  items="itemsObservable"
  template="templateReference"
  track-by="trackByFunction"
></rx-for-loop>

 */

/*
Syntax - alternative:

<element
  *for="let item of items; index as index; trackBy: trackByFn"
>
  ...content
</element>

====> equivalent

<rx-template
  name="uuid"
>
  ...content
</rx-template>
<rx-for-loop
  items="items"
  template="uuid"
  track-by="trackByFn"
></rx-for-loop>

 */

const TAG_NAME: string = 'rx-for-loop';
const COMMAND_NAME: string = '*for';

const ITEMS_ATTRIBUTE_NAME: string = 'items';
const TEMPLATE_ATTRIBUTE_NAME: string = 'template';
const TRACK_BY_ATTRIBUTE_NAME: string = 'track-by';

const LOCAL_TEMPLATE_NAME: string = 'template';

const ATTRIBUTE_NAMES: Set<string> = new Set<string>([
  ITEMS_ATTRIBUTE_NAME,
  TEMPLATE_ATTRIBUTE_NAME,
  TRACK_BY_ATTRIBUTE_NAME,
]);

export function compileRXForLoop(
  node: Element,
): ILines | null {
  const name: string = node.tagName.toLowerCase();
  if (name === TAG_NAME) {
    const attributes: IMappedAttributes = extractRXAttributes(node.attributes, ATTRIBUTE_NAMES);
    const items: string | undefined = attributes.get(ITEMS_ATTRIBUTE_NAME);
    const template: string | undefined = attributes.get(TEMPLATE_ATTRIBUTE_NAME);
    const trackBy: string | undefined = attributes.get(TRACK_BY_ATTRIBUTE_NAME);

    const options: IObjectProperties = [];

    if (items === void 0) {
      throw new Error(`Missing attribute '${ ITEMS_ATTRIBUTE_NAME }'`);
    }

    if (template === void 0) {
      throw new Error(`Missing attribute '${ TEMPLATE_ATTRIBUTE_NAME }'`);
    }

    if (trackBy !== void 0) {
      options.push(['trackBy', trackBy]);
    }

    if (hasChildNodes(node)) {
      throw new Error(`Should not have any children`);
    }

    return generateRXForLoopLines(items, template, generateObjectPropertiesLines(options));
  } else if (hasAttribute(node, COMMAND_NAME)) {
    const command: IRXForLoopCommand = extractRXForLoopCommand(getAttributeValue(node, COMMAND_NAME) as string);
    setAttributeValue(node, COMMAND_NAME, null);

    const options: IObjectProperties = [];
    if (command.trackBy !== void 0) {
      options.push(['trackBy', command.trackBy]);
    }


    const constantsToImport: IObjectProperties = [];

    if (command.item !== void 0) {
      constantsToImport.push(['item', command.item]);
    }

    if (command.index !== void 0) {
      constantsToImport.push(['index', command.index]);
    }

    return scopeLines([
      ...generateLocalTemplateLinesFromRXContainerOrElement(node, LOCAL_TEMPLATE_NAME, constantsToImport),
      ...generateRXForLoopLines(command.items, LOCAL_TEMPLATE_NAME, generateObjectPropertiesLines(options))
    ]);
  } else {
    return null;
  }
}


// export function generateRXForLoopLines(
//   items: string,
//   template: string,
//   options: string,
// ): ILines {
//   return [
//     `// reactive for loop`,
//     `nodeAppendChild(parentNode, createReactiveForLoopNode(${ items }, ${ template }, ${ options }));`,
//   ];
// }

export function generateRXForLoopLines(
  items: string,
  template: string,
  options: string[],
): ILines {
  return [
    `// reactive for loop`,
    `nodeAppendChild(`,
    ...indentLines([
      `parentNode,`,
      `createReactiveForLoopNode(`,
      ...indentLines([
        `${ items },`,
        `${ template },`,
        ...options,
      ]),
      `)`,
    ]),
    `);`,
  ];
}

// export function generate

/*--------------*/

const LET_OF_PATTERN: string = 'let\\s+(\\S.*)\\s+of\\s+(\\S.*)';
const VARIABLE_AS_PATTERN: string = '(\\S.*)\\s+as\\s+(\\S.*)';
const OPTION_PATTERN: string = '(\\S.*)\\s*\\:\\s*(.*)';
const LET_OF_REGEXP: RegExp = new RegExp(`^${ LET_OF_PATTERN }$`);
const VARIABLE_AS_REGEXP: RegExp = new RegExp(`^${ VARIABLE_AS_PATTERN }$`);
const OPTION_REGEXP: RegExp = new RegExp(`^${ OPTION_PATTERN }$`);


export interface IRXForLoopCommand {
  items: string;
  trackBy: string | undefined;
  // template variables
  item: string;
  index: string | undefined;
}

export function generateForCommandInvalidSyntaxError(
  expression: string,
  message: string,
): Error {
  return new Error(`Invalid syntax in the 'for' command '${ expression }': ${ message }`);
}

export function extractRXForLoopCommand(
  input: string,
): IRXForLoopCommand {
  let items: string;
  let trackBy: string | undefined;
  let item: string;
  let index: string | undefined;

  const expressions: string[] = input.split(';').map(_ => _.trim()).filter(_ => (_ !== ''));

  const length: number = expressions.length;
  if (length === 0) {
    throw generateForCommandInvalidSyntaxError(input, 'missing iterable');
  } else {
    const match: RegExpExecArray | null = LET_OF_REGEXP.exec(expressions[0]);
    if (match === null) {
      throw generateForCommandInvalidSyntaxError(input, `invalid 'let ... of ...' syntax`);
    } else {
      item = match[1];
      items = match[2];
    }
  }

  for (let i = 1; i < length; i++) {
    const expression: string = expressions[i];
    let match: RegExpExecArray | null;
    if ((match = VARIABLE_AS_REGEXP.exec(expression)) !== null) {
      const variableName: string = match[1];
      const variableMappedName: string = match[2];
      switch (variableName) {
        case 'index':
          index = variableMappedName;
          break;
        default:
          throw generateForCommandInvalidSyntaxError(
            expression,
            `invalid local variable '${ variableName }'`
          );
      }
    } else if ((match = OPTION_REGEXP.exec(expression)) !== null) {
      const name: string = match[1];
      const value: string = match[2];
      switch (name) {
        case 'trackBy':
          trackBy = value;
          break;
        default:
          throw generateForCommandInvalidSyntaxError(
            expression,
            `invalid option '${ name }'`
          );
      }
    } else {
      throw generateForCommandInvalidSyntaxError(input, `unknown expression '${ expression }'`);
    }
  }

  return {
    items,
    trackBy,
    item,
    index,
  };
}

