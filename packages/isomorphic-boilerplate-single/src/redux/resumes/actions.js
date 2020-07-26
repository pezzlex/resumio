import axios from 'axios'

export const FETCH_RESUMES = 'FETCH_RESUMES'
export const FETCH_RESUME_BY_ID = 'FETCH_RESUME_BY_ID'

export const fetchResumes = () => {
  return (dispatch) => {
    axios
      .get('http://localhost:4000/resumes')
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: FETCH_RESUMES,
            payload: response.data.data,
          })
        }
      })
      .catch((err) => {
        console.log('Error: ', err)
      })
  }
}

export const deleteResume = (resumeId) => {
  console.log('http://localhost:4000/resumes/delete/' + resumeId)
  return (dispatch) => {
    axios
      .delete(`http://localhost:4000/resumes/${resumeId}`)
      .then((response) => {
        console.log('deleting')
        if (response.status === 200) {
          dispatch(fetchResumes())
        }
      })
      .catch((err) => {
        console.log('Error: ', err)
      })
  }
}

export const fetchResumeById = ({ resumeId }) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:4000/resumes/${resumeId}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: FETCH_RESUME_BY_ID,
            payload: response.data.data,
          })
        }
      })
      .catch((err) => {
        console.log('Error: ', err)
      })
  }
}
