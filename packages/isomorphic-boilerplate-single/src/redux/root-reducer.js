import App from '@iso/redux/app/reducer'
import Auth from '@iso/redux/auth/reducer'
import resumeData from './resumes/reducer'
import templateData from './templates/reducer'
import { combineReducers } from 'redux'

export default combineReducers({
  Auth,
  App,
  resumeData,
  templateData,
})
