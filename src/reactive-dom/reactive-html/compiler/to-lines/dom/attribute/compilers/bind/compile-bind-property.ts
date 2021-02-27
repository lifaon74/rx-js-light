import {
  createSimpleIteratorCompiler, ISimpleIteratorCompiler, wrapSimpleIteratorCompilerWithExtractor
} from '../../../../helpers/create-simple-iterator-compiler';
import { extractBindProperty, IBindProperty } from './extract-bind-property';
import { compileReactiveClass } from './compilers/compile-reactive-class';
import { compileReactiveStyle } from './compilers/compile-reactive-style';
import { compileReactiveProperty } from './compilers/compile-reactive-property';
import { compileReactiveAttribute } from './compilers/compile-reactive-attribute';


export interface IBindPropertyCompiler extends ISimpleIteratorCompiler<IBindProperty> {
}

export const DEFAULT_BIND_PROPERTY_COMPILERS: IBindPropertyCompiler[] = [
  compileReactiveAttribute,
  compileReactiveClass,
  compileReactiveStyle,
  compileReactiveProperty,
];

export const compileBindProperty = createSimpleIteratorCompiler<IBindProperty>(DEFAULT_BIND_PROPERTY_COMPILERS);

export const compileBindPropertyFromAttr = wrapSimpleIteratorCompilerWithExtractor<Attr, IBindProperty>(compileBindProperty, extractBindProperty);
