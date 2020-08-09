import { LockOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, notification, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { clearStatus, registerUser } from '../../../redux/auth/actions'
import SignUpStyleWrapper from './SignUp.styles'

const SignUp = () => {
  const [form] = Form.useForm()
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const isSignedIn = useSelector((state) => state.Auth.token)
  const error = useSelector((state) => state.Auth.error)
  const success = useSelector((state) => state.Auth.success)

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
    setLoading(true)
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
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              scrollToFirstError
            >
              <div className="isoInputWrapper">
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
              </div>
              <div className="isoInputWrapper">
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
              </div>
              {/* <div className="isoInputWrapper">
                <Form.Item
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
                </Form.Item>
              </div>
               */}
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
                  hasFeedback
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Password"
                  />
                </Form.Item>
              </div>
              <div className="isoInputWrapper">
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
              </div>
              <div className="isoInputWrapper">
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={isLoading}>
                    Submit
                  </Button>
                </Form.Item>
              </div>
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
