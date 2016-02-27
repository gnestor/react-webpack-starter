import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import reducer from './Reducers'
import Messages from './Messages'
import '../css/style.css'

const store = createStore(reducer, {
  messages: [],
  input: '',
  name: ''
}, window.devToolsExtension ? window.devToolsExtension() : undefined)
const App = connect(state => state)(Messages)

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'))
