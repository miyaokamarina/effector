//@flow
import type {Subscription} from '../effector/index.h'
import type {GraphiteMeta, kind, StateRef, ID} from 'effector/stdlib'
import type {Event} from 'effector/event'
import type {Effect} from 'effector/effect'
import type {CompositeName} from '../compositeName'

export type ThisStore = {
  compositeName?: CompositeName,
  defaultState: any,
  domainName?: CompositeName,
  +graphite: GraphiteMeta,
  +id: string,
  kind: kind,
  plainState: StateRef,
  shortName: ID,
  subscribers: Map<Event<any>, Subscription>,
}

export type Store<State> = {
  /*::+*/ id: string,
  reset(event: Event<any> | Effect<any, any, any>): Store<State>,
  getState(): State,
  //prettier-ignore
  /*::+*/ setState: (
  & (<T>(newState: T, handler: (state: State, newState: T) => State) => void)
  & (<T>(newState: State, _: void) => void)
 ),
  // withProps<Props, R>(
  //   fn: (state: State, props: Props) => R,
  // ): (props: Props) => R,
  //prettier-ignore
  /*::+*/ map: (
  & (<T>(fn: (_: State, lastState?: T) => T, _: void) => Store<T>)
  & (<T>(fn: (_: State, lastState: T) => T, firstState: T) => Store<T>)
 ),
  on<E>(
    event: Event<E> | Effect<E, any, any> | Store<E>,
    handler: (state: State, payload: E) => State | void,
  ): Store<State>,
  off(event: Event<any>): void,
  subscribe(listner: any): Subscription,
  thru<U>(fn: (store: Store<State>) => U): U,
  //prettier-ignore
  /*::+*/ watch: (
    & (
      <E>(
        watcher: (state: State, payload: E, type: string) => any,
        _: void,
      ) => Subscription
    )
    & (
      <E>(
        trigger: Store<E>,
        watcher: (state: State, payload: E, type: string) => any,
      ) => Subscription
    )
    & (
      <E>(
        event: Event<E>,
        watcher: (state: State, payload: E, type: string) => any,
      ) => Subscription
    )
    & (
      <E>(
        effect: Effect<E, any, any>,
        watcher: (state: State, payload: E, type: string) => any,
      ) => Subscription
    )
  ),
  +kind: kind,
  shortName: string,
  domainName?: CompositeName,
  graphite: GraphiteMeta,
  compositeName?: CompositeName,
}
