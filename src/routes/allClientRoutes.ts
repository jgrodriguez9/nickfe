import { LoaderFunctionArgs, redirect, RouteObject } from "react-router-dom";
import { RoutesType } from "../types/routes";
import { getUser } from "../utils/auth";
import { createAppSearchParams } from "../utils/createAppSearchParams";
import NotFound from "../pages/Common/NotFound";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import Login from "../pages/Security/Login";
import Home from "../pages/Shop/Home";
import Technique from "../pages/Shop/Technique";
import Product from "../pages/Shop/Product";

const routes: RoutesType[] = ([
  {
    path: '/',
    order: 1,
    isMain: false,
    Component: Home
  },
  {
    path: '/step-1',
    order: 1,
    isMain: false,
    Component: Technique
  },
  {
    path: '/step-2',
    order: 1,
    isMain: false,
    Component: Product
  },
])

const routesValid = routes
  .map(({ path }) =>
    path !== undefined
      ? `${!path.startsWith('/') ? '/' : ''}${path}`
      : undefined
  )
  .filter((it): it is string => it !== undefined)

const protectedLoader = ({ request }: LoaderFunctionArgs): Response | null => {
  const user = getUser()
  
  if (user === null) {
    const url = new URL(request.url)
    const [from] = url.pathname.match(/^\/[^/]+/) ?? ['']
  
    let to = '/login'
    if (routesValid.includes(from)) {
      const params = createAppSearchParams({ from })
  
      to = `${to}?${params.toString()}`
    }
  
    return redirect(to)
  }
  
  return null
}

export const routesApp: RouteObject[] = [
  {
    path: 'login',
    Component: Login,
    loader: (): Response | null => {
      const user = getUser()
  
      if (user !== null) {
        return redirect('/')
      }
  
      return null
    }   
  },
  {
    path: '/',
    Component: DefaultLayout,
    children: routes.map<RouteObject>(({ path, Component, children }) => {
      if (path === '/') {
        return {
          index: true,
          Component,
          loader: protectedLoader
        }
      }
  
      return {
        path,
        Component,
        children: children?.map((it) => ({ ...it, loader: protectedLoader })),
        loader: (children ?? []).every(
          ({ index }) => index === undefined || !index
        )
          ? protectedLoader
          : undefined
      }
    })
  },   
  {
    path: '*',
    Component: NotFound,
    loader: protectedLoader
  }
]