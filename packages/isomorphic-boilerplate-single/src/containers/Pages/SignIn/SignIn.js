import React from 'react'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
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
import { Field, reduxForm } from 'redux-form'

const { login } = authAction
const { clearMenu } = appAction

const renderField = ({ input, type, touched, error, placeholder }) => {
  return (
    <>
      <input {...input} placeholder={placeholder} type={type} />
      {touched && error && <span>{error}</span>}
    </>
  )
}

const SignIn = () => {
  let history = useHistory()
  let location = useLocation()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.Auth.idToken)

  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false)
  React.useEffect(() => {
    if (isLoggedIn) {
      setRedirectToReferrer(true)
    }
  }, [isLoggedIn])

  function handleLogin(e, token = false) {
    e.preventDefault()
    dispatch(fetchToken({ username: 'pez', password: 'hash-me' }))
    dispatch(clearMenu())
    history.push('/dashboard')
  }
  let { from } = location.state || { from: { pathname: '/dashboard' } }

  if (redirectToReferrer) {
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
            <form>
              <div className="isoInputWrapper">
                <Input
                  size="large"
                  placeholder="Username"
                  autoComplete="true"
                />
              </div>

              <div className="isoInputWrapper">
                <Input
                  size="large"
                  type="password"
                  placeholder="Password"
                  autoComplete="false"
                />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>Remember Me</Checkbox>
                <Button type="primary" onClick={handleLogin}>
                  Sign In
                </Button>
              </div>

              {/* <p className="isoHelperText">
                username: demo password: demodemo or just click on any button.
              </p> */}
            </form>
            <div className="isoInputWrapper isoOtherLogin">
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
                history={history}
                login={(token) => dispatch(login(token))}
              />
            </div>
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

// const onSubmit = (data, dispatch) => {
//   dispatch(fetchToken(data)) // your submit action //
// }

// export default connect()(
//   reduxForm({
//     // a unique name for the form
//     form: 'signIn',
//     onSubmit,
//   })(SignIn)
// )

export default SignIn
