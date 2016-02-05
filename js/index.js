import React from 'react';
import ReactDOM from 'react-dom';
import Store from './Store';
import Messages from './Messages';
import '../css/style.css';

ReactDOM.render((
  <Store>
    <Messages />
  </Store>
), document.getElementById('app'));
