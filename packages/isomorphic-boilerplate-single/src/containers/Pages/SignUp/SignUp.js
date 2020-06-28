import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from '@iso/components/uielements/input';
import Checkbox from '@iso/components/uielements/checkbox';
import Button from '@iso/components/uielements/button';
import FirebaseSignUpForm from '../../FirebaseForm/FirebaseForm';
import authAction from '@iso/redux/auth/actions';
import appActions from '@iso/redux/app/actions';
import Auth0 from '../../Authentication/Auth0/Auth0';
import IntlMessages from '@iso/components/utility/intlMessages';
import SignUpStyleWrapper from './SignUp.styles';

const { login } = authAction;
const { clearMenu } = appActions;

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = (token = false) => {
    console.log(token, 'handlelogin');
    if (token) {
      dispatch(login(token));
    } else {
      dispatch(login());
    }
    dispatch(clearMenu());
    history.push('/dashboard');
  };
  return (
    <SignUpStyleWrapper className="isoSignUpPage">
      <div className="isoSignUpContentWrapper">
        <div className="isoSignUpContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">RESUMIO</Link>
          </div>

          <div className="isoSignUpForm">
            <div className="isoInputWrapper isoLeftRightComponent">
              <Input size="large" placeholder="First name" />
              <Input size="large" placeholder="Last name" />
            </div>

            <div className="isoInputWrapper">
              <Input size="large" placeholder="Username" />
            </div>

            <div className="isoInputWrapper">
              <Input size="large" placeholder="Email" />
            </div>

            <div className="isoInputWrapper">
              <Input size="large" type="password" placeholder="Password" />
            </div>

            <div className="isoInputWrapper">
              <Input
                size="large"
                type="password"
                placeholder="Confirm Password"
              />
            </div>

            <div className="isoInputWrapper" style={{ marginBottom: '50px' }}>
              <Checkbox>I agree with terms and conditions</Checkbox>
            </div>

            <div className="isoInputWrapper">
              <Button type="primary">Sign Up</Button>
            </div>
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
            <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
              <Link to="/signin">Already have an account? Sign in.</Link>
            </div>
          </div>
        </div>
      </div>
    </SignUpStyleWrapper>
  );
}
