import axios from 'axios'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),
  login: (token = false) => ({
    type: actions.LOGIN_REQUEST,
    payload: { token },
  }),
  logout: () => ({
    type: actions.LOGOUT,
  }),
}

export const fetchToken = ({ username, password }) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:4000/users/authenticate`, {
        username,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data)
          dispatch({
            type: LOGIN_USER,
            payload: response.data,
          })
          localStorage.setItem('jwtToken', response.data.token)
        } else {
          localStorage.removeItem('jwtToken')
          dispatch({
            type: LOGOUT_USER,
          })
        }
      })
      .catch((err) => {
        console.log('Error: ', err)
      })
  }
}

export default actions
