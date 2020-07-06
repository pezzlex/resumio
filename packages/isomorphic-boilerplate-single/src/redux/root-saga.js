import { all } from 'redux-saga/effects'
import authSaga from '@iso/redux/auth/saga'
// import ecommerceSaga from '@iso/redux/ecommerce/saga';

export default function* rootSaga(getState) {
  console.log('and here')
  yield all([authSaga()])
}
