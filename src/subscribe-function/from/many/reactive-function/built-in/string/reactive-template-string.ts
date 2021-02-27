import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';
import { reactiveFunction } from '../../reactive-function';
import { of } from '../../../../others';

/**
 * Creates a SubscribeFunction from a string template.
 *  - reactiveTemplateString`a${source1}b${source2}c`
 */
export function reactiveTemplateString(
  parts: TemplateStringsArray | string[],
  ...subscribeFunctions: ISubscribeFunction<any>[]
): ISubscribeFunction<string> {
  const lengthMinusOne: number = parts.length - 1;
  if (lengthMinusOne === 0) { // meaning subscribeFunctions === 0
    return of(parts[0]);
  } else {
    return reactiveFunction((...values: any[]) => {
      let str: string = '';
      for (let i = 0; i < lengthMinusOne; i++) {
        str += parts[i] + values[i];
      }
      return str + parts[lengthMinusOne];
    }, subscribeFunctions);
  }
}
