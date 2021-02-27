import { ILocaleMatcher } from '../shared.type';
import PluralRulesOptions = Intl.PluralRulesOptions;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/PluralRules

export type IPluralRulesLocaleMatcher = ILocaleMatcher;

export type IPluralRulesType = 'cardinal' | 'ordinal';


export interface IPluralRulesOptions extends PluralRulesOptions {
  localeMatcher?: IPluralRulesLocaleMatcher;
  type?: IPluralRulesType;

  minimumIntegerDigits?: number;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  minimumSignificantDigits?: number;
  maximumSignificantDigits?: number;
}


export type IPluralRulesValue = number;
export type IPluralRulesResult = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other'; // LDMLPluralRule;
