
/** IMPLEMENTS **/

export interface ConnectedCallBack {
  connectedCallback(): void;
}

export interface DisconnectedCallBack {
  disconnectedCallback(): void;
}

export interface AttributeChangedCallback {
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}

