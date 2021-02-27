import { DEFAULT_DATA_NAME } from '../../../reactive-html/constants/default-data-name.constant';
import {
  generateObjectPropertiesFromLinearProperties, IObjectProperties
} from '../../../reactive-html/compiler/to-lines/helpers/generate-object-properties-lines';
import { DEFAULT_CONSTANTS_TO_IMPORT } from '../../../reactive-html/constants/default-constants-to-import.constant';

export function generateConstantsToImportForComponentTemplateFromObject(
  constantsToImport: object = DEFAULT_CONSTANTS_TO_IMPORT,
  dataName: string = DEFAULT_DATA_NAME,
): IObjectProperties {
  return generateObjectPropertiesFromLinearProperties([
    ...Object.keys(constantsToImport),
    dataName,
  ]);
}
