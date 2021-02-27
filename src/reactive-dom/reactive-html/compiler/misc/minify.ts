export function loadScript(
  url: string,
): Promise<void> {
  return new Promise<void>((
    resolve: (value: void | PromiseLike<void>) => void,
    reject: (reason?: any) => void,
  ): void => {
    const scriptElement: HTMLScriptElement = document.createElement('script');

    const clear = () => {
      // document.head.removeChild(scriptElement);
    };

    scriptElement.onerror = () => {
      clear();
      reject(new Error(`Failed to load`));
    };

    scriptElement.onload = () => {
      clear();
      resolve();
    };

    scriptElement.src = url;

    document.head.appendChild(scriptElement);
  });
}

/*--*/
export type ITerserMinifyOptions = object;

export interface ITerserMinify {
  (code: string, options?: ITerserMinifyOptions): Promise<ITerserMinifyResult>;
}

export interface ITerserMinifyResult {
  code: string;
  map: string;
}

let IMPORT_TERSER_PROMISE: Promise<ITerserMinify>;

export function importTerser(): Promise<ITerserMinify> {
  if (IMPORT_TERSER_PROMISE === void 0) {
    IMPORT_TERSER_PROMISE = loadScript(`https://cdn.jsdelivr.net/npm/source-map@0.7.3/dist/source-map.js`)
      .then(() => {
        return loadScript(`https://cdn.jsdelivr.net/npm/terser/dist/bundle.min.js`);
      })
      .then(() => {
        return globalThis['Terser']['minify'] as ITerserMinify;
      });
  }
  return IMPORT_TERSER_PROMISE;
}

export function minify(
  code: string,
  options?: ITerserMinifyOptions,
): Promise<ITerserMinifyResult> {
  return importTerser()
    .then((minify: ITerserMinify) => {
      return minify(code, options);
    });
}


