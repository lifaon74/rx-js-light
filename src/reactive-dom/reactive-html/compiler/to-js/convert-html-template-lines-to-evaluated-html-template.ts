import { ILines } from '../to-lines/compiler.types';
import { IHTMLTemplate } from '../../../light-dom/template/template.type';
import { linesToString } from '../to-lines/helpers/lines-formating-helpers';

export function convertHTMLTemplateLinesToEvaluatedHTMLTemplate<GTemplateArgument extends object>(
  lines: ILines
): IHTMLTemplate<GTemplateArgument> {
  return new Function(
    'arg',
    `return (${ linesToString(lines) })(arg);`,
  ) as IHTMLTemplate<GTemplateArgument>;
}
