import axios from 'axios'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const REGISTER_USER = 'REGISTER_USER'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const CLEAR_ERROR = 'CLEAR_ERROR'

const actions = {}

export const fetchToken = ({ username, password }) => {
  console.log('fetching token')
  return (dispatch) => {
    axios
      .post(`http://localhost:4000/users/login`, {
        username,
        password,
      })
      .then((response) => {
        console.log('about to get response')
        if (response.status === 200) {
          const filter = ({ firstName, lastName, username, email, token }) => ({
            firstName,
            lastName,
            username,
            email,
            token,
          })
          dispatch({
            type: LOGIN_USER,
            payload: filter(response.data.data),
          })
          localStorage.setItem('jwtToken', response.data.data.token)
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${response.data.token}`
        }
        console.log('leaving actions')
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILURE,
          payload: err.response.data.message,
        })
      })
  }
}

export const logoutUser = () => {
  localStorage.removeItem('jwtToken')

  return (dispatch) =>
    dispatch({
      type: LOGOUT_USER,
    })
}

export const registerUser = ({
  firstName,
  lastName,
  email,
  username,
  password,
}) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:4000/users/register`, {
        firstName,
        lastName,
        email,
        username,
        password,
      })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          dispatch(fetchToken({ username, password }))
        }
      })
      .catch((err) => {
        console.log(err.response.data.message)
        dispatch({
          type: REGISTER_FAILURE,
          payload: err.response.data.message,
        })
      })
  }
}

export const clearError = () => {
  return (dispatch) =>
    dispatch({
      type: CLEAR_ERROR,
    })
}

export default actions
