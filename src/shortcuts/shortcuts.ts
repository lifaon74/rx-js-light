

/*
Syntax V1:

name$: SubscribeFunction

name$$:
  - () => SubscribeFunction
  - SubscribePipeFunction
  - generator of SubscribeFunction

name$$$:
  - () => () => SubscribeFunction
  - () => SubscribePipeFunction
  - generator of generator of SubscribeFunction

$name: EmitFunction

$$name:
  - () => EmitFunction
  - EmitPipeFunction
  - generator of EmitFunction

$$$name:
  - ect...


$name => EmitFunction

Syntax V2:

- SubscribeFunction -> SF
- SubscribePipe -> SP
- EmitFunction -> EF
- EmitPipe -> EP


*/



// export { filterSubscribePipe as filter$$$ } from './emit-pipe-related/filter-subscribe-pipe';
// export { mapSubscribePipe as map$$$ } from './emit-pipe-related/map-subscribe-pipe';
// export { distinctSubscribePipe as distinct$$$ } from './emit-pipe-related/distinct-subscribe-pipe';
// export { emitPipeToSubscribePipe as $$to$$$ } from './emit-pipe-related/emit-pipe-to-subscribe-pipe';

// export { filterSubscribePipe as filterSP } from '../subscribe-function/subscribe-pipe/emit-pipe-related/filter-subscribe-pipe';
// export { mapSubscribePipe as mapSP } from '../subscribe-function/subscribe-pipe/emit-pipe-related/map-subscribe-pipe';
// export { distinctSubscribePipe as distinctSP } from '../subscribe-function/subscribe-pipe/emit-pipe-related/distinct-subscribe-pipe';
// export { emitPipeToSubscribePipe as EPtoSP } from '../subscribe-function/subscribe-pipe/emit-pipe-related/emit-pipe-to-subscribe-pipe';
//

// export { pipeSubscribeFunction as pipe$$ } from './functions/piping/pipe-subscribe-function';
// export { fromArray as fromArray$$ } from './subscribe-function/from/iterable/sync/from-array';

// export { pipeSubscribeFunction as pipeSF } from './functions/piping/pipe-subscribe-function/pipe-subscribe-function';

export * from './pipe.shortcuts';
export * from './from/arithmetic.shortcuts';
export * from './from/comparison.shortcuts';
export * from './from/logic.shortcuts';
export * from './from/others.shortcuts';

