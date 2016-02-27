import React, {Component} from 'react';
import Message from './Message'

export default class Messages extends Component {

  render() {
    return (
      <ul className="messages">
        {this.props.messages.map((message, index) => <Message key={index} {...message} />)}
      </ul>
    );
  }

}
