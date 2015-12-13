import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Rebase from 're-base';
import Message from './Message';

const base = Rebase.createClass('https://react-in-a-day.firebaseio.com/');

export default class App extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.shouldScrollBottom = false;
    this.state = {
      messages: [],
      input: '',
      name: ''
    };
  }

  componentDidMount() {
    base.syncState(`chatList`, {
      context: this,
      state: 'messages',
      asArray: true
    });
    let name = prompt('What\'s your name');
    this.setState({name});
  }

  componentWillUpdate() {
    // let node = ReactDOM.findDOMNode(this);
    this.shouldScrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
  }

  componentDidUpdate() {
    if (this.shouldScrollBottom) document.body.scrollTop = document.body.scrollHeight;
  }

  render() {
    let messages = this.state.messages.map((message, index) => (
      <Message key={index} {...message} />
    ));
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
          value={this.state.input}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }

  handleChange(event) {
    this.setState({input: event.target.value});
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      if (this.state.input !== '') {
        let time = new Date();
        this.setState({
          messages: this.state.messages.concat({
            name: this.state.name,
            message: this.state.input,
            time: `${time.getHours()}:${time.getMinutes()}`
          }),
          input: ''
        });
      }
    }
  }

}
