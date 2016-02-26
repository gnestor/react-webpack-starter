import React, {Component} from 'react'
import Rebase from 're-base'

const base = Rebase.createClass('https://react-in-a-day.firebaseio.com/')

export default class Store extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      input: '',
      name: '',
      history: -1
    }
    this.history = []
    this.action = ''
    this.dispatch = this.dispatch.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.setInput = this.setInput.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.removeMessage = this.removeMessage.bind(this)
  }

  // Enable React's context feature
  static childContextTypes = {
    state: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  }

  // Make this.state and this.dispatch available to child components via context
  getChildContext() {
    return {
      state: this.state,
      dispatch: this.dispatch
    }
  }

  componentDidMount() {
    // Listen for left/right arrow key keydowns
    document.body.addEventListener('keydown', this.handleKeyDown)
    // Fetch state from Firebase
    base.syncState(`chatList`, {
      context: this,
      state: 'messages',
      asArray: true,
      then: () => this.log({action: 'sync'})
    })
    // Set user name
    let name = prompt('What\'s your name')
    this.setState({name})
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Since our state is immutable, we can use a shallow comparison
    return nextState !== this.state
  }

  componentDidUpdate(prevProps, prevState) {
    // Log all state changes to this.history
    if (this.action) this.log({action: this.action})
    this.action = ''
  }

  render() {
    // This is a container component and doesn't render any UI itself
    return this.props.children
  }

  /**
   * Action "dispatcher"
   */

  dispatch(action = '', ...args) {
    this.action = action
    this[action](...args)
  }

  /**
   * State history feature (undo/redo)
   */

   // Traverse the state history
   handleKeyDown(event) {
     if (event.keyCode === 37 && this.state.history > 0) this.setHistory(this.state.history - 1)
     if (event.keyCode === 39 && this.state.history < this.history.length - 1) this.setHistory(this.state.history + 1)
   }

  // Log a new action and state snapshot to the state history
  log(data = {}) {
    // Logging every setInput state change caused performance issues very quickly
    if (this.action !== 'setInput') {
      this.setState({history: this.state.history + 1}, (previousState, currentProps) => {
        this.history = this.history.concat({
          ...data,
          state: this.state,
          timestamp: Date.now()
        })
        console.group(data)
        console.log(this.state)
        console.groupEnd()
      })
    }
  }

  // Set the current state with an index from the state history
  setHistory(index) {
    this.setState(this.history.find(item => item.state.history === index).state, (previousState, currentProps) => {
      console.group({
        action: 'setHistory',
        history: this.state.history
      })
      console.log(this.state)
      console.groupEnd()
    })
  }

  /**
   * Actions
   */

  setInput(value) {
    this.setState({input: value})
  }

  sendMessage(message) {
    let time = new Date()
    this.setState({
      messages: this.state.messages.concat({
        name: this.state.name,
        text: this.state.input,
        time: JSON.stringify(new Date())
      }),
      input: ''
    })
  }

  removeMessage(key) {
    this.setState({
      messages: this.state.messages.filter(message => message.time !== key)
    })
  }

}
