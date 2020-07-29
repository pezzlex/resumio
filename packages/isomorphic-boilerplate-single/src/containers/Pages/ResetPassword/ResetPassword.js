import React, { useState, useEffect } from 'react'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Input from '@iso/components/uielements/input'
import Button from '@iso/components/uielements/button'
import ResetPasswordStyleWrapper from './ResetPassword.styles'
import { clearStatus } from '../../../redux/auth/actions'

const ResetPassword = () => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  const dispatch = useDispatch()
  const isSignedIn = useSelector((state) => state.Auth.token)

  useEffect(() => {
    dispatch(clearStatus())
  })

  useEffect(() => {
    if (isSignedIn) {
      setRedirectToReferrer(true)
    }
  }, [isSignedIn])

  let location = useLocation()
  let { from } = location.state || { from: { pathname: '/dashboard' } }

  if (redirectToReferrer) {
    console.log('redirectToReferrer', redirectToReferrer)
    return <Redirect to={from} />
  }

  const onFinish = (values) => {
    clearStatus()
    // signIn(values)
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
            <p>Enter new password and confirm it.</p>
          </div>

          <div className="isoResetPassForm">
            <div className="isoInputWrapper">
              <Input size="large" type="password" placeholder="New Password" />
            </div>

            <div className="isoInputWrapper">
              <Input
                size="large"
                type="password"
                placeholder="Confirm Password"
              />
            </div>

            <div className="isoInputWrapper">
              <Button type="primary">Save</Button>
            </div>
          </div>
        </div>
      </div>
    </ResetPasswordStyleWrapper>
  )
}

export default ResetPassword
