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
import Characters from "../pages/Shop/Characters";
import Design from "../pages/Shop/Design";
import Personalize from "../pages/Shop/Personalize";
import Checkout from "../pages/Shop/Checkout";
import Dashboard from "../pages/Admin/Dashboard";
import AdminLayout from "../components/Admin/Layouts/AdminLayout";
import Users from "../pages/Admin/Users";
import Products from "../pages/Admin/Products";
import Character from "@/pages/Admin/Character/Character";
import DesignAdmin from "@/pages/Admin/Design";
import Typography from "@/pages/Admin/Typography";
import TechniqueAdmin from "@/pages/Admin/Technique";

const routes: RoutesType[] = ([
  {
    path: '/',
    isMain: false,
    Component: Home
  },
  {
    path: '/step-1',
    isMain: false,
    Component: Technique
  },
  {
    path: '/step-2',
    isMain: false,
    Component: Product
  },
  {
    path: '/step-3',
    isMain: false,
    Component: Characters
  },
  {
    path: '/step-4/:characterId',
    isMain: false,
    Component: Design
  },
  {
    path: '/personalize',
    isMain: false,
    Component: Personalize
  },
  {
    path: '/checkout',
    isMain: false,
    Component: Checkout
  },
])


const routesAdmin: RoutesType[] = ([
  {
    path: '/admin',
    isMain: false,
    Component: Dashboard,
  },
  {
    path: 'users',
    isMain: false,
    Component: Users,
  },
  {
    path: 'products',
    isMain: false,
    Component: Products,
  },
  {
    path: 'characters',
    isMain: false,
    Component: Character,
  },
  {
    path: 'designs',
    isMain: false,
    Component: DesignAdmin,
  },
  {
    path: 'typographies',
    isMain: false,
    Component: Typography,
  },
  {
    path: 'techniques',
    isMain: false,
    Component: TechniqueAdmin,
  },
])

const routesValid = [...routes, ...routesAdmin]
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
    path: '/admin',
    Component: AdminLayout,
    children: routesAdmin.map<RouteObject>(({ path, Component, children }) => {
      if (path === '/admin') {
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