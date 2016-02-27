import React, {Component} from 'react';

export default class Message extends Component {

  render() {
    let {message} = this.props
    return (
      <li className="message">
        <div>
          <span className="name">{`${message.name}: `}</span>
          <span className="text">{message.text}</span>
        </div>
        <div className="time">{`${message.time.getHours()}:${message.time.getMinutes()}`}</div>
      </li>
    );
  }

}
