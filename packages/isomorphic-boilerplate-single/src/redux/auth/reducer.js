import actions from './actions'
import { LOGIN_USER, LOGOUT_USER } from './actions'

const initState = { token: null }

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        ...action.payload,
      }
    case LOGOUT_USER:
      console.log('here')
      return initState
    // case actions.LOGIN_SUCCESS:
    //   return {
    //     idToken: action.token,
    //   }
    case actions.LOGOUT:
      return initState
    default:
      return state
  }
}
