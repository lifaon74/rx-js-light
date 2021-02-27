import { createSimpleIteratorCompiler, ISimpleIteratorCompiler } from '../../helpers/create-simple-iterator-compiler';
import { compileRXTemplate } from './compilers/rx-template/compile-rx-template';
import { compileRXInjectContent } from './compilers/rx-inject-content/compile-rx-inject-content';
import { compileRXIf } from './compilers/rx-if/compile-rx-if';
import { compileRXForLoop } from './compilers/rx-for-loop/compile-rx-for-loop';
import { compileRXContainer } from './compilers/rx-container/compile-rx-container';
import { compileRXInjectTemplate } from './compilers/rx-inject-template/compile-rx-inject-template';
import { compileRXSwitch } from './compilers/rx-switch/compile-rx-switch';

export interface IRXComponentCompiler extends ISimpleIteratorCompiler<Element> {
}

export const DEFAULT_RX_COMPONENT_COMPILERS: IRXComponentCompiler[] = [
  compileRXTemplate,
  compileRXSwitch,
  compileRXIf,
  compileRXForLoop,
  compileRXContainer,
  compileRXInjectContent,
  compileRXInjectTemplate,
];

export const compileRXComponent = createSimpleIteratorCompiler<Element>(DEFAULT_RX_COMPONENT_COMPILERS);
