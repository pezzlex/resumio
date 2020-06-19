import React, { lazy, Suspense } from "react"
import { Route, useRouteMatch, Switch } from "react-router-dom"
import Loader from "@iso/components/utility/loader"

const routes = [
  {
    path: "",
    component: lazy(() => import("@iso/containers/Widgets/Widgets")),
    exact: true,
  },
  {
    path: "blank_page",
    component: lazy(() => import("@iso/containers/BlankPage")),
  },
]

export default function AppRouter() {
  const { url } = useRouteMatch()
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes.map((route, idx) => (
          <Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  )
}
