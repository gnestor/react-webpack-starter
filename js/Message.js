import React, {Component} from 'react';

export default class Message extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <li className="item">
        <span className="name">{this.props.name}: </span>
        <span className="message">{this.props.message}</span>
        <span className="time">{this.props.time}</span>
      </li>
    );
  }

}
