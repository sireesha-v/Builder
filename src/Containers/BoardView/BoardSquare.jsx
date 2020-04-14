import React from 'react'
import { useDrop } from 'react-dnd'
import { Square } from './Square'

export const BoardSquare = ({ x, y, children }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'card',
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  })
  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Square>{children}
      </Square>
    </div>
  )
}
