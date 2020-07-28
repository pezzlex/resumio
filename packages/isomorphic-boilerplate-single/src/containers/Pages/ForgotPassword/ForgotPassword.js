import React from 'react'
import { Link } from 'react-router-dom'
import Input from '@iso/components/uielements/input'
import Button from '@iso/components/uielements/button'
import ForgotPasswordStyleWrapper from './ForgotPassword.styles'

export default function () {
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
              <Input size="large" placeholder="Email" />
            </div>

            <div className="isoInputWrapper">
              <Button type="primary">Send request</Button>
            </div>
          </div>
        </div>
      </div>
    </ForgotPasswordStyleWrapper>
  )
}
