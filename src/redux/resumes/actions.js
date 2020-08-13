import axios from 'axios'
import { baseUrl } from '../root-reducer'

export const FETCH_RESUMES = 'FETCH_RESUMES'
export const FETCH_RESUME_BY_ID = 'FETCH_RESUME_BY_ID'
export const ERROR = 'ERROR'
export const SUCCESS = 'SUCCESS'
export const CLEAR_STATUS = 'CLEAR_STATUS'
export const CLEAR_CURRENT_RESUME = 'CLEAR_CURRENT_RESUME'

export const fetchResumes = (params) => {
  console.log(process.env)
  return (dispatch) => {
    axios
      .get(`${baseUrl}/resumes`, { params })
      .then((response) => {
        if (response.status === 200) {
          console.log('found resumes ', response.data.data)
          dispatch({
            type: FETCH_RESUMES,
            payload: response.data.data,
          })
          dispatch({
            type: SUCCESS,
            payload: response.data.message,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: ERROR,
          payload: err.response.data.message,
        })
      })
  }
}

export const deleteResume = (id) => {
  return (dispatch) => {
    axios
      .delete(`${baseUrl}/resumes/${id}`)
      .then((response) => {
        console.log('deleting')
        if (response.status === 200) {
          dispatch(fetchResumes())
          dispatch({
            type: SUCCESS,
            payload: response.data.message,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: ERROR,
          payload: err.response.data.message,
        })
      })
  }
}

export const fetchResumeById = (id) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/resumes/${id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log('found resume', response.data.data)
          dispatch({
            type: FETCH_RESUME_BY_ID,
            payload: response.data.data,
          })
          dispatch({
            type: SUCCESS,
            payload: response.data.message,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: ERROR,
          payload: err.response.data.message,
        })
      })
  }
}

export const addResume = (resume) => {
  return (dispatch) => {
    axios
      .post(`${baseUrl}/resumes/add`, resume)
      .then((response) => {
        if (response.status === 200) {
          // reset current resume
          dispatch({
            type: FETCH_RESUME_BY_ID,
            payload: response.data.data,
          })
          dispatch({
            type: SUCCESS,
            payload: response.data.message,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: ERROR,
          payload: err.response.data.message,
        })
      })
  }
}

export const editResume = (id, resume) => {
  return (dispatch) => {
    axios
      .put(`${baseUrl}/resumes/${id}`, resume)
      .then((response) => {
        if (response.status === 200) {
          // reset current resume
          dispatch({
            type: FETCH_RESUME_BY_ID,
            payload: response.data.data,
          })
          dispatch({
            type: SUCCESS,
            payload: response.data.message,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: ERROR,
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

export const clearCurrentResume = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_CURRENT_RESUME })
    dispatch({ type: SUCCESS, payload: 'Cleared current resume' })
  }
}
