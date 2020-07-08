import React, { useState, useEffect } from 'react'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch, connect } from 'react-redux'
import Input from '@iso/components/uielements/input'
import Checkbox from '@iso/components/uielements/checkbox'
import Button from '@iso/components/uielements/button'
import FirebaseSignUpForm from '../../FirebaseForm/FirebaseForm'
import appActions from '@iso/redux/app/actions'
import Auth0 from '../../Authentication/Auth0/Auth0'
import SignUpStyleWrapper from './SignUp.styles'
import { useForm } from 'react-hook-form'
import { registerUser } from '../../../redux/auth/actions'

const SignUp = ({ registerUser, isSignedIn }) => {
  const { handleSubmit, register, errors } = useForm()
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  useEffect(() => {
    if (isSignedIn) {
      setRedirectToReferrer(true)
    }
  }, [isSignedIn])
  let location = useLocation()
  let { from } = location.state || { from: { pathname: '/dashboard' } }

  const onSubmit = (data) => {
    console.log(data)
    registerUser(data)
    console.log('registered')
    if (isSignedIn) {
      console.log('isSignedIn', isSignedIn)
      setRedirectToReferrer(true)
    }
  }

  if (redirectToReferrer) {
    console.log('redirectToReferrer', redirectToReferrer)
    return <Redirect to={from} />
  }

  return (
    <SignUpStyleWrapper className="isoSignUpPage">
      <div className="isoSignUpContentWrapper">
        <div className="isoSignUpContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">RESUMIO</Link>
          </div>

          <div className="isoSignUpForm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="isoInputWrapper isoLeftRightComponent">
                <input
                  className="form-control"
                  name="firstName"
                  placeholder="First name"
                  ref={register()}
                  autoComplete="true"
                />
                <input
                  className="form-control"
                  name="lastName"
                  placeholder="Last name"
                  ref={register()}
                  autoComplete="true"
                />
              </div>

              <div className="isoInputWrapper">
                <input
                  className="form-control"
                  name="username"
                  placeholder="Username"
                  ref={register()}
                  autoComplete="true"
                />
              </div>
              <div className="isoInputWrapper">
                <input
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  ref={register()}
                  autoComplete="true"
                />
              </div>
              <div className="isoInputWrapper">
                <input
                  className="form-control"
                  name="password"
                  type="password"
                  placeholder="Password"
                  ref={register()}
                  autoComplete="false"
                />
              </div>
              <div className="isoInputWrapper">
                <input
                  className="form-control"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  ref={register()}
                  autoComplete="false"
                />
              </div>

              <div className="isoInputWrapper" style={{ marginBottom: '50px' }}>
                <Checkbox>I agree with terms and conditions</Checkbox>
              </div>

              <div className="isoInputWrapper">
                <Button type="primary" htmlType="submit">
                  Sign Up
                </Button>
              </div>
            </form>
            {/*             
            <div className="isoInputWrapper isoOtherLogin">
              <Button
                onClick={handleLogin}
                type="primary"
                className="btnFacebook"
              >
                Sign up with Facebook
              </Button>
              <Button
                onClick={handleLogin}
                type="primary"
                className="btnGooglePlus"
              >
                Sign up with Google Plus
              </Button>
              <Button
                onClick={() => {
                  Auth0.login();
                }}
                type="primary"
                className="btnAuthZero"
              >
                Sign up with Auth0
              </Button>

              <FirebaseSignUpForm
                signup={true}
                history={history}
                login={() => dispatch(login())}
              />
            </div>
             */}

            <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
              <Link to="/signin">Already have an account? Sign in.</Link>
            </div>
          </div>
        </div>
      </div>
    </SignUpStyleWrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.Auth.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (data) => {
      dispatch(registerUser(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
