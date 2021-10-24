import { ISubscribePipeFunction } from '../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { mapSubscribePipe } from '../../subscribe-function/subscribe-pipe/emit-pipe-related/map/map-subscribe-pipe';
import { distinctSubscribePipe } from '../../subscribe-function/subscribe-pipe/emit-pipe-related/distinct-subscribe-pipe';
import { pipeSubscribePipeFunctions } from '../../functions/piping/pipe-subscribe-pipe-functions/pipe-subscribe-pipe-functions';
import { IPluralRulesResult } from '../plural-rules/plural-rules.type';

export function pluralRulesResultToTranslationKeySubscribePipe(
  key: string,
): ISubscribePipeFunction<IPluralRulesResult, string> {
  return pipeSubscribePipeFunctions([
    mapSubscribePipe<IPluralRulesResult, string>((rule: IPluralRulesResult) => {
      return `${key}[${rule}]`;
    }),
    distinctSubscribePipe<string>(),
  ]);
}

// export function pluralRulesForTranslationsSubscribePipe(
//   key: string,
//   pluralRulesSubscribe: ISubscribePipeFunction<IPluralRulesValue, IPluralRulesResult>,
// ): ISubscribePipeFunction<IPluralRulesValue, string> {
//   return pipeSubscribePipeFunctions([
//     pluralRulesSubscribe,
//     mapSubscribePipe<IPluralRulesResult, string>((rule: IPluralRulesResult) => {
//       return `${ key }[${ rule }]`;
//     }),
//     distinctSubscribePipe<string>(),
//   ]);
// }
