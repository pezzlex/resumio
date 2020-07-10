import axios from 'axios'

export const FETCH_RESUMES = 'FETCH_RESUMES'

export const fetchResumes = (userId) => {
  console.log('http://localhost:4000/resumes called. User.id = ', userId)
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
