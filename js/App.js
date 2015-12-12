import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Rebase from 're-base';

const base = Rebase.createClass('https://react-in-a-day.firebaseio.com/');

export default class App extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.shouldScrollBottom = false;
    this.state = {
      messages: [],
      input: 'test'
    };
  }

  componentDidMount() {
    base.syncState(`chatList`, {
      context: this,
      state: 'messages',
      asArray: true
    });
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
      <li className="item" key={index}>{message}</li>
    ));
    return (
      <div className="container">
        <ul id="list">
          {messages}
        </ul>
        <input
          id="input"
          type="text"
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
      event.preventDefault();
      this.setState({
        messages: this.state.messages.concat(this.state.input),
        input: ''
      });
    }
  }

}
