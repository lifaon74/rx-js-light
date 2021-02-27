
/**
 * An HTMLTemplate is a function which returns a DocumentFragment
 */
export interface IHTMLTemplate<GTemplateArgument extends object> {
  (value: GTemplateArgument): DocumentFragment;
}

export interface IHTMLTemplateAsync<GTemplateArgument extends object> {
  (value: GTemplateArgument): Promise<DocumentFragment>;
}

export type IHTMLTemplateNodeList = readonly ChildNode[];

/* derived */

export type IGenericHTMLTemplate = IHTMLTemplate<object>;
export type IGenericHTMLTemplateOrNull = IGenericHTMLTemplate | null;



// export type ITemplateNodeList = ArrayLike<IStandardNode>;
//
// /**
//  * A Template is a function which returns a list of StandardNode
//  */
// export interface ITemplate<GArguments extends any[]> {
//   (...args: GArguments): ITemplateNodeList;
// }
