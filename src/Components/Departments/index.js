import React, { useState, useCallback, useMemo } from 'react'
import { useDrag } from 'react-dnd'
const type =  {
    DEPARTMENT: 'DEPARTMENT'
}
const style = {
  border: '1px solid gray',
  padding: '0.5rem',
  width: "70px",
  color: 'white'
}
const Departments = ({ color, children, department, styles={}, handleClick = f => f, setHighLight = f => f }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: `${color}`, ...department },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const containerStyle = useMemo(
    () => ({
      ...style,
      backgroundColor: "#3C3C3C",
      opacity: isDragging ? 0.4 : 1,
      ...styles,
    }),
    [isDragging, styles],
  )
  return (
    <div ref={drag}  onMouseEnter={() => {
      setHighLight({highLightType: 'box', start: department})
  }} onMouseOut={() => {
      setHighLight({});
  }}  onClick={() => {
    handleClick(department)
  }} style={containerStyle}>
      {children}
    </div>
  )
}
export default Departments;
