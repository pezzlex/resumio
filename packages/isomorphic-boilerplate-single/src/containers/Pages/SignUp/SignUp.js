import React, { useState, useEffect } from 'react'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch, connect } from 'react-redux'
// import Input from '@iso/components/uielements/input'
// import Checkbox from '@iso/components/uielements/checkbox'
// import Button from '@iso/components/uielements/button'
import FirebaseSignUpForm from '../../FirebaseForm/FirebaseForm'
import appActions from '@iso/redux/app/actions'
import Auth0 from '../../Authentication/Auth0/Auth0'
import SignUpStyleWrapper from './SignUp.styles'
import { useForm } from 'react-hook-form'
import { registerUser, clearError } from '../../../redux/auth/actions'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const SignUp = ({ registerUser, isSignedIn, error, clearError }) => {
  const [form] = Form.useForm()

  const { handleSubmit, register, errors } = useForm()
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  useEffect(() => {
    clearError()
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

  // const layout = {
  //   labelCol: {
  //     span: 6,
  //   },
  //   wrapperCol: {
  //     span: 18,
  //   },
  // }
  // const tailLayout = {
  //   wrapperCol: {
  //     offset: 6,
  //     span: 24,
  //   },
  // }

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 12,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  }

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  }

  const layout = {}

  const onFinish = (values) => {
    registerUser(values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <SignUpStyleWrapper className="isoSignUpPage">
      <div className="isoSignUpContentWrapper">
        <div className="isoSignUpContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">RESUMIO</Link>
          </div>

          <div className="isoSignUpForm">
            {/* <form onSubmit={handleSubmit(onSubmit)}>
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
           */}

            {/* <Form
              {...layout}
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
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              {error && (
                <Form.Item {...tailLayout}>
                  <small className="text-danger">{error}</small>
                </Form.Item>
              )}

              <Form.Item
                {...tailLayout}
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form> */}

            <Form
              form={form}
              {...layout}
              layout="vertical"
              name="register"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              scrollToFirstError
            >
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your first name!',
                  },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your last name!',
                  },
                ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>

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
                <Input placeholder="Email" />
              </Form.Item>

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
                hasFeedback
              >
                {/* <Input
                  // prefix={<LockOutlined className="site-form-item-icon" />}
                  // placeholder="Password"
                  type="password"
                /> */}
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(
                        'The two passwords that you entered do not match!'
                      )
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Confirm Password"
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
    error: state.Auth.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (data) => {
      dispatch(registerUser(data))
    },
    clearError: () => dispatch(clearError()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
