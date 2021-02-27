import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';
import { reactiveTemplateString } from './reactive-template-string';
import { IKeyValueIterable } from '../../../../../../misc/helpers/to-key-value-iterable/key-value-iterable';
import { keyValueIterableLikeToKeyValueIterable } from '../../../../../../misc/helpers/to-key-value-iterable/key-value-iterable-like-to-key-value-iterable';


const VARIABLE_PATTERN: string = '{{(.*?)}}';
const TRANSLATE_VARIABLE_REGEXP: RegExp = new RegExp(VARIABLE_PATTERN, 'g');

export interface ITextAndVariableParts {
  texts: string[];
  variables: string[];
}

export function extractReactiveStringParts(
  string: string,
): ITextAndVariableParts {
  const texts: string[] = [];
  const variables: string[] = [];
  let match: RegExpExecArray | null;
  let index: number = 0;
  while ((match = TRANSLATE_VARIABLE_REGEXP.exec(string)) !== null) {
    texts.push(string.slice(index, match.index));
    variables.push(match[1].trim());
    index = match.index + match[0].length;
  }
  texts.push(string.slice(index));
  return {
    texts,
    variables,
  };
}



/*----------------------------*/


export interface IReactiveStringObjectParameters {
  [key: string]: ISubscribeFunction<any>;
}

export type IReactiveStringKeyValueParameters = IKeyValueIterable<string, ISubscribeFunction<any>>;

export type IReactiveStringParameters = IReactiveStringKeyValueParameters | IReactiveStringObjectParameters;


/**
 * Creates a SubscribeFunction from a string template.
 *  - reactiveString('a{{source1}}b{{source2}}c')
 */
export function reactiveString(
  string: string,
  parameters: IReactiveStringParameters = [],
): ISubscribeFunction<string> {
  const _options: Map<string, ISubscribeFunction<any>> = new Map<string, ISubscribeFunction<any>>(keyValueIterableLikeToKeyValueIterable<string, ISubscribeFunction<any>>(parameters));
  const { texts, variables } = extractReactiveStringParts(string);
  const subscribeFunctions: ISubscribeFunction<any>[] = variables.map((variable: string) => {
    if (_options.has(variable)) {
      return _options.get(variable) as ISubscribeFunction<any>;
    } else {
      throw new Error(`Missing parameter: '${ variable }'`);
    }
  });

  return reactiveTemplateString(texts, ...subscribeFunctions);
}
