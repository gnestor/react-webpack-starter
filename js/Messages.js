import React, {Component, PropTypes} from 'react';
import Message from './Message'

export default class Messages extends Component {

  render() {
    return (
      <ul className="messages">
        {this.props.messages.map((message, index) => <Message key={index} {...message} />)}
      </ul>
    );
  }

  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      text: PropTypes.string,
      time: PropTypes.string
    }))
  }

}
