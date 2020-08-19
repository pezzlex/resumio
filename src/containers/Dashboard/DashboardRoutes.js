import Loader from '../../components/utility/loader'
import React, { lazy, Suspense } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

const routes = [
  {
    component: lazy(() => import('../MyResumes')),
  },
  {
    path: 'resume/:resumeId',
    component: lazy(() => import('../ResumeDetails/ResumeDetails')),
  },
  {
    path: 'edit-resume/:resumeId',
    component: lazy(() => import('../AddEditResume')),
  },
  {
    path: 'create-resume',
    component: lazy(() => import('../AddEditResume')),
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
            exact
            path={route.path ? `${url}/${route.path}` : url}
            component={route.component}
          />
        ))}
      </Switch>
    </Suspense>
  )
}
