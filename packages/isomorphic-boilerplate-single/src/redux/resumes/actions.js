import axios from 'axios'

export const FETCH_RESUMES_SUCCESS = 'FETCH_RESUMES_SUCCESS'

export const fetchResumes = () => {
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
            type: FETCH_RESUMES_SUCCESS,
            payload: response.data,
          })
        }
      })
      .catch((err) => {
        console.log('Error: ', err)
      })
  }
}
