/*eslint-disable no-var */

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_INPUT':
      let {input} = action
      return Object.assign({}, state, {input})
    case 'SET_NAME':
      let {name} = action
      return Object.assign({}, state, {name})
    case 'SEND_MESSAGE':
      var messages = [...state.messages, {
        name: state.name,
        text: state.input,
        time: JSON.stringify(new Date())
      }]
      return Object.assign({}, state, {messages}, {input: ''})
    case 'REMOVE_MESSAGE':
      var messages = state.messages.filter(message => message.time !== action.message.time)
      return Object.assign({}, state, {messages})
    case 'SYNC_MESSAGES':
      var {messages} = action
      return Object.assign({}, state, {messages})
    default:
      return state
  }
}

export default reducer
