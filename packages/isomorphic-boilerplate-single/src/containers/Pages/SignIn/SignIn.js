import React, { useEffect, useState } from 'react'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch, connect } from 'react-redux'
import Input from '@iso/components/uielements/input'
import Checkbox from '@iso/components/uielements/checkbox'
import Button from '@iso/components/uielements/button'
import FirebaseLoginForm from '../../FirebaseForm/FirebaseForm'
import authAction, { fetchToken } from '../../../redux/auth/actions'
import appAction from '../../../redux/app/actions'
import Auth0 from '../../Authentication/Auth0/Auth0'
import {
  signInWithGoogle,
  signInWithFacebook,
} from '@iso/lib/firebase/firebase.authentication.util'
import SignInStyleWrapper from './SignIn.styles'
import { useForm } from 'react-hook-form'

const SignIn = ({ signIn, isSignedIn }) => {
  const { handleSubmit, register, errors } = useForm()
  const onSubmit = (data) => signIn(data)

  let location = useLocation()

  const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  useEffect(() => {
    if (isSignedIn) {
      setRedirectToReferrer(true)
    }
  }, [isSignedIn])
  let { from } = location.state || { from: { pathname: '/dashboard' } }

  if (redirectToReferrer) {
    console.log('redirectToReferrer', redirectToReferrer)
    return <Redirect to={from} />
  }
  return (
    <SignInStyleWrapper className="isoSignInPage">
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">RESUMIO</Link>
          </div>
          <div className="isoSignInForm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="isoInputWrapper">
                <input
                  name="username"
                  type="text"
                  className="form-control"
                  autoComplete="true"
                  placeholder="Username"
                  ref={register()}
                />
              </div>
              <div className="isoInputWrapper">
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  autoComplete="false"
                  placeholder="Password"
                  ref={register()}
                />
              </div>
              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>Remember Me</Checkbox>
                <Button type="primary" htmlType="submit">
                  Sign In
                </Button>
              </div>
            </form>
            {/* <div className="isoInputWrapper isoOtherLogin">
              <Button
                onClick={signInWithFacebook}
                type="primary"
                className="btnFacebook"
              >
                Sign in with Facebook
              </Button>
              <Button
                onClick={signInWithGoogle}
                type="primary"
                className="btnGooglePlus"
              >
                Sign in with Google Plus
              </Button>

              <Button
                onClick={() => {
                  Auth0.login()
                }}
                type="primary"
                className="btnAuthZero"
              >
                Sign in with Auth0
              </Button>

              <FirebaseLoginForm
              // history={history}
              // login={(token) => dispatch(login(token))}
              />
            </div>
            */}
            <div className="isoCenterComponent isoHelperWrapper">
              <Link to="/forgotpassword" className="isoForgotPass">
                Forgot password
              </Link>
              <Link to="/signup">Create a Resumio Account</Link>
            </div>
          </div>
        </div>
      </div>
    </SignInStyleWrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.Auth.token !== null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (data) => {
      dispatch(fetchToken(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
