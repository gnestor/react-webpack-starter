import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Message from './Message'

export default class Messages extends Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.shouldScrollBottom = false
  }

  // Enable React's context feature
  static contextTypes = {
    state: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  }

  componentWillUpdate() {
    this.shouldScrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight
  }

  componentDidUpdate() {
    if (this.shouldScrollBottom) document.body.scrollTop = document.body.scrollHeight
  }

  render() {
    let messages = this.context.state.messages.map((message, index) => (
      <Message
        key={index}
        message={message}
        name={this.context.state.name}
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
          value={this.context.state.input}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    )
  }

  handleChange(event) {
    this.context.dispatch('setInput', event.target.value)
  }

  handleKeyDown(event) {
    if (event.key === 'Enter' && this.context.state.input !== '') this.context.dispatch('sendMessage')
  }

  handleRemove(key) {
    this.context.dispatch('removeMessage', key)
  }

}
