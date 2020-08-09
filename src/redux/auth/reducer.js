import axios from 'axios'

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
  SUCCESS,
  FAILURE,
  IS_VALID_LINK,
  IS_NOT_VALID_LINK,
} from './actions'

const initState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  token: '',
  error: '',
  success: '',
  isValidLink: false,
}

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case LOGIN_USER:
      localStorage.setItem('jwtToken', action.payload.token)
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${action.payload.token}`
      return {
        ...state,
        ...action.payload,
        error: '',
      }
    case LOGOUT_USER:
      localStorage.removeItem('jwtToken')
      delete axios.defaults.headers.common['Authorization']
      return initState
    case REGISTER_USER:
      return {
        ...state,
        ...action.payload,
      }
    case EMAIL_SUCCESS:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case SUCCESS:
      return {
        ...state,
        success: action.payload,
      }
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...initState,
        error: action.payload,
      }
    case FAILURE:
    case EMAIL_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case CLEAR_STATUS:
      return {
        ...state,
        error: '',
        success: '',
      }
    case IS_VALID_LINK:
      return {
        ...state,
        isValidLink: true,
        success: action.payload,
      }
    case IS_NOT_VALID_LINK:
      return {
        ...state,
        isValidLink: false,
        error: action.payload,
      }
    default:
      return state
  }
}
