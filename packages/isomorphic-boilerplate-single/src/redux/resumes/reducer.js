import { FETCH_RESUMES, FETCH_RESUME_BY_ID, FAILURE } from '../resumes/actions'

const initState = {
  resumes: [],
  currentResume: null,
  shouldFetchResumes: true,
  failure: '',
}

const resumeReducer = (state = initState, action) => {
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
    case FAILURE:
      return {
        ...state,
        failure: action.payload,
      }
    default:
      return state
  }
}

export default resumeReducer
