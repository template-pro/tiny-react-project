import type { DefaultGenerics, Route } from 'react-location'

export type RouteMeta={
  readonly root?: boolean
}

export type RouteConfig = Route<{RouteMeta: RouteMeta} & DefaultGenerics> & {id: string}
