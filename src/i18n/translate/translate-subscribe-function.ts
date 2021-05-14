import { ISubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';
import { reactiveFunction } from '../../subscribe-function/from/many/reactive-function/reactive-function';
import { of } from '../../subscribe-function/from/others/of/of';
import { ITranslations } from './translations.type';
import {
  IReactiveStringParameters, reactiveString
} from '../../subscribe-function/from/many/reactive-function/built-in/string/reactive-string';
import { pipeSubscribeFunction } from '../../functions/piping/pipe-subscribe-function/pipe-subscribe-function';
import { mergeAllSingleSubscribePipe } from '../../subscribe-function/subscribe-pipe/merge-all/merge-all-single-subscribe-pipe';


export function translateSubscribeFunction(
  translations: ISubscribeFunction<ITranslations>,
  key: ISubscribeFunction<string>,
  options: ISubscribeFunction<IReactiveStringParameters> = of({}),
): ISubscribeFunction<string> {
  const translation: ISubscribeFunction<ISubscribeFunction<string>> = reactiveFunction(
    [translations, key, options],
    reactiveTranslation,
  );
  return pipeSubscribeFunction(translation, [
    mergeAllSingleSubscribePipe(),
  ]);
}

export function reactiveTranslation(
  translations: ITranslations,
  key: string,
  options?: IReactiveStringParameters,
): ISubscribeFunction<string> {
  if (translations.has(key)) {
    return reactiveString(translations.get(key) as any, options);
  } else {
    return of(key);
  }
}


/*----------------------*/


/*----------------------*/


// export interface ITranslateOptions {
//   [key: string]: any;
// }
//
// export function translateSubscribeFunction(
//   translations: ISubscribeFunction<ITranslations>,
//   key: ISubscribeFunction<string>,
//   options: ISubscribeFunction<ITranslateOptions> = of({}),
// ): ISubscribeFunction<string> {
//   return reactiveFunction(
//     translate,
//     [translations, key, options],
//   );
// }
//
//
// const TRANSLATE_VARIABLE_PATTERN: string = '{{(.*?)}}';
// const TRANSLATE_VARIABLE_REGEXP: RegExp = new RegExp(TRANSLATE_VARIABLE_PATTERN, 'g');
//
// /**
//  * Replace everything inside {{ }} with a variable
//  */
// export function translate(
//   translations: ITranslations,
//   key: string,
//   options: ITranslateOptions = {},
// ): string {
//   if (translations.has(key)) {
//     TRANSLATE_VARIABLE_REGEXP.lastIndex = 0;
//     return (translations.get(key) as string).replace(TRANSLATE_VARIABLE_REGEXP, (substring: string, variableName: string): string => {
//       variableName = variableName.trim();
//       return (variableName in options)
//         ? String(options[variableName])
//         : substring;
//     });
//   } else {
//     return key;
//   }
// }
