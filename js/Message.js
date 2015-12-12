import React, {Component} from 'react';

export default class Message extends Component {

  componentDidMount() {

  }

  render() {
    let {
      name,
      message,
      time
    } = this.props;
    if (message.match(/https?\:\/\//g)) {
      let transformed = message.split(' ').map(word => {
        if (word.match(/https?\:\/\//g)) return <a href={word}>{word} </a>;
        return word + ' ';
      });
      message = transformed;
    }
    return (
      <li className="item">
        <span className="name">{name}: </span>
        <span className="message">{message}</span>
        <span className="time">{time}</span>
      </li>
    );
  }

}
