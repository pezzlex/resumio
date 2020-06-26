import Loader from "@iso/components/utility/loader"
import React, { lazy, Suspense } from "react"
import { Route, Switch, useRouteMatch } from "react-router-dom"

const routes = [
  {
    path: "",
    component: lazy(() => import("../MyResumes")),
    exact: true,
  },
  {
    path: "create-resume",
    component: lazy(() => import("../CreateResume")),
  },
  {
    path: "edit-resume",
    component: lazy(() => import("../EditResume")),
  },
  {
    path: "templates",
    component: lazy(() => import("../Templates")),
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
