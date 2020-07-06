import React from 'react'
import { Provider } from 'react-redux'
import GlobalStyles from '@iso/assets/styles/globalStyle'
import Boot from './redux/boot'
import thunk from 'redux-thunk'
import { save, load } from 'redux-localstorage-simple'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/root-reducer'

import Routes from './router'
import AppProvider from './AppProvider'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
  rootReducer,
  load(),
  composeWithDevTools(applyMiddleware(thunk, save()))
)

const App = () => (
  <Provider store={store}>
    <AppProvider>
      <GlobalStyles />
      <Routes />
    </AppProvider>
  </Provider>
)
Boot()
  .then(() => App())
  .catch((error) => console.error(error))

export default App
