import axios from 'axios'

export const FETCH_RESUMES = 'FETCH_RESUMES'

export const fetchResumes = () => {
  console.log('http://localhost:4000/resumes called')
  return (dispatch) => {
    axios
      .get(`http://localhost:4000/resumes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      })
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
