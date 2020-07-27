import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  LOGIN_FAILURE,
  CLEAR_ERROR,
} from './actions'

const initState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  token: '',
  error: '',
}

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case LOGIN_USER:
      console.log('about to login user')
      return {
        ...state,
        ...action.payload,
        error: '',
      }
    case LOGOUT_USER:
      return initState
    case REGISTER_USER:
      return {
        ...state,
        ...action.payload,
      }
    case LOGIN_FAILURE:
      console.log(action.payload)
      return {
        ...initState,
        error: action.payload,
      }
    case CLEAR_ERROR:
      return {
        ...state,
        error: '',
      }
    default:
      return state
  }
}
