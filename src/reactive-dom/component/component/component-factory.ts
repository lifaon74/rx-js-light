import { HTMLElementConstructor } from '../custom-element/elements-list';
import { IComponent } from './component.type';
import { IComponentOptions } from './component-options.type';
import { IComponentTemplate } from '../component-template/component-template.type';
import { attachDocumentFragmentWithAttachEvent } from '../../light-dom/node/move/node/with-event/bulk/fragment/attach-document-fragment-with-event';
import {
  onNodeConnectedToCached, onNodeConnectedToWithImmediateCached
} from '../../light-dom/node/state/on-node-connected-to';
import { TOP_PARENT_NODE } from '../../misc/top-parent-node-constant';
import { registerCustomElement } from '../custom-element/custom-element-functions';
import { IHTMLTemplate } from '../../light-dom/template/template.type';
import { IComponentStyle } from '../component-style/component-style.type';
import { incrementStyleElementUsageCount } from '../component-style/style-element-usage-count';
import { activateStyleElement } from '../component-style/helpers/activate-style-element';
import { deactivateStyleElement } from '../component-style/helpers/deactivate-style-element';
import { applyStyleElementForComponent } from '../component-style/prepare-style-element-for-component';

function loadComponentTemplate<GData extends object>(
  instance: IComponent<GData>,
  data: GData,
  template?: IComponentTemplate<GData>,
): Promise<void> {
  if (template === void 0) {
    return Promise.resolve();
  } else {
    return Promise.resolve(template)
      .then((template: IHTMLTemplate<GData>) => {
        attachDocumentFragmentWithAttachEvent(template(data), instance);
      });
  }
}

function loadComponentStyle<GData extends object>(
  instance: IComponent<GData>,
  style?: IComponentStyle,
): Promise<void> {
  if (style === void 0) {
    return Promise.resolve();
  } else {
    return Promise.resolve(style)
      .then((htmlStyleElement: HTMLStyleElement) => {
        applyStyleElementForComponent(htmlStyleElement, instance);
        onNodeConnectedToWithImmediateCached(instance, TOP_PARENT_NODE)((connected: boolean) => {
          if (connected) {
            if (incrementStyleElementUsageCount(htmlStyleElement) === 1) {
              activateStyleElement(htmlStyleElement);
            }
          } else {
            if (incrementStyleElementUsageCount(htmlStyleElement) === 0) {
              deactivateStyleElement(htmlStyleElement);
            }
          }
        });
      });
  }
}

function initComponent<GData extends object>(
  instance: IComponent<GData>,
  options: IComponentOptions<GData>,
): void {

  const data: GData = (typeof instance.onCreate === 'function')
    ? Object.freeze(instance.onCreate())
    : Object.freeze(Object.create(null)) as GData;

  Promise.all([
    loadComponentTemplate<GData>(instance, data, options.template),
    loadComponentStyle<GData>(instance, options.style),
  ]).then(() => {
    if (typeof instance.onInit === 'function') {
      instance.onInit.call(instance);
    }
  });

  if (
    (typeof instance.onConnect === 'function')
    || (typeof instance.onDisconnect === 'function')
  ) {
    onNodeConnectedToCached(instance, TOP_PARENT_NODE)((connected: boolean) => {
      if (connected) {
        if (typeof instance.onConnect === 'function') {
          instance.onConnect();
        }
      } else {
        if (typeof instance.onDisconnect === 'function') {
          instance.onDisconnect();
        }
      }
    });
  }
}


export function componentFactory<GBaseClass extends HTMLElementConstructor, GData extends object>(
  baseClass: GBaseClass,
  options: IComponentOptions<GData>,
) {
  let initEnabled: boolean = false;

  const _class = class extends baseClass {
    constructor(...args: any[]) {
      super(...args);
      if (initEnabled) {
        initComponent<GData>(this, options);
      }
    }
  };

  // registerCustomElement may create an instance of the component, so we need to disabled the init
  registerCustomElement(_class, options);
  initEnabled = true;

  return _class;
}

