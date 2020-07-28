import React from 'react'
import { Link } from 'react-router-dom'
import Input from '@iso/components/uielements/input'
import Button from '@iso/components/uielements/button'
import ResetPasswordStyleWrapper from './ResetPassword.styles'

export default function () {
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
