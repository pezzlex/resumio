import { combineReducers } from "redux"
import App from "@iso/redux/app/reducer"
import Auth from "@iso/redux/auth/reducer"
import LanguageSwitcher from "@iso/redux/languageSwitcher/reducer"

export default combineReducers({
  Auth,
  App,
  LanguageSwitcher,
})
