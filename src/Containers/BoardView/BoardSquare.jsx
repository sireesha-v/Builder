import React from 'react'
import {useDrop} from 'react-dnd'
import Square from './Square'

export const BoardSquare = ({onDrop,data}) => {

    const [
        {
            isOver,
            canDrop
        },
        drop] = useDrop({
        accept: 'listItem',
        drop: onDrop,
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    })
    return (
        <div
            ref={drop}
            style={{
            position: 'relative',
            width: '100%',
            height: '100%'
        }}>
            <Square
				data={data}
                style={isOver
                ? {
                    border: '1px dashed grey'
                }
                : {}}/>
        </div>
    )
}
