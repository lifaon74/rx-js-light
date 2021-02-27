
/** IMPLEMENTS **/

/**
 * Called immediately when a new Component is created,
 *  - INFO: use it to return the data to inject into your template
 *  - INFO: perfect time to setup all your template's variables, and component's properties
 *  - WARN: doesnt guaranty that the component is actually into the DOM !
 */
export interface OnCreate<GData extends object> {
  onCreate(): GData;
}

/**
 * Called right after the Component's style and template have finished to load and render
 *  - INFO: perfect time to access the rendered components style or template (but use with caution)
 *  - WARN: doesnt guaranty that the component is actually into the DOM !
 */
export interface OnInit {
  onInit(): void;
}

/**
 * Called when the component is connected to the DOM.
 *  - INFO: use with caution
 *  - WARN: doesnt guaranty that the component's style and template are loaded and rendered (OnInit)
 */
export interface OnConnect {
  onConnect(): void;
}

/**
 * Called when the component is disconnected from the DOM.
 *  - INFO: perfect time to release resources like: pending timeouts, timers, pending promises, observers, etc...
 */
export interface OnDisconnect {
  onDisconnect(): void;
}
