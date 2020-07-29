import axios from 'axios'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const REGISTER_USER = 'REGISTER_USER'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const CLEAR_STATUS = 'CLEAR_STATUS'
export const EMAIL_FAILURE = 'EMAIL_FAILURE'
export const EMAIL_SUCCESS = 'EMAIL_SUCCESS'

export const fetchToken = ({ username, password }) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:4000/users/login`, {
        username,
        password,
      })
      .then((response) => {
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
          dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data.message,
          })
          localStorage.setItem('jwtToken', response.data.data.token)
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${response.data.token}`
        }
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
  delete axios.defaults.headers.common['Authorization']
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
        if (response.status === 200) {
          dispatch(fetchToken({ username, password }))
          dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data.message,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_FAILURE,
          payload: err.response.data.message,
        })
      })
  }
}

export const clearStatus = () => {
  return (dispatch) =>
    dispatch({
      type: CLEAR_STATUS,
    })
}

export const getTempLink = (email) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:4000/users/get-temp-link`, {
        email,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: EMAIL_SUCCESS,
            payload: response.data.message,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: EMAIL_FAILURE,
          payload: err.response.data.message,
        })
      })
  }
}
