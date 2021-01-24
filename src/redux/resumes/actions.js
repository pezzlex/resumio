import axios from 'axios'

export const FETCH_RESUMES = 'FETCH_RESUMES'
export const FETCH_RESUME_BY_ID = 'FETCH_RESUME_BY_ID'
export const ERROR = 'ERROR'
export const SUCCESS = 'SUCCESS'
export const CLEAR_STATUS = 'CLEAR_STATUS'
export const CLEAR_CURRENT_RESUME = 'CLEAR_CURRENT_RESUME'
export const FETCH_DISPLAY_LINK = 'FETCH_DISPLAY_LINK'

export const fetchResumes = (params) => {
  return (dispatch) => {
    axios
      .get(`${process.env.REACT_APP_baseUrl}/resumes`, { params })
      .then((response) => {
        if (response.status === 200) {
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
      .delete(`${process.env.REACT_APP_baseUrl}/resumes/${id}`)
      .then((response) => {
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
      .get(`${process.env.REACT_APP_baseUrl}/resumes/${id}`)
      .then((response1) => {
        if (response1.status === 200) {
          axios
            .get(
              `${process.env.REACT_APP_baseUrl}/resumes/get-display-link/${id}`
            )
            .then((response2) => {
              if (response2.status === 200) {
                dispatch({
                  type: FETCH_RESUME_BY_ID,
                  payload: response1.data.data,
                })
                dispatch({
                  type: FETCH_DISPLAY_LINK,
                  payload: response2.data.data,
                })
                dispatch({
                  type: SUCCESS,
                  payload: response1.data.message,
                })
              }
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
      .post(`${process.env.REACT_APP_baseUrl}/resumes/add`, resume)
      .then((response) => {
        if (response.status === 200) {
          const newResume = response.data.data
          // reset current resume
          dispatch(
            renderResume(newResume._id, {
              template: newResume.template,
              resumeDetails: newResume,
            })
          )
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
      .put(`${process.env.REACT_APP_baseUrl}/resumes/${id}`, resume)
      .then((response1) => {
        if (response1.status === 200) {
          const newResume = response1.data.data
          console.log('newResume', newResume)
          dispatch(
            renderResume(id, {
              template: newResume.template,
              resumeDetails: newResume,
            })
          )
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

/**
 * 1. Updates resume's texFileContent (among all other stuff)
 * 2. Get's resume's new display link
 */
export const renderResume = (id, { template, resumeDetails }) => {
  console.log('renderResume called')
  return (dispatch) => {
    axios
      .put(`${process.env.REACT_APP_baseUrl}/resumes/render-resume/${id}`, {
        template,
        resumeDetails,
      })
      .then((response1) => {
        if (response1.status === 200) {
          axios
            .get(
              `${process.env.REACT_APP_baseUrl}/resumes/get-display-link/${id}`
            )
            .then((response2) => {
              if (response2.status === 200) {
                dispatch({
                  type: FETCH_RESUME_BY_ID,
                  payload: response1.data.data,
                })
                dispatch({
                  type: FETCH_DISPLAY_LINK,
                  payload: response2.data.data,
                })
                dispatch({
                  type: SUCCESS,
                  payload: response1.data.message,
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
      })
      .catch((err) => {
        dispatch({
          type: ERROR,
          payload: err.response.data.message,
        })
      })
  }
}
