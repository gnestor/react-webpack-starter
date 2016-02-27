import React, {Component} from 'react';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      messages: [],
      name: '',
      input: ''
    };
  }

  // Capture user's name
  componentDidMount() {
    let name = prompt('What\'s your name?');
    this.setState({name})
  }

  // If the user is scrolled to the bottom...
  componentWillUpdate(nextProps, nextState) {
    this.shouldScrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
  }

  // Scroll the messages list to the bottom
  componentDidUpdate(prevProps, prevState) {
    if (this.shouldScrollBottom) document.body.scrollTop = document.body.scrollHeight;
  }

  render() {
    return (
      <div className="container">
        <ul className="messages">
          {this.state.messages.map((message, index) => (
            <li className="message" key={index}>
              <div>
                <span className="name">{`${message.name}: `}</span>
                <span className="text">{message.text}</span>
              </div>
              <div className="time">{`${message.time.getHours()}:${message.time.getMinutes()}`}</div>
            </li>
          ))}
        </ul>
        <input
          className="input"
          type="text"
          placeholder="Say something..."
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          value={this.state.input}
        />
      </div>
    );
  }

  handleChange(event) {
    this.setState({input: event.target.value});
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      let messages = [...this.state.messages, {
        name: this.state.name,
        text: this.state.input,
        time: new Date()
      }];
      this.setState({
        messages,
        input: ''
      });
    }
  }

}
