import React from 'react';
import { DragSource } from 'react-dnd'

const boxSource = {
	beginDrag(props) {
	  return {
		name: props.id
	  };
	},
	endDrag(props, monitor) {
	  const item = monitor.getItem();
	  const dropResult = monitor.getDropResult();
	  if (dropResult) {
		props.onDrop(monitor.getItem().name, dropResult.name);
	  }
	}
  };
export default class Card extends React.Component {
	render() {
	  return this.props.connectDragSource(
		<div>{this.props.text}</div>
	  );
	}
  }
  Card = DragSource("Card", boxSource,
	(connect, monitor) => ({
	  connectDragSource: connect.dragSource(),
	  isDragging: monitor.isDragging()
	}))(Card);