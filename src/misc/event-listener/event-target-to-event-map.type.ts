import { IPureEventTarget } from './pure-event-target.type';

export type IEventTargetToEventMap<GEventTarget extends IPureEventTarget, GEventMap extends object> = [GEventTarget, GEventMap];

export type IGenericEventTargetToEventMap = IEventTargetToEventMap<IPureEventTarget, object>;

export type IEventTargetToEventMapUnion =
  [AbortSignal, AbortSignalEventMap]
  | [AbstractWorker, AbstractWorkerEventMap] // -
  | [Animation, AnimationEventMap]
  | [ApplicationCache, ApplicationCacheEventMap]
  | [AudioBufferSourceNode, AudioScheduledSourceNodeEventMap]
  | [AudioContext, BaseAudioContextEventMap]
  | [AudioScheduledSourceNode, AudioScheduledSourceNodeEventMap]
  // | [AudioTrackList, AudioTrackListEventMap]
  | [AudioWorkletNode, AudioWorkletNodeEventMap]
  | [BaseAudioContext, BaseAudioContextEventMap]
  | [BroadcastChannel, BroadcastChannelEventMap]
  | [ConstantSourceNode, AudioScheduledSourceNodeEventMap]
  | [DataCue, TextTrackCueEventMap]
  | [Document, DocumentEventMap]
  | [DocumentAndElementEventHandlers, DocumentAndElementEventHandlersEventMap] // -
  | [Element, ElementEventMap]
  | [FileReader, FileReaderEventMap]
  | [GlobalEventHandlers, GlobalEventHandlersEventMap] // -
  | [HTMLElement, HTMLElementEventMap]
  | [HTMLVideoElement, HTMLMediaElementEventMap]
  | [IDBDatabase, IDBDatabaseEventMap]
  | [IDBOpenDBRequest, IDBOpenDBRequestEventMap]
  | [IDBRequest, IDBRequestEventMap]
  | [IDBTransaction, IDBTransactionEventMap]
  | [MediaDevices, MediaDevicesEventMap]
  | [MediaQueryList, MediaQueryListEventMap]
  | [MediaStream, MediaStreamEventMap]
  | [MediaStreamTrack, MediaStreamTrackEventMap]
  | [MessagePort, MessagePortEventMap]
  | [Notification, NotificationEventMap]
  | [OfflineAudioContext, OfflineAudioContextEventMap]
  | [OscillatorNode, AudioScheduledSourceNodeEventMap]
  | [PaymentRequest, PaymentRequestEventMap]
  | [Performance, PerformanceEventMap]
  | [RTCDTMFSender, RTCDTMFSenderEventMap]
  | [RTCDataChannel, RTCDataChannelEventMap]
  | [RTCDtlsTransport, RTCDtlsTransportEventMap]
  | [RTCDtmfSender, RTCDtmfSenderEventMap]
  | [RTCIceGatherer, RTCIceGathererEventMap]
  | [RTCIceTransport, RTCIceTransportEventMap]
  | [RTCPeerConnection, RTCPeerConnectionEventMap]
  | [RTCSctpTransport, RTCSctpTransportEventMap] // -
  | [RTCSrtpSdesTransport, RTCSrtpSdesTransportEventMap]
  | [SVGAElement, SVGElementEventMap]
  | [SVGAnimateElement, SVGElementEventMap]
  | [SVGAnimateMotionElement, SVGElementEventMap]
  | [SVGAnimateTransformElement, SVGElementEventMap]
  | [ScreenOrientation, ScreenOrientationEventMap]
  | [ScriptProcessorNode, ScriptProcessorNodeEventMap]
  | [ServiceWorker, ServiceWorkerEventMap]
  | [ServiceWorkerContainer, ServiceWorkerContainerEventMap]
  | [ServiceWorkerRegistration, ServiceWorkerRegistrationEventMap]
  | [SpeechRecognition, SpeechRecognitionEventMap]
  | [SpeechSynthesis, SpeechSynthesisEventMap]
  | [SpeechSynthesisUtterance, SpeechSynthesisUtteranceEventMap]
  | [TextTrack, TextTrackEventMap]
  | [TextTrackCue, TextTrackCueEventMap]
  | [TextTrackList, TextTrackListEventMap]
  | [VTTCue, TextTrackCueEventMap]
  // | [VideoTrackList, VideoTrackListEventMap]
  | [WebSocket, WebSocketEventMap]
  | [typeof window, WindowEventMap]
  | [WindowEventHandlers, WindowEventHandlersEventMap] // -
  | [Worker, WorkerEventMap]
  | [XMLDocument, DocumentEventMap]
  | [XMLHttpRequest, XMLHttpRequestEventMap]
  | [XMLHttpRequestEventTarget, XMLHttpRequestEventTargetEventMap]
  | [XMLHttpRequestUpload, XMLHttpRequestEventTargetEventMap]
  ;

export type TInferEventTargetEventMap<GEventTarget extends IPureEventTarget, GEventMap extends IGenericEventTargetToEventMap = IEventTargetToEventMapUnion> =
  GEventMap extends [GEventTarget, infer GEventMap]
    ? GEventMap
    : never;

// const a: TInferEventTargetEventMap<typeof window>;

