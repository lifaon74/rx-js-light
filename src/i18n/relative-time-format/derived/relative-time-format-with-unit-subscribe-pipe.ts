import { reactiveFunction } from '../../../subscribe-function/from/many/reactive-function/reactive-function';
import { ISubscribeFunction } from '../../../types/subscribe-function/subscribe-function.type';
import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { ILocales } from '../../locales/locales.type';
import {
  IRelativeTimeFormatOptions, IRelativeTimeFormatUnit, IRelativeTimeFormatValue, IRelativeTimeFormatValueAndUnit,
} from '../relative-time-format.type';
import { relativeTimeFormatSubscribePipe } from '../relative-time-format-subscribe-pipe';

export function relativeTimeFormatWithUnitSubscribePipe(
  locales: ISubscribeFunction<ILocales>,
  unit: ISubscribeFunction<IRelativeTimeFormatUnit>,
  options?: ISubscribeFunction<IRelativeTimeFormatOptions>,
): ISubscribePipeFunction<IRelativeTimeFormatValue, string> {
  const _relativeTimeFormatSubscribePipe: ISubscribePipeFunction<IRelativeTimeFormatValueAndUnit, string> = relativeTimeFormatSubscribePipe(locales, options);
  return (subscribe: ISubscribeFunction<IRelativeTimeFormatValue>): ISubscribeFunction<string> => {
    return _relativeTimeFormatSubscribePipe(
      reactiveFunction(
        [subscribe, unit],
        (value: IRelativeTimeFormatValue, unit: IRelativeTimeFormatUnit): IRelativeTimeFormatValueAndUnit => {
          return { value, unit };
        },
      ),
    );
  };
}

// export function relativeTimeFormatWithUnitSubscribePipe(
//   locales: ISubscribeFunction<ILocales>,
//   unit: ISubscribeFunction<IRelativeTimeFormatUnit>,
//   options: ISubscribeFunction<IRelativeTimeFormatOptions>
// ): ISubscribePipeFunction<IRelativeTimeFormatValue, string> {
//   const format: ISubscribeFunction<RelativeTimeFormat> = reactiveFunction(
//     [locales, options],
//     (locales: ILocales, options: IRelativeTimeFormatOptions): RelativeTimeFormat => {
//       return new Intl.RelativeTimeFormat(locales as any, options);
//     },
//   );
//   return (subscribe: ISubscribeFunction<IRelativeTimeFormatValue>): ISubscribeFunction<string> => {
//     return reactiveFunction(
//       [subscribe, unit, format],
//       (value: IRelativeTimeFormatValue, unit: IRelativeTimeFormatUnit, format: RelativeTimeFormat): string => {
//         return format.format(value, unit);
//       },
//     );
//   };
// }



