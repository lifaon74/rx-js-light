const $util = require('util');
const $path = require('path');
const $fs = require('fs').promises;
const $fsh = require('../misc/fs-helpers.js');
const $acorn = require('acorn');
const $acornWalk = require('acorn-walk');
const $escodegen = require('escodegen');

const ROOT_PATH = $path.join(__dirname, '../../../');
const DIST_PATH = $path.join(ROOT_PATH, 'dist');
const CACHE_PATH = $path.join(DIST_PATH, '.cache');

function logObject(obj) {
  console.log($util.inspect(obj, false, null, true /* enable colors */));
}


function isRelativeRequire(value) {
  // return importPath.startsWith('.')
  //   || $path.isAbsolute(importPath);
  return value.startsWith('./')
    || value.startsWith('../')
    || value.startsWith('/');

}

// https://nodejs.org/api/modules.html#modules_all_together

function isFile(path) {
  return $fs.stat(path)
    .then(
      (stats) => {
        return stats.isFile();
      },
      (error) => {
        if (error.code === 'ENOENT') {
          return false;
        } else {
          throw error;
        }
      },
    );
}

function isFileRelative(
  sourcePath,
  path,
) {
  return isFile($path.join($path.dirname(sourcePath), path));
}

async function resolveRequireAsFile(
  sourcePath,
  value,
) {
  if (await isFileRelative(sourcePath, value)) {
    return value;
  }
  const withJSExt = `${ value }.js`;
  if (await isFileRelative(sourcePath, withJSExt)) {
    return withJSExt;
  }
  const withMJSExt = `${ value }.mjs`;
  if (await isFileRelative(sourcePath, withMJSExt)) {
    return withMJSExt;
  }
  const withJSONExt = `${ value }.json`;
  if (await isFileRelative(sourcePath, withJSONExt)) {
    return withJSONExt;
  }
  return null;
}

async function resolveRequireLoadIndex(
  sourcePath,
  value,
) {
  const withJSExt = `${ value }/index.js`;
  if (await isFileRelative(sourcePath, withJSExt)) {
    return withJSExt;
  }
  const withMJSExt = `${ value }/index.mjs`;
  if (await isFileRelative(sourcePath, withMJSExt)) {
    return withMJSExt;
  }
  const withJSONExt = `${ value }/index.json`;
  if (await isFileRelative(sourcePath, withJSONExt)) {
    return withJSONExt;
  }
  return null;
}


async function resolveRequireAsDirectory(
  sourcePath,
  value,
) {
  const packageJSON = `${ value }/package.json`;
  if (await isFileRelative(sourcePath, packageJSON)) {
    throw new Error(`TODO: support package.json`);
  }

  const asIndex = await resolveRequireLoadIndex(sourcePath, value);
  if (asIndex !== null) {
    return asIndex;
  }

  return null;
}


async function resolveRelativeRequire(
  sourcePath,
  value,
) {
  const asFile = await resolveRequireAsFile(sourcePath, value);
  if (asFile !== null) {
    return asFile;
  }

  const asDirectory = await resolveRequireAsDirectory(sourcePath, value);
  if (asDirectory !== null) {
    return asDirectory;
  }

  // TODO LOAD_PACKAGE_IMPORTS
  // TODO LOAD_PACKAGE_IMPORTS
  // TODO LOAD_PACKAGE_SELF

  throw new Error(`Not found:  ${ value }`);
}


function resolveRequire(
  sourcePath,
  value,
) {
  return isRelativeRequire(value)
    ? resolveRelativeRequire(sourcePath, value)
    : Promise.resolve(value);
}

// alternative shortcut
/**
 * TODO
 * https://nodejs.org/api/esm.html
 *
 * - use nodejs resolution algorithm - MOSTLY implemented
 * - support data:... import
 * - support file:... import
 * - support caching to avoid rebuild everything everytime - EXPERIMENTAL
 */

async function resolveMJSFile(jsFilePath) {
  const cache = await loadMJSCache();

  if (cache.has(jsFilePath)) {
    const stats = await $fs.stat(jsFilePath);
    if (stats.mtimeMs < cache.get(jsFilePath)) { // already done
      // console.log('cached', jsFilePath);
      return;
    }
  }

  // if (!jsFilePath.includes('index')) {
  // if (!jsFilePath.includes('hello-world-named')) {
  // if (!jsFilePath.includes('hello-world-import')) {
  // if (!jsFilePath.includes('hello-world-import-all')) {
  //   return;
  // }

  let jsFileContent = await $fs.readFile(jsFilePath, { encoding: 'utf8' });

  const tree = $acorn.parse(jsFileContent, {
    ecmaVersion: 'latest',
    sourceType: 'module',
  });
  // logObject(tree);

  const promises = [];

  $acornWalk.full(tree, node => {

    const resolve = (node) => {
      const requireValue = node.value;
      promises.push(
        resolveRequire(jsFilePath, requireValue)
          .then((resolvedRequireValue) => {
            // console.log(jsFilePath, ':', requireValue, '->', resolvedRequireValue);
            node.value = resolvedRequireValue;
          }),
      );
    };

    switch (node.type) {
      case 'ImportExpression': {  // await import('./hello-world-lazy')
        if (node.source.type === 'Literal') { // only literal is currently supported
          resolve(node.source);
        }
        break;
      }
      case 'ImportDeclaration': {  // import { helloWorldNamed } from './hello-world-named'; or import * as helloWorld from './hello-world-named';
        if (node.source.type === 'Literal') {
          resolve(node.source);
        }
        break;
      }
      case 'ExportAllDeclaration': {  // export * from './src/index';
        resolve(node.source);
        break;
      }
      case 'ExportNamedDeclaration': {  // export { helloWorldNamed } from './hello-world-named';
        if (node.source && (node.source.type === 'Literal')) {
          resolve(node.source);
        }
        break;
      }
    }
  });

  await Promise.all(promises);

  jsFileContent = $escodegen.generate(tree);

  await $fs.writeFile(jsFilePath, jsFileContent);

  cache.set(jsFilePath, Date.now());
}

/* START - CACHE */

let MJS_CACHE_PROMISE;

function loadMJSCache() {
  if (MJS_CACHE_PROMISE === void 0) {
    MJS_CACHE_PROMISE = $fs.readFile(CACHE_PATH, 'utf8')
      .then(
        (content) => {
          return new Map(JSON.parse(content));
        },
        () => {
          return new Map();
        },
      );
  }
  return MJS_CACHE_PROMISE;
}

function saveMJSCache() {
  return MJS_CACHE_PROMISE
    .then((cache) => {
      return $fs.writeFile(CACHE_PATH, JSON.stringify(Array.from(cache.entries()), null, 2), 'utf8');
    });
}


/* END - CACHE */

function resolveNodeModules() {
  return $fsh.createDirectory(DIST_PATH)
    .then(() => {
      return $fsh.exploreDirectory(DIST_PATH, (entryPath, entry) => {
        if (entry.isFile()) {
          if (!entryPath.includes('/cjs/')) {
            if (entryPath.endsWith('.mjs')) {
              return resolveMJSFile(entryPath);
            }
          }
        }
      });
    })
    .then(() => {
      return saveMJSCache();
    });
}

resolveNodeModules()
  .catch((error) => {
    console.error(error);
  });


