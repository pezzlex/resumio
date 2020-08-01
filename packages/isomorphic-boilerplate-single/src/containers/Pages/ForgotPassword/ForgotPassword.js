import React, { useState, useEffect } from 'react'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// import Input from '@iso/components/uielements/input'
// import Button from '@iso/components/uielements/button'
import ForgotPasswordStyleWrapper from './ForgotPassword.styles'
import { clearStatus } from '../../../redux/auth/actions'
import { Form, Input, Button, Checkbox, message, notification } from 'antd'
import { getTempLink } from '../../../redux/auth/actions'

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
    dispatch(clearStatus())
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

                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={isLoading}>
                    Send Request
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </ForgotPasswordStyleWrapper>
  )
}

export default ForgotPassword
