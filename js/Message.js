import React, {Component} from 'react'
import Highlight from 'react-highlight'
import moment from 'moment'
import '../css/github-gist.css'

export default class Message extends Component {

  constructor(props) {
    super(props)
    this.transform = this.transform.bind(this)
    this.onRemove = this.onRemove.bind(this)
  }

  render() {
    let {
      name,
      text,
      time
    } = this.props.message
    let me = this.props.name
    // let timestamp = new Date(JSON.parse(time))
    let timestamp = moment(JSON.parse(time)).fromNow(true)
    let remove
    let message = this.transform(text)
    if (name === me) remove = <span className="remove" onClick={this.onRemove}>✖</span>
    return (
      <li className="item">
        <div>
          <span className="name">{name}: </span>
          <span className="message">{message}</span>
        </div>
        <div>
          <span className="time">{timestamp}</span>
          {remove}
        </div>
      </li>
    )
  }

  onRemove(event) {
    this.props.handleRemove(this.props.message)
  }

  transform(message) {
    switch (true) {
      // If message contains a URL
      case /https?\:\/\//.test(message):
        // If URL is an image
        if (/\.jpg|png|gif$/.test(message)) {
          return message.split(' ').map((word, index) => {
            if (word.match(/\.jpg|png|gif$/)) return <img key={index} src={word} width={300} />
            return word + ' '
          })
        } else {
          return message.split(' ').map((word, index) => {
            if (word.match(/https?\:\/\//g)) return <a key={index} href={word}>{word} </a>
            return word + ' '
          })
        }
        break
      // IF message contains code
      case /^\`.*\`$/.test(message):
        return (<Highlight className='javascript'>
          {message.replace(/\`/g, '')}
        </Highlight>)
        break
      default:
        return message
    }
  }

}

moment.locale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s:  '1s',
    ss: '%ss',
    m:  '1m',
    mm: '%dm',
    h:  '1h',
    hh: '%dh',
    d:  '1d',
    dd: '%dd',
    M:  '1m',
    MM: '%dm',
    y:  '1y',
    yy: '%dy'
  }
  })
