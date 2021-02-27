import {
  createSimpleIteratorCompiler, ISimpleIteratorCompiler, wrapSimpleIteratorCompilerWithExtractor
} from '../../../../helpers/create-simple-iterator-compiler';
import { extractReferenceProperty, IReferenceProperty } from './extract-reference-property';
import { compileDefaultReferenceProperty } from './compilers/compile-default-reference-property';

export interface IReferencePropertyCompiler extends ISimpleIteratorCompiler<IReferenceProperty> {
}

export const DEFAULT_REFERENCE_PROPERTY_COMPILERS: IReferencePropertyCompiler[] = [
  compileDefaultReferenceProperty,
];

export const compileReferenceProperty = createSimpleIteratorCompiler<IReferenceProperty>(DEFAULT_REFERENCE_PROPERTY_COMPILERS);

export const compileReferencePropertyFromAttr = wrapSimpleIteratorCompilerWithExtractor<Attr, IReferenceProperty>(compileReferenceProperty, extractReferenceProperty);

