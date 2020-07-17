import { FETCH_RESUMES, FETCH_RESUME_BY_ID } from '../resumes/actions'

const initState = {
  resumes: [],
  currentResume: {},
  shouldFetchResumes: true,
}

const resumeReducer = (state = initState, action) => {
  console.log(action.type, action.payload)
  switch (action.type) {
    case FETCH_RESUMES:
      return {
        ...state,
        resumes: action.payload,
        shouldFetchResumes: false,
      }
    case FETCH_RESUME_BY_ID:
      return {
        ...state,
        currentResume: action.payload,
      }
    default:
      return state
  }
}

export default resumeReducer
