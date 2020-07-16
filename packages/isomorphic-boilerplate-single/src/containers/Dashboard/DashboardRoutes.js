import Loader from '@iso/components/utility/loader'
import React, { lazy, Suspense } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

const routes = [
  // Default /dashboard
  {
    exact: true,
    component: lazy(() => import('../MyResumes')),
  },
  // Other routes
  {
    path: 'create-resume',
    component: lazy(() => import('../CreateResume')),
  },
  {
    path: 'edit-resume',
    component: lazy(() => import('../EditResume')),
  },
  {
    path: 'templates',
    component: lazy(() => import('../Templates')),
  },
  {
    path: 'cards',
    component: lazy(() => import('../Cards')),
  },
]

export default function AppRouter() {
  const { url } = useRouteMatch()
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes.map((route, idx) => (
          <Route
            key={idx}
            exact={route.exact}
            path={route.path ? `${url}/${route.path}` : url}
            component={route.component}
          />
        ))}
      </Switch>
    </Suspense>
  )
}
