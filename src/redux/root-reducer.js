import App from './app/reducer'
import Auth from './auth/reducer'
import resumeData from './resumes/reducer'
import { combineReducers } from 'redux'

export const baseUrl = 'https://resumio.herokuapp.com'

export default combineReducers({
  Auth,
  App,
  resumeData,
})
