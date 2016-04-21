import React, {Component} from 'react';
import Highlight from 'react-highlight';
import '../css/github-gist.css';

export default class Message extends Component {

  constructor(props) {
    super(props);
    this.transform = this.transform.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  render() {
    let {
      name,
      text,
      time
    } = this.props.message
    let message = this.transform(text)
    let me = this.props.name
    let timestamp = new Date(JSON.parse(time))
    let remove
    if (name === me) remove = <span className="remove" onClick={this.onRemove}>✖</span>
    return (
      <li className="item">
        <div>
          <span className="name">{name}: </span>
          <span className="message">{message}</span>
        </div>
        <div>
          <span className="time">{`${timestamp.getHours()}:${timestamp.getMinutes()}`}</span>
          {remove}
        </div>
      </li>
    )
  }

  onRemove(event) {
    this.props.handleRemove(this.props.message.key);
  }

  transform(message) {
    switch (true) {
      case /https?\:\/\//.test(message):
        if (/\.jpg|png|gif$/.test(message)) {
          return message.split(' ').map((word, index) => {
            if (word.match(/\.jpg|png|gif$/)) return <img key={index} src={word} width={300} />;
            return word + ' ';
          });
        } else {
          return message.split(' ').map((word, index) => {
            if (word.match(/https?\:\/\//g)) return <a key={index} href={word}>{word} </a>;
            return word + ' ';
          });
        }
      case /^\`.*\`$/.test(message):
        return (<Highlight className='javascript'>
          {message.replace(/\`/g, '')}
        </Highlight>);
      default:
        return message;
    }
  }

}
