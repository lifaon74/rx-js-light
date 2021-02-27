import {
  createSimpleIteratorCompiler, ISimpleIteratorCompiler, wrapSimpleIteratorCompilerWithExtractor
} from '../../../../helpers/create-simple-iterator-compiler';
import { extractEventProperty, IEventProperty } from './extract-event-property';
import { compileReactiveEventListener } from './compilers/compile-reactive-event-listener';

export interface IEventPropertyCompiler extends ISimpleIteratorCompiler<IEventProperty> {
}

export const DEFAULT_EVENT_PROPERTY_COMPILERS: IEventPropertyCompiler[] = [
  compileReactiveEventListener,
];

export const compileEventProperty = createSimpleIteratorCompiler<IEventProperty>(DEFAULT_EVENT_PROPERTY_COMPILERS);

export const compileEventPropertyFromAttr = wrapSimpleIteratorCompilerWithExtractor<Attr, IEventProperty>(compileEventProperty, extractEventProperty);

