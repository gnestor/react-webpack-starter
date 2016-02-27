import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Rebase from 're-base'
import Message from './Message'

const base = Rebase.createClass('https://react-in-a-day.firebaseio.com/')

export default class Messages extends Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.base = null
    this.shouldScrollBottom = true
  }

  componentDidMount() {
    this.base = base.listenTo('messages', {
      context: this,
      asArray: true,
      then: messages => {
        this.props.dispatch({
          type: 'SYNC_MESSAGES',
          messages
        })
      }
    })
    let name = prompt('What\'s your name')
    this.props.dispatch({
      type: 'SET_NAME',
      name
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.base)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.messages.length > this.props.messages.length) {
      base.post('messages', {data: nextProps.messages})
    }
    return true
  }

  componentWillUpdate() {
    this.shouldScrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight
  }

  componentDidUpdate() {
    if (this.shouldScrollBottom) document.body.scrollTop = document.body.scrollHeight
  }

  render() {
    let messages = this.props.messages.map(message => (
      <Message
        key={message.time}
        message={message}
        name={this.props.name}
        handleRemove={this.handleRemove}
      />
    ))
    return (
      <div className="container">
        <ul id="list">
          <ReactCSSTransitionGroup
            transitionName="item"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {messages}
          </ReactCSSTransitionGroup>
        </ul>
        <input
          id="input"
          type="text"
          placeholder="Say something..."
          value={this.props.input}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    )
  }

  handleChange(event) {
    this.props.dispatch({
      type: 'SET_INPUT',
      input: event.target.value
    })
  }

  handleKeyDown(event) {
    if (event.key === 'Enter' && this.props.input !== '') this.props.dispatch({type: 'SEND_MESSAGE'})
  }

  handleRemove(message) {
    this.props.dispatch({
      type: 'REMOVE_MESSAGE',
      message
    })
  }

}
