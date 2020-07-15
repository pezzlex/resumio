import Loader from '@iso/components/utility/loader'
import React, { lazy, Suspense } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

const routes = [
  // {
  //   path: '',
  //   component: lazy(() => import('../MyResumes')),
  //   exact: true,
  // },
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
  console.log('url', url)
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route
          exact
          path={url}
          component={lazy(() => import('../MyResumes'))}
        />
        {routes.map((route, idx) => (
          <Route
            key={idx}
            path={`${url}/${route.path}`}
            component={route.component}
          />
        ))}
      </Switch>
    </Suspense>
  )
}
