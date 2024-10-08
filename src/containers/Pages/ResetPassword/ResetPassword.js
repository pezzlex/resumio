import { LockOutlined } from '@ant-design/icons'
import { Button, Form, Input, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useLocation, useParams } from 'react-router-dom'
import {
  clearStatus,
  resetPassword,
  verifyValidLink,
} from '../../../redux/auth/actions'
// import Input from '//uielements/input'
// import Button from '//uielements/button'
import ResetPasswordStyleWrapper from './ResetPassword.styles'

const ResetPassword = () => {
  const [form] = Form.useForm()
  const { userId, token } = useParams()
  console.log(userId)

  const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  const dispatch = useDispatch()
  const isSignedIn = useSelector((state) => state.Auth.token)
  const isValidLink = useSelector((state) => state.Auth.isValidLink)

  const { success, error } = useSelector((state) => state.Auth)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(verifyValidLink({ userId, token }))
  }, [])

  useEffect(() => {
    if (isSignedIn) {
      setRedirectToReferrer(true)
    }
  }, [isSignedIn])

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

  let location = useLocation()
  let { from } = location.state || { from: { pathname: '/dashboard' } }

  if (redirectToReferrer) {
    console.log('redirectToReferrer', redirectToReferrer)
    return <Redirect to={from} />
  }

  const onFinish = ({ password }) => {
    dispatch(resetPassword({ userId, password, token }))
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <ResetPasswordStyleWrapper className="isoResetPassPage">
      <div className="isoFormContentWrapper">
        <div className="isoFormContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">Resumio</Link>
          </div>

          <div className="isoFormHeadText">
            <h3>Reset Password</h3>
            {isValidLink ? (
              <p>Enter new password and confirm it.</p>
            ) : (
              <p>The reset password link is invalid or has expired.</p>
            )}
          </div>

          <div className="isoResetPassForm">
            {isValidLink && (
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
                  <Form.Item
                    label="New Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your new password!',
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
                      placeholder="New Password"
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
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </div>
              </Form>
            )}
          </div>
          <div className="isoCenterComponent isoHelperWrapper">
            <Link to="/">Return to Sign In</Link>
          </div>
        </div>
      </div>
    </ResetPasswordStyleWrapper>
  )
}

export default ResetPassword
