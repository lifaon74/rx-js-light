import { ILines } from '../../../../../compiler.types';
import { IEventProperty } from '../extract-event-property';

/**
 * Syntax:
 *  - standard: (event)
 *  - prefixed: on-event
 */
export function compileReactiveEventListener(
  eventProperty: IEventProperty,
): ILines {
  return [
    `// reactive event listener '${ eventProperty.name }'`,
    `setReactiveEventListener(${ eventProperty.value }, node, ${ JSON.stringify(eventProperty.name) });`,
  ];
}

