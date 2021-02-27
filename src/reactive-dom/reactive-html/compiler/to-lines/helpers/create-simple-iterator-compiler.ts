import { ICompilerReturn } from '../compiler.types';

export interface ISimpleIteratorCompiler<GValue> {
  (value: GValue): ICompilerReturn;
}

export interface ISimpleIteratorChildCompiler<GValue> {
  (value: GValue): ICompilerReturn;
}

export function createSimpleIteratorCompiler<GValue>(
  compilers: ArrayLike<ISimpleIteratorChildCompiler<GValue>>,
): ISimpleIteratorCompiler<GValue> {
  return (
    value: GValue,
  ): ICompilerReturn => {
    for (let i = 0, l = compilers.length; i < l; i++) {
      const result: ICompilerReturn = compilers[i](value);
      if (result !== null) {
        return result;
      }
    }
    return null;
  };
}


/*-----------------------*/



export interface ISimpleIteratorCompilerExtractor<GIn, GOut> {
  (value: GIn): GOut | null;
}


export function wrapSimpleIteratorCompilerWithExtractor<GIn, GOut>(
  compiler: ISimpleIteratorCompiler<GOut>,
  extractor: ISimpleIteratorCompilerExtractor<GIn, GOut>,
): ISimpleIteratorCompiler<GIn> {
  return (
    value: GIn,
  ): ICompilerReturn => {
    const _value: GOut | null = extractor(value);
    return (_value === null)
      ? null
      : compiler(_value,);
  };
}

export function createSimpleIteratorCompilerWithExtractor<GIn, GOut>(
  extractor: ISimpleIteratorCompilerExtractor<GIn, GOut>,
  defaultCompilers: ArrayLike<ISimpleIteratorChildCompiler<GOut>>,
): ISimpleIteratorCompiler<GIn> {
  return wrapSimpleIteratorCompilerWithExtractor<GIn, GOut>(createSimpleIteratorCompiler<GOut>(defaultCompilers), extractor);
}

