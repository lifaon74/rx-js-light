## fromXHR

```ts
function fromXHR(
  requestInfo: RequestInfo,
  requestInit?: RequestInit,
  options?: ISubscribeFunctionFromXHROptions,
): ISubscribeFunction<ISubscribeFunctionFromXHRNotifications>
```

```ts
interface ISubscribeFunctionFromXHROptions {
  useReadableStream?: boolean; // (default: true) - if you want to use ReadableStream. INFO won't work for too big downloads
}
```

Creates a SubscribeFunction performing an HTTP request using `XMLHttpRequest`.

It's very similar to [fromFetch](../../from-fetch/from-fetch.md): 
it has the same arguments, however it emits 3 more Notifications:

- `'upload-progress'`: inform about the progression of the upload
- `'upload-complete'`: when the upload is done
- `'download-progress'`: inform about the progression of the download

### Examples

#### Perform a 100MB upload

```ts
const request = new Request(`https://reqres.in/api/users`, { // 100MB upload
  method: 'POST',
  body: new Blob([new Uint8Array(1e8)]) // 100MB
});

const subscribe = fromXHR(request);

subscribe((notification) => {
  console.log(notification.name, ':', notification.value);
})
```

Output:

```text
upload-progress: { loaded: 546, total: 1e8 }
upload-progress: { loaded: 1578, total: 1e8 }
...
upload-complete
next: Response
complete
```

#### Perform a 10MB download

```ts
const request = new Request(`https://file-examples-com.github.io/uploads/2017/02/zip_10MB.zip`); // 10MB download

const subscribe = fromXHR(request);

subscribe((notification) => {
  console.log(notification.name, ':', notification.value);
})
```

Output:

```text
next: Response
download-progress: { loaded: 546, total: 1e7 }
download-progress: { loaded: 1578, total: 1e7 }
...
complete
```

