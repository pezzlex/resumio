import axios from 'axios'

export const FETCH_RESUMES = 'FETCH_RESUMES'
export const FETCH_RESUME_BY_ID = 'FETCH_RESUME_BY_ID'

export const fetchResumes = ({ userId }) => {
  console.log('http://localhost:4000/resumes called. userId = ', userId)
  return (dispatch) => {
    axios
      .post('http://localhost:4000/resumes', { id: userId })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data)
          dispatch({
            type: FETCH_RESUMES,
            payload: response.data,
          })
        }
      })
      .catch((err) => {
        console.log('Error: ', err)
      })
  }
}

export const deleteResume = ({ resumeId, userId }) => {
  console.log('http://localhost:4000/resumes/delete/' + resumeId)
  return (dispatch) => {
    axios
      .get(`http://localhost:4000/resumes/delete/${resumeId}`)
      .then((response) => {
        console.log('deleting')
        if (response.status === 200) {
          dispatch(fetchResumes({ userId }))
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
          console.log('response.data', response.data)
          dispatch({
            type: FETCH_RESUME_BY_ID,
            payload: response.data,
          })
        }
      })
      .catch((err) => {
        console.log('Error: ', err)
      })
  }
}
