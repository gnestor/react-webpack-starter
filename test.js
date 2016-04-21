import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import {mount, shallow} from 'enzyme'
import expect, {
  createSpy,
  spyOn,
  isSpy
} from 'expect'
import App from './js/App'
import Message from './js/Message'

describe('App', () => {

  global.prompt = () => 'grant'
  let spec = 'test'
  let wrapper = mount(<App />)

  describe('handleChange', () => {

    it('should change the input value', () => {
      wrapper.find('input').simulate('change', {
        target: {
          value: spec
        }
      })
      expect(wrapper.find('input').props().value).toEqual(spec)
    })

  })

  describe('handleKeyDown', () => {

    it('should clear the input value', () => {
      wrapper.find('input').simulate('keyDown', {
        key: 'Enter',
        keyCode: 13,
        which: 13
      })
      expect(wrapper.find('input').props().value).toEqual('')
    })

    it('should add message to message list', () => {
      expect(wrapper.find('.message').last().text()).toEqual(spec)
    })

  })

})

describe('Message', function () {

  it('should display plain text', () => {
    const spec = {
      name: 'grant',
      text: 'test',
      time: JSON.stringify(new Date())
    }
    let wrapper = shallow(<Message
      key={1}
      message={spec}
      name='grant'
    />)
    expect(wrapper.find('.message').text()).toEqual(spec.text)
  })

  it('should display URL', () => {
    const spec = {
      name: 'grant',
      text: 'https://github.com/gnestor/react-webpack-starter',
      time: JSON.stringify(new Date())
    }
    let wrapper = shallow(<Message
      key={1}
      message={spec}
      name='grant'
    />)
    expect(wrapper.find('a').props().href).toEqual(spec.text)
  })

  it('should display image', () => {
    const spec = {
      name: 'grant',
      text: 'http://tosh.cc.com/blog/files/2009/09/f3f0_BIRD-500x375.jpg',
      time: JSON.stringify(new Date())
    }
    let wrapper = shallow(<Message
      key={1}
      message={spec}
      name='grant'
    />)
    expect(wrapper.find('img').props().src).toEqual(spec.text)
  })

  // it('should display code', () => {
  //   const spec = {
  //     name: 'grant',
  //     text: '`var one = 1`',
  //     time: JSON.stringify(new Date())
  //   }
  //   let wrapper = shallow(<Message
  //     key={1}
  //     message={spec}
  //     name='grant'
  //   />)
  //   console.log(wrapper.props().children)
  //   expect(wrapper.find('pre').text()).toEqual(spec.text.replace('`', ''))
  // })

  it('should display remove button', () => {
    const spec = {
      name: 'grant',
      text: 'test',
      time: JSON.stringify(new Date())
    }
    let wrapper = shallow(<Message
      key={1}
      message={spec}
      name='grant'
    />)
    expect(wrapper.find('.remove').length).toBeGreaterThan(0)
  })

})
