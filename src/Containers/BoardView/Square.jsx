import React from 'react'
const squareStyle = {
  width: '100%',
  height: '100%',
}

const data = {
  width: '30px',
  height: '30px',
  border: '1px solid white',
  display: 'block',
  margin: '0 auto'
}


export const Square = ({children}) => {
  return (
    <div
      style={{
        ...squareStyle,
		border: '1px solid #262626',
		color: '#fff'
      }}
    >{children}
    </div>
  )
}
