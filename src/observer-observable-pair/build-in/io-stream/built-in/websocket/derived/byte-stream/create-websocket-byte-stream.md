## createWebSocketByteStream

```ts
function createWebSocketByteStream(
  url: string,
  protocols?: string | string[],
): IWebSocketByteStreamObservable
```


Creates an Observable around a [WebSocket](hhttps://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket).

On subscribe, the websocket is created. Then the Observable will emit 3 kind of notifications:

#### open

This Notification is triggered when the connection is open and ready.
Its value is a `ByteStream`, and it is used to send and receive data.

#### close

This one is triggered, when the websocket is closed (from the browser or the client)
It contains a `CloseEvent` as value.

#### error

And, this last Notification is triggered when the WebSocket encounters an error (ex: if the connection failed).

> The Websocket is automatically closed when this Observable is unsubscribed.

### Example

```ts
const url = `wss://demo.piesocket.com/v3/channel_1?api_key=oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm&notify_self`;

const stream$ = createWebSocketByteStream(url);

stream$(notificationObserver({
  open: ({ emit, subscribe }: IByteStream) => {
    console.warn('websocket opened');

    const $output = $$map<string, Uint8Array>(emit, _ => new TextEncoder().encode(_));
    const input$ = map$$<ArrayBuffer, string>(subscribe, _ => new TextDecoder().decode(_));

    input$((data: string) => {
      console.log(`Receive: ${data}`);
    });

    window.onclick = () => {
      $output(`Message ${Math.floor(Math.random() * 1e3)}`);
    };
  },
  close: (event: CloseEvent) => {
    console.warn('websocket closed', event);
  },
  error: (error: unknown) => {
    console.warn('websocket error', error);
  },
}));
```


