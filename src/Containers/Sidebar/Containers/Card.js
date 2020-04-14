import React from 'react'
import { useDrag } from 'react-dnd'


const Card = ({name,id}) => {
	const [, drag] = useDrag({ item: { type: 'listItem',name,id},
	end: (item, monitor) => {
		const dropResult = monitor.getDropResult()
	  }})
	return (
	  <div ref={drag}>
		{name}
	  </div>
	)
  }

export default Card;
