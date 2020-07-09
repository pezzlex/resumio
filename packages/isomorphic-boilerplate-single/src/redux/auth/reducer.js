import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from './actions'

const initState = { firstName: '', lastName: '', username: '', id: '' }

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        ...action.payload,
      }
    case LOGOUT_USER:
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
