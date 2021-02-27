export type ITranslations = Map<string, string>;

export type ITranslationKey = string;
export type ITranslationValue = string;

export type ITranslationKeyToTranslationValueMap = Map<ITranslationKey, ITranslationValue>;
export type ILocaleToTranslationKeyToTranslationValueMap = Map<string, ITranslationKeyToTranslationValueMap>;

