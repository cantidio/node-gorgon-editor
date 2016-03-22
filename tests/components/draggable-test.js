'use strict';
jest.unmock('../../src/components/draggable.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Draggable from '../../src/components/draggable.jsx';

describe('Draggable', function () {
  const events = [
    { clientX: 10, clientY: 0 },
    { clientX: 11, clientY: 1 },
    { clientX: 12, clientY: 2 },
    { clientX: 13, clientY: 3 }
  ];
  beforeEach(function () {
    this.props = {
      style: { border: '1px solid red', width: 150, height: 150 },
      onDrag: jest.fn(),
      onDragStart: jest.fn(),
      onDragStop: jest.fn()
    };
    this.elem = TestUtils.renderIntoDocument((
      <Draggable {...this.props}>
        <h1>Child</h1>
      </Draggable>
    ));
    this.selectDOM = () => ReactDOM.findDOMNode(this.elem);
  });

  it('should render a div as the main element', function () {
    const elementNode = this.selectDOM();
    expect(elementNode.tagName).toEqual('DIV');
  });

  it('should render the correct number of children inside the main element', function () {
    const elementNode = this.selectDOM();
    expect(elementNode.children.length).toBe(1);
  });

  it('should render the correct children inside the main element', function () {
    const elementNode = this.selectDOM();
    expect(elementNode.children[0].tagName).toEqual('H1');
  });

  it('should trigger the onDragStart on MouseDown', function () {
    TestUtils.Simulate.mouseDown(this.elem.refs.container, events[0]);

    expect(this.elem.props.onDragStart.mock.calls[0]).toEqual([this.elem.state]);
  });

  it('should trigger the onDragStop on MouseUp', function () {
    TestUtils.Simulate.mouseDown(this.elem.refs.container, events[0]);
    TestUtils.Simulate.mouseUp(this.elem.refs.container, events[0]);

    expect(this.elem.props.onDragStop.mock.calls[0]).toEqual([this.elem.state]);
  });

  it('should trigger the onDragStop on MouseOut', function () {
    TestUtils.Simulate.mouseDown(this.elem.refs.container, events[0]);
    TestUtils.Simulate.mouseOut(this.elem.refs.container, events[0]);

    expect(this.elem.props.onDragStop.mock.calls[0]).toEqual([this.elem.state]);
  });

  it('should trigger the onDrag on MouseMove if mouse is down', function () {
    TestUtils.Simulate.mouseDown(this.elem.refs.container, events[0]);
    TestUtils.Simulate.mouseMove(this.elem.refs.container, events[1]);

    expect(this.elem.props.onDrag.mock.calls[0]).toEqual([this.elem.state]);
  });

  it('should not trigger the onDragStop on MouseOut or MouseUp if Mouse was not down', function () {
    TestUtils.Simulate.mouseUp(this.elem.refs.container, events[0]);
    TestUtils.Simulate.mouseOut(this.elem.refs.container, events[0]);

    expect(this.elem.props.onDragStop.mock.calls[0]).toBe(undefined);
  });

  it('should not trigger the onDrag on MouseMove if the mouse is not down', function () {
    TestUtils.Simulate.mouseMove(this.elem.refs.container, events[0]);

    expect(this.elem.props.onDrag.mock.calls[0]).toBe(undefined);
  });

  it('should update the element position on MouseMove', function () {
    const [startX, startY] = [this.elem.state.x, this.elem.state.y];
    let [offsetX, offsetY] = [0, 0];

    TestUtils.Simulate.mouseDown(this.elem.refs.container, events[0]);

    for (var i = 1; i < events.length; ++i) {
      offsetX += events[i].clientX - events[i - 1].clientX;
      offsetY += events[i].clientY - events[i - 1].clientY;
      TestUtils.Simulate.mouseMove(this.elem.refs.container, events[i]);
    }

    expect(this.elem.state.x).toEqual(startX + offsetX);
    expect(this.elem.state.y).toEqual(startY + offsetY);
  });

});
