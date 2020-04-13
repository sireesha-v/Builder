import React from 'react'
import { BoardSquare } from './BoardSquare'

/** Styling properties applied to the board element */
const boardStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexWrap: 'wrap',
}
/** Styling properties applied to each square element */
const squareStyle = { width: '12.5%', height: '6.5%' }

const Board = () => {
  function renderSquare(i) {
    const x = i % 8
    const y = Math.floor(i / 8)
    return (
      <div key={i} style={squareStyle}>
        <BoardSquare x={x} y={y}>
        </BoardSquare>
      </div>
    )
  }

  const squares = []
  for (let i = 0; i < 120; i += 1) {
    squares.push(renderSquare(i))
  }
  return <div style={boardStyle}>{squares}</div>
}
export default Board
