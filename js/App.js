import React, {Component} from 'react';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      messages: [],
      input: 'Hello world'
    };
  }

  render() {
    return (
      <div className="container">
        <ul>
          {this.state.messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
        <input
          className="input"
          type="text"
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
      let messages = [...this.state.messages, this.state.input];
      this.setState({
        messages,
        input: ''
      });
    }
  }

}
