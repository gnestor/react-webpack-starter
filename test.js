import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import cheerio from 'cheerio';
import should from 'should'
import App from './js/App'
import Message from './js/Message'

describe('App', () => {

  global.prompt = () => 'grant';
  let spec = 'test';
  let component = TestUtils.renderIntoDocument(<App />);
  let inputElement = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
  let inputNode = ReactDOM.findDOMNode(inputElement);
  let ulElement = TestUtils.findRenderedDOMComponentWithTag(component, 'ul');
  let ulNode = ReactDOM.findDOMNode(ulElement);

  describe('handleChange', () => {

    it('should change the input value', () => {
      TestUtils.Simulate.change(inputElement, {
        target: {
          value: spec
        }
      });
      should(inputNode.value).equal(spec);
    })

  })

  describe('handleKeyDown', () => {

    it('should clear the input value', () => {
      TestUtils.Simulate.keyDown(inputElement, {
        key: 'Enter',
        keyCode: 13,
        which: 13
      });
      should(inputNode.value).equal('');
    })

    it('should add message to message list', () => {
      let messages = ulNode.querySelectorAll('.message');
      let message = messages[messages.length - 1];
      should(message.textContent).equal(spec);
    })

  })

})

describe('Message', function () {

  it('should display plain text', () => {
    const spec = {
      name: 'grant',
      message: 'test',
      time: '1:23'
    };
    let component = TestUtils.renderIntoDocument(
      <Message
        key={1}
        message={spec}
        name='grant'
      />
    );
    let element = TestUtils.findRenderedDOMComponentWithClass(
      component,
      'message'
    );
    let node = ReactDOM.findDOMNode(element);
    should(node.textContent).equal(spec.message);
  })

  it('should display URL', () => {
    const spec = {
      name: 'grant',
      message: 'https://github.com/gnestor/react-webpack-starter',
      time: '1:23'
    };
    let component = TestUtils.renderIntoDocument(
      <Message
        key={1}
        message={spec}
        name='grant'
      />
    );
    let element = TestUtils.findRenderedDOMComponentWithClass(
      component,
      'message'
    );
    let node = ReactDOM.findDOMNode(element);
    should(node.querySelector('a')).not.equal(null);
  })

  it('should display image', () => {
    const spec = {
      name: 'grant',
      message: 'http://tosh.cc.com/blog/files/2009/09/f3f0_BIRD-500x375.jpg',
      time: '1:23'
    };
    let component = TestUtils.renderIntoDocument(
      <Message
        key={1}
        message={spec}
        name='grant'
      />
    );
    let element = TestUtils.findRenderedDOMComponentWithClass(
      component,
      'message'
    );
    let node = ReactDOM.findDOMNode(element);
    should(node.querySelector('img')).not.equal(null);
  })

  it('should display code', () => {
    const spec = {
      name: 'grant',
      message: '`var one = 1;`',
      time: '1:23'
    };
    let component = TestUtils.renderIntoDocument(
      <Message
        key={1}
        message={spec}
        name='grant'
      />
    );
    let element = TestUtils.findRenderedDOMComponentWithClass(
      component,
      'message'
    );
    let node = ReactDOM.findDOMNode(element);
    should(node.querySelector('pre')).not.equal(null);
  })

  it('should display remove button', () => {
    const spec = {
      name: 'grant',
      message: '`var one = 1;`',
      time: '1:23'
    };
    let component = TestUtils.renderIntoDocument(
      <Message
        key={1}
        message={spec}
        name='grant'
      />
    );
    let element = TestUtils.findRenderedDOMComponentWithClass(
      component,
      'remove'
    );
    should(element).not.equal(null);
  })

})
