import Loader from '@iso/components/utility/loader'
import React, { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'
import axios from 'axios'
import ErrorBoundary from './ErrorBoundary'
import { PUBLIC_ROUTE } from './route.constants'

const Dashboard = lazy(() => import('./containers/Dashboard/Dashboard'))

const publicRoutes = [
  {
    path: PUBLIC_ROUTE.LANDING,
    component: lazy(() => import('@iso/containers/Pages/SignIn/SignIn')),
  },
  {
    path: PUBLIC_ROUTE.PAGE_500,
    component: lazy(() => import('@iso/containers/Pages/500/500')),
  },
  {
    path: PUBLIC_ROUTE.SIGN_IN,
    component: lazy(() => import('@iso/containers/Pages/SignIn/SignIn')),
  },
  {
    path: PUBLIC_ROUTE.SIGN_UP,
    component: lazy(() => import('@iso/containers/Pages/SignUp/SignUp')),
  },
  {
    path: PUBLIC_ROUTE.FORGET_PASSWORD,
    component: lazy(() =>
      import('./containers/Pages/ForgotPassword/ForgotPassword')
    ),
  },
  {
    path: PUBLIC_ROUTE.RESET_PASSWORD,
    component: lazy(() =>
      import('@iso/containers/Pages/ResetPassword/ResetPassword')
    ),
  },
  {
    path: PUBLIC_ROUTE.AUTH0_CALLBACK,
    component: lazy(() =>
      import('@iso/containers/Authentication/Auth0/Auth0Callback')
    ),
  },
]

function PrivateRoute({ children, ...rest }) {
  const isLoggedIn = useSelector((state) => state.Auth.token)
  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${localStorage.getItem('jwtToken')}`
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
export default function Routes() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Router>
          <Switch>
            {publicRoutes.map((route, index) => (
              <Route
                key={index}
                exact
                path={route.path}
                component={route.component}
              />
            ))}
            <PrivateRoute strict path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <Route
              component={lazy(() => import('@iso/containers/Pages/404/404'))}
            />
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  )
}