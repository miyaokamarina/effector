//@flow
/* eslint-disable no-unused-vars */

import type {StateRef} from './stateref'
import {Step, Cmd, type TypeDef} from './typedef'

type Fun = TypeDef<*, 'step' | 'cmd'>
type Using = {
  name: string,
  reset?: any,
}

/* Step */
declare export default function fx(
  tag: 'loop',
  props: {
    branch: Fun,
    iterator: Fun,
    source: StateRef,
    until: Using,
    selector: Using,
    item: Using,
  },
  ...childrens: $ReadOnlyArray<void>
): TypeDef<'loop', 'step'>
declare export default function fx(
  tag: 'choose',
  props: {
    state: StateRef,
    selector: TypeDef<*, 'step'>,
    cases: {+[key: string]: TypeDef<*, 'step'>},
  },
  ...childrens: $ReadOnlyArray<void>
): TypeDef<'choose', 'step'>
declare export default function fx(
  tag: 'single',
  props: null,
  childrens: *,
): TypeDef<'single', 'step'>
declare export default function fx(
  tag: 'multi',
  props: null,
  ...childrens: *
): TypeDef<'multi', 'step'>
declare export default function fx(
  tag: 'seq',
  props: null,
  ...childrens: *
): TypeDef<'seq', 'step'>

/* Cmd */
declare export default function fx(
  tag: 'compute',
  props: {fn: *},
  ...childrens: $ReadOnlyArray<void>
): TypeDef<'compute', 'cmd'>
declare export default function fx(
  tag: 'emit',
  props: {fullName: string},
  ...childrens: $ReadOnlyArray<void>
): TypeDef<'emit', 'cmd'>
declare export default function fx(
  tag: 'filter',
  props: {filter: *},
  ...childrens: $ReadOnlyArray<void>
): TypeDef<'filter', 'cmd'>
declare export default function fx(
  tag: 'run',
  props: {runner: *},
  ...childrens: $ReadOnlyArray<void>
): TypeDef<'run', 'cmd'>
declare export default function fx(
  tag: 'update',
  props: {|store: StateRef|} | {|val: string|},
  ...childrens: $ReadOnlyArray<void>
): TypeDef<'update', 'cmd'>
export default function fx(
  tag:
    | 'choose'
    | 'single'
    | 'multi'
    | 'seq'
    | 'compute'
    | 'emit'
    | 'filter'
    | 'run'
    | 'update',
  props: *,
  ...childrens: *
) {
  if (tag in Cmd) {
    const tag_: 'compute' | 'emit' | 'filter' | 'run' | 'update' = (tag: any)
    return Step.single(Cmd[tag_](props))
  }
  const tag_: 'single' | 'multi' | 'seq' | 'choose' | 'loop' = (tag: any)
  switch (tag_) {
    case 'single':
      return Step.single(childrens[0])
    case 'multi':
      return Step.multi(childrens)
    case 'seq':
      return Step.seq(childrens)
    case 'choose':
      return Step.choose(props)
    case 'loop':
      return Step.loop(props)
  }
  if (typeof tag === 'function') return tag(props, childrens)
  console.error('unknown node "%s"', tag)
  return null
}
