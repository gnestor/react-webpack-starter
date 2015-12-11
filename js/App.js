import React, {Component} from 'react';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      message: 'Hello world'
    };
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState);
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate', prevProps, prevState);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render() {
    return (
      <div id="helloWorld">
        <input
          id="input"
          name="message"
          type="text"
          onChange={this.handleChange}
          value={this.state.message}
        />
      <div id="display" style={{color: 'grey', fontSize: 35}}>{this.state.message}</div>
      </div>
    );
  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }

}
