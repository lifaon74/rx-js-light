## readBlob

```ts
function readBlob<GReadType extends IFileReaderReadType>(
  blob: Blob,
  readType: GReadType
): ISubscribeFunction<ISubscribeFunctionReadBlobNotifications<GReadType>>
```

```ts
interface IFileReaderFormatsToTypeMap {
  'data-url': string;
  'text': string;
  'array-buffer': ArrayBuffer;
}

type IFileReaderReadType = keyof IFileReaderFormatsToTypeMap;
```

Creates a SubscribeFunction able to read a Blob.

You may select the output type: `IFileReaderFormatsToTypeMap`.

The SubscribeFunction emits values in the form of Notifications:

- `next`: the data of the Blob
- `complete`: when reading is done
- `error`: if an error occurred
- `progress`: when reading => `IProgress`

### Examples

#### Read a Blob as an ArrayBuffer

```ts
const blob = new Blob([new Uint8Array([0, 1, 2, 3])]);
const subscribe = readBlob(blob, 'array-buffer');

subscribe((notification) => {
  console.log(notification.name, ':', notification.value);
})
```

Output:

```text
progress: { loaded: 2, total: 4 }
next: ArrayBuffer([0, 1, 2, 3])
complete
```

