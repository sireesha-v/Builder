import React, { useState, useCallback, useMemo } from 'react'
import { useDrag } from 'react-dnd'
const type =  {
    DEPARTMENT: 'DEPARTMENT'
}
const style = {
  border: '1px solid gray',
  padding: '0.5rem',
  width: "50px",
  color: 'white'
}
const Departments = ({ color, children, department, styles={} }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: `${color}`, ...department },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const containerStyle = useMemo(
    () => ({
      ...style,
      ...styles,
      backgroundColor: "#3C3C3C",
      opacity: isDragging ? 0.4 : 1,
    }),
    [isDragging],
  )
  return (
    <div ref={drag} style={containerStyle}>
      {children}
    </div>
  )
}
export default Departments;
