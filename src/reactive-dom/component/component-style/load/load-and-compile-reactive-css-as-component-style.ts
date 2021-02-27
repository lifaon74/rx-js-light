import { createNetworkErrorFromResponse } from '../../../../misc/errors/network-error/create-network-error';
import { compileReactiveCSSAsComponentStyle } from '../compile/compile-reactive-css-as-component-style';


export function loadAndCompileReactiveCSSAsComponentStyle(
  url: string,
): Promise<HTMLStyleElement> {
  return fetch(url)
    .then((response: Response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw createNetworkErrorFromResponse(response);
      }
    })
    .then((content: string) => {
      return compileReactiveCSSAsComponentStyle(content);
    });
}
