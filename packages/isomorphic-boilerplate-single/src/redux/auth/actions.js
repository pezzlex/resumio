import axios from 'axios'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const REGISTER_USER = 'REGISTER_USER'

const actions = {}

export const fetchToken = ({ username, password }) => {
  console.log('fetching token')
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
        }
      })
      .catch((err) => {
        console.log('Error: ', err)
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
      .catch((err) => console.log(err))
  }
}

export default actions
