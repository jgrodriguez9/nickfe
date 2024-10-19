import { RouteObject } from "react-router-dom"

type RoutesType = Pick<RouteObject, 'path' | 'Component' | 'children'> & {
    order: number
    title?: string
    isMain: boolean
    icon?: IconType
    brandsNotAllowed?: Array<Brand['id']>
}

export {
  RoutesType
}