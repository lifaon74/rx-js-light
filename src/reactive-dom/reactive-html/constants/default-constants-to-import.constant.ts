import { nodeAppendChild } from '../../light-dom/node/move/devired/dom-like/node/node-append-child';
import { attachTemplate } from '../../light-dom/template/attach-template';
import { createDocumentFragment } from '../../light-dom/node/create/create-document-fragment';
import { createTextNode } from '../../light-dom/node/create/create-text-node';
import { createReactiveTextNode } from '../../reactive-dom/text/create-reactive-text-node';
import { createElementNode } from '../../light-dom/node/create/create-element-node';
import { setAttributeValueWithEvent } from '../../light-dom/attribute/with-event/set-attribute-value-with-event';
import { setReactiveProperty } from '../../reactive-dom/element/property/set-reactive-property';
import { setReactiveAttribute } from '../../reactive-dom/element/attribute/set-reactive-attribute';
import { setReactiveClass } from '../../reactive-dom/element/class/set-reactive-class';
import { setReactiveClassList } from '../../reactive-dom/element/class/set-reactive-class-list';
import { setReactiveStyle } from '../../reactive-dom/element/style/set-reactive-style';
import { setReactiveStyleList } from '../../reactive-dom/element/style/set-reactive-style-list';
import { setReactiveEventListener } from '../../reactive-dom/element/event-listener/set-reactive-event-listener';
import { createReactiveIfNode } from '../../reactive-dom/template/reactive-if-node/create-reactive-if-node';
import { createReactiveForLoopNode } from '../../reactive-dom/template/reactive-for-loop-node/create-reactive-for-loop-node';
import { createReactiveContentNode } from '../../reactive-dom/template/reactive-content-node/create-reactive-content-node';
import { createReactiveSwitchNode } from '../../reactive-dom/template/reactive-switch-node/create-reactive-switch-node';

/**
 * Mandatory constants to import for reactiveHTML
 */
export const DEFAULT_CONSTANTS_TO_IMPORT = {
  // dom manipulation
  nodeAppendChild,
  attachTemplate,

  // node creation
  createDocumentFragment,
  createTextNode,
  createReactiveTextNode,
  createElementNode,

  // attribute / property settings
  setAttributeValue: setAttributeValueWithEvent,
  setReactiveProperty,
  setReactiveAttribute,
  setReactiveClass,
  setReactiveClassList,
  setReactiveStyle,
  setReactiveStyleList,
  setReactiveEventListener,

  // reactive nodes
  createReactiveIfNode,
  createReactiveForLoopNode,
  createReactiveSwitchNode,
  createReactiveContentNode,
};



