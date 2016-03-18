'use strict';
import { Draggable } from './components/index';
import React from 'react';
import ReactDOM from 'react-dom';

const props = {
  x: 10,
  y: 100,
  style: {
    border: '1px solid red',
    width: 150,
    height: 150
  },
  onDrag: (e) => console.log('on-drag', e),
  onDragStart: (e) => console.log('on-drag-start'),
  onDragStop: (e) => console.log('on-drag-stop')
};

ReactDOM.render((
  <Draggable {...props}>
    <h1>Move me</h1>
  </Draggable>
), document.getElementById('hello'));
