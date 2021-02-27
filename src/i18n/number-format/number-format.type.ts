import NumberFormatOptions = Intl.NumberFormatOptions;
import { ILocaleMatcher, INumberingSystem } from '../shared.type';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat

export type INumberFormatCompactDisplay = 'short' | 'long';

export type INumberFormatCurrency = string;

export type INumberFormatCurrencyDisplay =  'symbol' | 'narrowSymbol' | 'code' | 'name';

export type INumberFormatCurrencySign = 'accounting' | 'standard';

export type INumberFormatLocaleMatcher = ILocaleMatcher;

export type INumberFormatNotation = 'standard' | 'scientific' | 'engineering' | 'compact';

export type INumberFormatNumberingSystem = INumberingSystem;

export type INumberFormatSignDisplay = 'auto' | 'never' | 'always' | 'exceptZero';

export type INumberFormatStyle = 'decimal' | 'currency' | 'percent' | 'unit';

export type INumberFormatUnit = string;

export type INumberFormatUnitDisplay = 'long' | 'short' | 'narrow';


export interface INumberFormatOptions extends NumberFormatOptions {
  compactDisplay?: INumberFormatCompactDisplay;

  currency?: INumberFormatCurrency;
  currencyDisplay?: INumberFormatCurrencyDisplay;
  currencySign?: INumberFormatCurrencySign;

  localeMatcher?: INumberFormatLocaleMatcher;
  notation?: INumberFormatNotation;
  numberingSystem?: INumberFormatNumberingSystem;

  signDisplay?: INumberFormatSignDisplay;
  style?: INumberFormatStyle;
  unit?: INumberFormatUnit;
  unitDisplay?: INumberFormatUnitDisplay;

  useGrouping?: boolean;

  minimumIntegerDigits?: number;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  minimumSignificantDigits?: number;
  maximumSignificantDigits?: number;
}


export type INumberFormatValue = number | bigint;
