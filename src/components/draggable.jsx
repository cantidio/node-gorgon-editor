import React from 'react';

export default class Draggable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      eventX: 0,
      eventY: 0,
      x: props.x,
      y: props.y,
    };
  }
  render() {
    return (
      <div
        ref='container'
        style={this._style}
        onMouseDown={(e) => this._handleDragStart(e)}
        onMouseMove={(e) => this._handleDrag(e)}
        onMouseOut={(e) => this._handleDragStop(e)}
        onMouseUp={(e) => this._handleDragStop(e)}
      >
        {this.props.children}
      </div>
    );
  }
  _handleDragStart(e) {
    const {eventX,eventY} = this._eventPosition(e);
    this.setState({
      dragging: true,
      eventX,
      eventY
    }, () => this.props.onDragStart(this.state));
    e.stopPropagation();
    e.preventDefault();
  }
  _handleDragStop(e) {
    if(!this.state.dragging) return;
    this.setState({
      dragging: false
    }, ()=> this.props.onDragStop(this.state));
    e.stopPropagation();
    e.preventDefault();
  }
  _handleDrag(e) {
    if(!this.state.dragging) return;
    const {eventX,eventY} = this._eventPosition(e);
    const {x,y} = this._deltaPosition(eventX,eventY);

    this.setState({
      x,
      y,
      eventX,
      eventY
    }, ()=> this.props.onDrag(this.state));
    e.stopPropagation();
    e.preventDefault();
  }
  _deltaPosition(x,y) {
    return {
      x: this.state.x + x - this.state.eventX,
      y: this.state.y + y - this.state.eventY
    };
  }
  _eventPosition(e) {
    let {clientX,clientY} = e;
    let {stepX,stepY} = this.props;

    return {
      eventX: Math.round(clientX / stepX) * stepX,
      eventY: Math.round(clientY / stepY) * stepY
    };
  }
  get _style() {
    return Object.assign({},this.props.style,{
      top: this.state.y,
      left: this.state.x,
      display: 'block',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      userSelect: 'none'
    });
  }
}

Draggable.defaultProps = {
  x: 0,
  y: 0,
  stepX: 1.0,
  stepY: 1.0,
  onDrag: ()=>{},
  onDragStart: ()=>{},
  onDragStop:  ()=>{}
};

Draggable.propTypes = {
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
  stepX: React.PropTypes.number.isRequired,
  stepY: React.PropTypes.number.isRequired,
  onDragStart: React.PropTypes.func.isRequired,
  onDragStop: React.PropTypes.func.isRequired,
  onDrag: React.PropTypes.func.isRequired
};
