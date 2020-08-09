import { Button, Form, Input, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { clearStatus, getTempLink } from '../../../redux/auth/actions'
// import Input from '//uielements/input'
// import Button from '//uielements/button'
import ForgotPasswordStyleWrapper from './ForgotPassword.styles'

const ForgotPassword = () => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const isSignedIn = useSelector((state) => state.Auth.token)
  const error = useSelector((state) => state.Auth.error)
  const success = useSelector((state) => state.Auth.success)

  useEffect(() => {
    setLoading(false)
    dispatch(clearStatus())
  }, [error, success])

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

  const onFinish = ({ email }) => {
    setLoading(true)
    dispatch(getTempLink(email))
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <ForgotPasswordStyleWrapper className="isoForgotPassPage">
      <div className="isoFormContentWrapper">
        <div className="isoFormContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">Resumio</Link>
          </div>

          <div className="isoFormHeadText">
            <h3>Forgot Password?</h3>
            <p>Enter your email and we send you a reset link.</p>
          </div>

          <div className="isoForgotPassForm">
            <div className="isoInputWrapper">
              {/* <Input size="large" placeholder="Email" /> */}
              <Form
                layout="vertical"
                name="forgotPassword"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
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
                <div className="isoInputWrapper">
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isLoading}
                    >
                      Send Request
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </ForgotPasswordStyleWrapper>
  )
}

export default ForgotPassword
