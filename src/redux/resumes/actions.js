import axios from 'axios'

export const FETCH_RESUMES = 'FETCH_RESUMES'
export const FETCH_RESUME_BY_ID = 'FETCH_RESUME_BY_ID'
export const ERROR = 'ERROR'
export const SUCCESS = 'SUCCESS'
export const CLEAR_STATUS = 'CLEAR_STATUS'
export const CLEAR_CURRENT_RESUME = 'CLEAR_CURRENT_RESUME'
export const RENDER_RESUME = 'RENDER_RESUME'

export const fetchResumes = (params) => {
  console.log(process.env)
  return (dispatch) => {
    axios
      .get(`${process.env.REACT_APP_baseUrl}/resumes`, { params })
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
      .delete(`${process.env.REACT_APP_baseUrl}/resumes/${id}`)
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
      .get(`${process.env.REACT_APP_baseUrl}/resumes/${id}`)
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
      .post(`${process.env.REACT_APP_baseUrl}/resumes/add`, resume)
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
      .put(`${process.env.REACT_APP_baseUrl}/resumes/${id}`, resume)
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

export const renderResume = (id, { template, resumeDetails }) => {
  console.log('called it')
  console.log({ template, resumeDetails })
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
              console.log(response2)
              if (response2.status === 200) {
                dispatch({
                  type: RENDER_RESUME,
                  payload: {
                    texFileContent: response1.data.data,
                    displayLink: response2.data.data,
                  },
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
