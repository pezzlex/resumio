import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from './actions'

const initState = { token: null }

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        ...action.payload,
      }
    case LOGOUT_USER:
      localStorage.removeItem('jwtToken')
      return initState
    case REGISTER_USER:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
