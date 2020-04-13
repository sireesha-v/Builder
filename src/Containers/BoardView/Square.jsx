import React from 'react'
const squareStyle = {
  width: '100%',
  height: '100%',
}
export const Square = ({children}) => {
  return (
    <div
      style={{
        ...squareStyle,
		border: '1px solid #262626',
		color: '#fff'
      }}
    >
      {children}
    </div>
  )
}
