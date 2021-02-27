import { ICompilerReturn, ILines } from '../../../../compiler.types';
import {
  convertLetPropertyToObjectPropertyEntry,
  extractLetProperty, ILetProperty
} from '../helpers/extract-let-property';
import { indentLines } from '../../../../helpers/lines-formating-helpers';
import {
  extractReferenceProperty, IReferenceProperty
} from '../../../attribute/compilers/reference/extract-reference-property';
import { compileNodes } from '../../../nodes/compile-nodes';
import { getChildNodes } from '../../../../../../../light-dom/node/properties/get-child-nodes';
import { generateObjectPropertiesLines, IObjectProperties } from '../../../../helpers/generate-object-properties-lines';

/*
Syntax:

<rx-template
  name="templateReference"
  let-var1
  let-var2
>
  ...content
</rx-template>

 */

export function compileRXTemplate(
  node: Element,
): ILines | null {
  const name: string = node.tagName.toLowerCase();
  if (name === 'rx-template') {
    let referenceName!: string;
    const constantsToImports: IObjectProperties = [];

    const attributes: Attr[] = Array.from(node.attributes);
    for (let i = 0, l = attributes.length; i < l; i++) {
      const attribute: Attr = attributes[i];
      const letProperty: ILetProperty | null = extractLetProperty(attribute);
      if (letProperty === null) {
        const referenceProperty: IReferenceProperty | null = extractReferenceProperty(attribute);
        if (referenceProperty === null) {
          if (attribute.name === 'name') {
            if (referenceName === void 0) {
              referenceName = attribute.value;
            } else {
              throw new Error(`Found duplicate template's name through attribute 'name'`);
            }
          } else {
            throw new Error(`Found invalid attribute '${ attribute.name }'`);
          }
        } else {
          if (referenceName === void 0) {
            referenceName = referenceProperty.name;
          } else {
            throw new Error(`Found duplicate template's name through reference #${ referenceProperty.name }`);
          }
        }
      } else {
        constantsToImports.push(convertLetPropertyToObjectPropertyEntry(letProperty));
      }
    }

    let compiledChildren: ICompilerReturn = compileNodes(getChildNodes(node));
    if (compiledChildren === null) {
      compiledChildren = [];
    }

    return [
      `// template`,
      `var ${ referenceName } = (`,
      ...indentLines(
        generateRXTemplateFunctionLines(compiledChildren, constantsToImports),
      ),
      `);`,
    ];
    // return [
    //   `setTemplateReference(`,
    //   ...indentLines([
    //     `${ JSON.stringify(referenceName) },`,
    //     ...generateRXTemplateFunctionLines(constantsToImports, compiledChildren),
    //   ]),
    //   `);`,
    // ];
  } else {
    return null;
  }
}


export function generateRXTemplateFunctionLines(
  lines: ILines,
  constantsToImport?: IObjectProperties,
): ILines {
  return [
    `(`,
    ...indentLines(generateObjectPropertiesLines(constantsToImport, [])),
    `) => {`,
    ...indentLines([
      `const parentNode = createDocumentFragment();`,
      ...lines,
      `return parentNode;`,
    ]),
    `}`,
  ];
}

