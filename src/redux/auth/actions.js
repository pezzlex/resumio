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
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'
export const IS_VALID_LINK = 'IS_VALID_LINK'
export const IS_NOT_VALID_LINK = 'IS_NOT_VALID_LINK'

export const fetchToken = ({ email, password }) => {
  console.log(email, password)
  return (dispatch) => {
    axios
      .post(`${process.env.herokuUrl}/users/login`, {
        email,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          const filter = ({ firstName, lastName, email, token }) => ({
            firstName,
            lastName,
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
      .post(`${process.env.herokuUrl}/users/register`, {
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
      .post(`${process.env.herokuUrl}/users/get-temp-link`, {
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

export const verifyValidLink = ({ userId, token }) => {
  return (dispatch) => {
    axios
      .get(`${process.env.herokuUrl}/users/reset-password/${userId}/${token}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: IS_VALID_LINK,
            payload: response.data.message,
          })
        }
      })
      .catch((err) => {
        console.log('dispatching is not valid link')
        dispatch({
          type: IS_NOT_VALID_LINK,
          payload: err.response.data.message,
        })
      })
  }
}

export const resetPassword = ({ userId, password, token }) => {
  console.log(userId, password)
  return (dispatch) => {
    axios
      .post(`${process.env.herokuUrl}/users/reset-password`, {
        userId,
        password,
        token,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: SUCCESS,
            payload: response.data.message,
          })
          // invalidate right after success message sent
          dispatch({
            type: IS_NOT_VALID_LINK,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: FAILURE,
          payload: err.response.data.message,
        })
      })
  }
}
