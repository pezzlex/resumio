import App from './app/reducer'
import Auth from './auth/reducer'
import resumeData from './resumes/reducer'
import { combineReducers } from 'redux'

export const herokuUrl = 'http://resumio.herokuapp.com'

export default combineReducers({
  Auth,
  App,
  resumeData,
})
