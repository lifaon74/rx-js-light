// export type INodeReferencesMap = IReferencesMap<Node>;
//
// export type ITemplateReferencesMap = IReferencesMap<ITemplate<any[]>>;
//
//
// export interface IInjectTemplateOptions<GData> {
//   data: GData;
//   nodeReferencesMap?: INodeReferencesMap;
//   templateReferencesMap?: ITemplateReferencesMap;
// }
//
// export function compileReactiveHTMLAsInjectableTemplate<GData>(
//   html: string,
//   defaultConstantsToImport: object = DEFAULT_CONSTANTS_TO_IMPORT,
// ): ITemplate<[IInjectTemplateOptions<GData>]> {
//   const template: ITemplate<[object]> = compileReactiveHTML<object>(html, new Set<string>([
//     ...Object.keys(defaultConstantsToImport),
//     'data',
//     'getNodeReference',
//     'setNodeReference',
//     'getTemplateReference',
//     'setTemplateReference',
//   ]));
//
//   return (
//     {
//       data,
//       nodeReferencesMap = createReferencesMap(),
//       templateReferencesMap = createReferencesMap(),
//     }
//   ): DocumentFragment => {
//     const {
//       getReference: getNodeReference,
//       setReference: setNodeReference,
//     } = createReferencesMapGetterAndSetter(nodeReferencesMap);
//
//     const {
//       getReference: getTemplateReference,
//       setReference: setTemplateReference,
//     } = createReferencesMapGetterAndSetter(templateReferencesMap);
//
//     return template({
//       ...defaultConstantsToImport,
//       data,
//       getNodeReference,
//       setNodeReference,
//       getTemplateReference,
//       setTemplateReference,
//     });
//   };
// }
