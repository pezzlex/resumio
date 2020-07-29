import axios from 'axios'

export const FETCH_RESUMES = 'FETCH_RESUMES'
export const FETCH_RESUME_BY_ID = 'FETCH_RESUME_BY_ID'
export const FAILURE = 'FAILURE'

export const fetchResumes = () => {
  return (dispatch) => {
    axios
      .get('http://localhost:4000/resumes')
      .then((response) => {
        if (response.status === 200) {
          console.log('found resumes ', response.data.data)
          dispatch({
            type: FETCH_RESUMES,
            payload: response.data.data,
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

export const deleteResume = (id) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:4000/resumes/${id}`)
      .then((response) => {
        console.log('deleting')
        if (response.status === 200) {
          dispatch(fetchResumes())
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

export const fetchResumeById = (id) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:4000/resumes/${id}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: FETCH_RESUME_BY_ID,
            payload: response.data.data,
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
