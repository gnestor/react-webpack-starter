import React, {Component, PropTypes} from 'react';

export default class Message extends Component {

  render() {
    let {name, text, time} = this.props
    return (
      <li className="message">
        <div>
          <span className="name">{`${name}: `}</span>
          <span className="text">{text}</span>
        </div>
        <div className="time">{`${time.getHours()}:${time.getMinutes()}`}</div>
      </li>
    );
  }

  static propTypes = {
    name: PropTypes.string,
    text: PropTypes.string,
    time: PropTypes.string
  }

}
