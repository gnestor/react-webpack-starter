import React, {Component} from 'react';

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
    let transformed = message;
    switch (true) {
      // case /\.jpg|png|gif$/.test(message):
      //   transformed = message.split(' ').map(word => {
      //     if (word.match(/\.jpg|png|gif$/)) return <img src={word} width={300} />;
      //     return word + ' ';
      //   });
      //   break;
      case /https?\:\/\//.test(message):
        if (/\.jpg|png|gif$/.test(message)) {
          transformed = message.split(' ').map(word => {
            if (word.match(/\.jpg|png|gif$/)) return <img src={word} width={300} />;
            return word + ' ';
          });
        } else {
          transformed = message.split(' ').map(word => {
            if (word.match(/https?\:\/\//g)) return <a href={word}>{word} </a>;
            return word + ' ';
          });
        }
        break;

    }
    return transformed;
  }

}
