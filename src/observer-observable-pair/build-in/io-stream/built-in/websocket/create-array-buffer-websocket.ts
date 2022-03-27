export function createArrayBufferWebsocket(
  url: string,
  protocols?: string | string[],
): WebSocket {
  const socket: WebSocket = new WebSocket(url, protocols);
  socket.binaryType = 'arraybuffer';
  return socket;
}
