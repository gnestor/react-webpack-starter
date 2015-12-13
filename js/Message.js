import React, {Component} from 'react';
import Highlight from 'react-highlight';
import '../css/github-gist.css';

export default class Message extends Component {

  constructor(props) {
    super(props);
    this.transform = this.transform.bind(this);
  }

  componentDidMount() {

  }

  render() {
    let {
      name,
      message,
      time
    } = this.props;
    message = this.transform(message);
    return (
      <li className="item">
        <div>
          <span className="name">{name}: </span>
          <span className="message">{message}</span>
        </div>
        <div>
          <span className="time">{time}</span>
        </div>
      </li>
    );
  }

  transform(message) {
    switch (true) {
      case /https?\:\/\//.test(message):
        if (/\.jpg|png|gif$/.test(message)) {
          return message.split(' ').map(word => {
            if (word.match(/\.jpg|png|gif$/)) return <img src={word} width={300} />;
            return word + ' ';
          });
        } else {
          return message.split(' ').map(word => {
            if (word.match(/https?\:\/\//g)) return <a href={word}>{word} </a>;
            return word + ' ';
          });
        }
        break;
      case /^\`.*\`$/.test(message):
        return (<Highlight className='javascript'>
          {message.replace(/\`/g, '')}
        </Highlight>);
        break;
      default:
        return message;
    }
  }

}
