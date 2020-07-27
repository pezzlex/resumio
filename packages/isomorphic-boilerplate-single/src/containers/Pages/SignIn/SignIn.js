import React, { useEffect, useState } from 'react'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch, connect } from 'react-redux'
// import Input from '@iso/components/uielements/input'
// import Checkbox from '@iso/components/uielements/checkbox'
// import Button from '@iso/components/uielements/button'
import FirebaseLoginForm from '../../FirebaseForm/FirebaseForm'
import { fetchToken, clearError } from '../../../redux/auth/actions'
import appAction from '../../../redux/app/actions'
import Auth0 from '../../Authentication/Auth0/Auth0'
import {
  signInWithGoogle,
  signInWithFacebook,
} from '@iso/lib/firebase/firebase.authentication.util'
import SignInStyleWrapper from './SignIn.styles'
import { useForm } from 'react-hook-form'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const SignIn = ({ signIn, isSignedIn, error, clearError }) => {
  let location = useLocation()
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  useEffect(() => {
    clearError()
    console.log('useEffect')
    if (isSignedIn) {
      setRedirectToReferrer(true)
    }
  }, [isSignedIn])
  let { from } = location.state || { from: { pathname: '/dashboard' } }

  if (redirectToReferrer) {
    console.log('redirectToReferrer', redirectToReferrer)
    return <Redirect to={from} />
  }

  const onFinish = (values) => {
    signIn(values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <SignInStyleWrapper className="isoSignInPage">
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">RESUMIO</Link>
          </div>
          <div className="isoSignInForm">
            <Form
              layout="vertical"
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                  { min: 5, message: 'Username must be minimum 5 characters.' },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  { min: 6, message: 'Password must be minimum 6 characters.' },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                />
              </Form.Item>

              {error && (
                <Form.Item validateStatus="error" help={error}></Form.Item>
              )}

              {/* <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item> */}

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>

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
    isSignedIn: state.Auth.token,
    error: state.Auth.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (data) => {
      dispatch(fetchToken(data))
    },
    clearError: () => dispatch(clearError()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
