var React = require('react');

var App = React.createClass({

  getInitialState() {
    return {
      message: 'Hello world'
    };
  },

  componentWillMount: function() {
    console.log('componentWillMount');
  },

  componentDidMount: function() {
    console.log('componentDidMount');
  },

  componentWillReceiveProps: function(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState);
    return true;
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.log('componentWillUpdate', nextProps, nextState);
  },

  componentDidUpdate: function(prevProps, prevState) {
    console.log('componentDidUpdate', prevProps, prevState);
  },

  componentWillUnmount: function() {
    console.log('componentWillUnmount');
  },

  render: function() {
    return (
      <div className="container">
        <div className="display" style={{
            color: 'grey',
            fontSize: 35
          }}>{this.state.message}</div>
        <input
          className="input"
          type="text"
          onChange={this.handleChange}
          value={this.state.message}
        />
      </div>
    );
  },

  handleChange: function(event) {
    this.setState({message: event.target.value});
  }

});

module.exports = App;
