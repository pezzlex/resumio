import Loader from '@iso/components/utility/loader'
import React, { lazy, Suspense } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

const routes = [
  {
    component: lazy(() => import('../MyResumes')),
  },
  {
    path: ':resumeId',
    component: lazy(() => import('../ResumeDetails')),
  },
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
        {routes.map((d, i) => {
          console.log(d.path ? `${url}/${d.path}` : url)
          return (
            <Route key={i} path={d.path ? `${url}/${d.path}` : url}>
              {d.component}
            </Route>
          )
        })}
      </Switch>
    </Suspense>
  )
}
