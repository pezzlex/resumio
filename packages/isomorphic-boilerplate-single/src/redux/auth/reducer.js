import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  CLEAR_STATUS,
  EMAIL_FAILURE,
  EMAIL_SUCCESS,
} from './actions'

const initState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  token: '',
  error: '',
  success: '',
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
    case EMAIL_SUCCESS:
      return {
        ...state,
        success: action.payload,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        success: action.payload,
      }
    case LOGIN_FAILURE:
      console.log(action.payload)
      return {
        ...initState,
        error: action.payload,
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        success: action.payload,
      }
    case REGISTER_FAILURE:
      console.log(action.payload)
      return {
        ...initState,
        error: action.payload,
      }
    case EMAIL_FAILURE:
      return {
        ...initState,
        error: action.payload,
      }
    case CLEAR_STATUS:
      return {
        ...state,
        error: '',
        success: '',
      }
    default:
      return state
  }
}
