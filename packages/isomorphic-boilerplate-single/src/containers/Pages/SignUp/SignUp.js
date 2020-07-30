import React, { useState, useEffect } from 'react'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// import Input from '@iso/components/uielements/input'
// import Checkbox from '@iso/components/uielements/checkbox'
// import Button from '@iso/components/uielements/button'
import FirebaseSignUpForm from '../../FirebaseForm/FirebaseForm'
import appActions from '@iso/redux/app/actions'
import Auth0 from '../../Authentication/Auth0/Auth0'
import SignUpStyleWrapper from './SignUp.styles'
import { useForm } from 'react-hook-form'
import { registerUser, clearStatus } from '../../../redux/auth/actions'
import { Form, Input, Button, Checkbox, notification, Row, Col } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const SignUp = () => {
  const [form] = Form.useForm()
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  const dispatch = useDispatch()
  const isSignedIn = useSelector((state) => state.Auth.token)
  const error = useSelector((state) => state.Auth.error)
  const success = useSelector((state) => state.Auth.success)

  useEffect(() => {
    dispatch(clearStatus())
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
      notification['success']({
        message: 'Success',
        description: success,
      })
    }
  }, [success])

  let location = useLocation()
  let { from } = location.state || { from: { pathname: '/dashboard' } }

  if (redirectToReferrer) {
    console.log('redirectToReferrer', redirectToReferrer)
    return <Redirect to={from} />
  }

  const onFinish = (values) => {
    dispatch(clearStatus())
    dispatch(registerUser(values))
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
            <Form
              form={form}
              layout="vertical"
              name="register"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              scrollToFirstError
            >
              <Row gutter={16}>
                <Col span={12}>
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
                </Col>
                <Col span={12}>
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
                </Col>
              </Row>

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

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>

            <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
              <Link to="/signin">Already have an account? Sign in.</Link>
            </div>
          </div>
        </div>
      </div>
    </SignUpStyleWrapper>
  )
}

export default SignUp
