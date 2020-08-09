import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { clearStatus, fetchToken as signIn } from '../../../redux/auth/actions'
import SignInStyleWrapper from './SignIn.styles'

const SignIn = () => {
  const dispatch = useDispatch()
  const isSignedIn = useSelector((state) => state.Auth.token)
  const error = useSelector((state) => state.Auth.error)
  const success = useSelector((state) => state.Auth.success)
  const [isLoading, setLoading] = useState(false)

  let location = useLocation()

  const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  useEffect(() => {
    dispatch(clearStatus())
    setLoading(false)
  }, [success, error])

  useEffect(() => {
    if (isSignedIn) {
      setRedirectToReferrer(true)
    }
  }, [isSignedIn])

  useEffect(() => {
    // message.error(error)
    if (error) {
      notification['error']({
        message: 'Error',
        description: error,
      })
    }
  }, [error])
  useEffect(() => {
    // message.success(success)
    if (success) {
      console.log('SUCCESS FOUND!')
      notification['success']({
        message: 'Success',
        description: success,
      })
    }
  }, [success])

  let { from } = location.state || { from: { pathname: '/dashboard' } }

  if (redirectToReferrer) {
    console.log('redirectToReferrer', redirectToReferrer)
    return <Redirect to={from} />
  }

  const onFinish = (values) => {
    setLoading(true)
    dispatch(signIn(values))
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
              name="signIn"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <div className="isoInputWrapper">
                {/* <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                    {
                      min: 5,
                      message: 'Username must be minimum 5 characters.',
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                  />
                </Form.Item> */}
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your email!',
                    },
                    { type: 'email' },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                  />
                </Form.Item>
              </div>
              <div className="isoInputWrapper">
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      min: 6,
                      message: 'Password must be minimum 6 characters.',
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Password"
                  />
                </Form.Item>
              </div>

              {/* <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item> */}
              <div className="isoInputWrapper">
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={isLoading}>
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </Form>

            <div className="isoCenterComponent isoHelperWrapper">
              <Link to="/forgot-password" className="isoForgotPass">
                Forgot password?
              </Link>
              <Link to="/signup">Create a Resumio Account</Link>
            </div>
          </div>
        </div>
      </div>
    </SignInStyleWrapper>
  )
}

export default SignIn
