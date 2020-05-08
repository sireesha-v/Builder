import React, { useState,useEffect, useCallback } from 'react'
import { useDrop } from 'react-dnd'
import Departments from "./../Departments/index";
const type = {
    DEPARTMENT: 'DEPARTMENT'
}
const style = {
    border: '1px solid gray',
    height: '1500px',
    width: '1500px',
    textAlign: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative'
}
const squareStyle = {
    border: '0.5px solid rgba(128, 128, 128, 0.1)',
    height: '149px',
    width: '149px',
    textAlign: 'center',
    background: 'black'
}

const TargetBox = ({}) => {
    return (
        <div style={{ ...squareStyle }}>
        </div>
    )
}
const Builder = (props) => {
    const [{ isOver, draggingColor, canDrop }, drop] = useDrop({
        accept: [type.DEPARTMENT],
        drop(item, monitor, component) {
            const coordinates = getCorrectDroppedOffsetValue(monitor.getInitialSourceClientOffset(),
                monitor.getSourceClientOffset());
            if (coordinates && coordinates.y > 0 && coordinates.y < 1500 && coordinates.x > 0 && coordinates.y < 1500) {
                let x = 0, y = 0;
                x = (Math.floor(coordinates.x / 150) * 150) + 45;
                y = (Math.floor(coordinates.y / 150) * 150) + 50;
                if (lastDroppedColor && lastDroppedColor.length) {
                    let index = lastDroppedColor.find(droppedItem => droppedItem.id === item.id);
                    if (index === 0 || index) {
                        setLastDroppedColor(lastDroppedColor.map(droppedItem => {
                            if (droppedItem.id === item.id) {
                                return { ...item, x, y };
                            }
                            return droppedItem;
                        }));
                    } else {
                        setLastDroppedColor([...lastDroppedColor, { ...item, x, y }]);
                        props.removeItemOnDrop(item.id);
                    }
                } else {
                    setLastDroppedColor([...lastDroppedColor, { ...item, x, y }]);
                    props.removeItemOnDrop(item.id);
                }
            }
            return undefined
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
            draggingColor: monitor.getItemType(),
        }),
    })
    const getCorrectDroppedOffsetValue = (initialPosition, finalPosition) => {
        // get the container (view port) position by react ref...
        const dropTargetPosition = document.getElementById("builder").getBoundingClientRect();

        const { y: finalY, x: finalX } = finalPosition;
        const { y: initialY, x: initialX } = initialPosition;

        // calculate the correct position removing the viewport position.
        // finalY > initialY, I'm dragging down, otherwise, dragging up
        const newYposition =
            finalY > initialY
                ? initialY + (finalY - initialY) - dropTargetPosition.top
                : initialY - (initialY - finalY) - dropTargetPosition.top;

        const newXposition =
            finalX > initialX
                ? initialX + (finalX - initialX) - dropTargetPosition.left
                : initialX - (initialX - finalX) - dropTargetPosition.left;

        return {
            x: newXposition,
            y: newYposition,
        };
    };
    const opacity = isOver ? 0.8 : 0.9
    let backgroundColor = '#000'
    switch (draggingColor) {
        case type.DEPARTMENT:
            backgroundColor = '#000'
            break
        default:
            break
    }
	const [lastDroppedColor, setLastDroppedColor] = useState([])
	useEffect(()=>{
		setLastDroppedColor([
			{
				"type": "DEPARTMENT",
				"name": "A",
				"start": "1",
				"end": "3",
				"id": "1",
				"x": 195,
				"y": 50
			  },
			  {
				"type": "DEPARTMENT",
				"name": "B",
				"start": "2",
				"end": "3",
				"id": "2",
				"x": 195,
				"y": 200
			  },
			  {
				  "type": "DEPARTMENT",
				  "name": "C",
				  "id": "3",
				  "x": 345,
				  "y": 50
				},
		  ])
	  }, [])
    const handleDrop = useCallback((color) => {
        setLastDroppedColor(color)
    }, [])
    const renderSquare = (i) => {
        const x = i % 8
        const y = Math.floor(i / 8)
        return (
            <TargetBox key={i}  {...props} lastDroppedColor={lastDroppedColor} onDrop={handleDrop} x={x} y={y} />
        )
    }

    const drawArrow = (start, end) => {
        let isDirUp = false, isDirDown = false, isDirLeft = false, isDirRight = false;
        let path = `${start.x + 70} ${start.y + 19} ${start.x + 105} ${start.y + 19}`;
        // handling blocks in the same column
        if (start.x === end.x) {
            if (start.y > end.y) {
                isDirUp = true;
            } else {
                isDirDown = true;
            }
            if(isDirDown) {
                path = `${path} ${end.x + 105} ${end.y - 45} ${end.x - 45} ${end.y - 45} ${end.x - 45} ${end.y + 19} ${end.x - 10} ${end.y + 19}`;
            }
            if(isDirUp) {
                path = `${path} ${end.x + 105} ${end.y + 105} ${end.x - 45} ${end.y + 105} ${end.x - 45} ${end.y + 19} ${end.x - 10} ${end.y + 19}`;
            }
        } else if (start.y === end.y) { // handling blocks in the same row
            if (start.x > end.x) {
                isDirLeft = true;
            } else {
                isDirRight = true;
            }
            if(isDirRight) {
                let distance = end.x - start.x;
                if(distance < 200){
                    path = `${path} ${end.x - 45} ${end.y + 19} ${end.x - 10} ${end.y + 19}`;
                } else {
                    path = `${path} ${start.x + 105} ${end.y - 45} ${end.x - 45} ${end.y - 45} ${end.x - 45} ${end.y + 19} ${end.x - 10} ${end.y + 19}`;
                }
            }
            if(isDirLeft) {
                path = `${path} ${start.x + 105} ${end.y + 105} ${end.x - 45} ${end.y + 105} ${end.x - 45} ${end.y + 19} ${end.x - 10} ${end.y + 19}`;
            }
        } else if (start.x > end.x && start.y < end.y) { // handling blocks below the start left
            path = `${path} ${start.x + 105} ${start.y + 105} ${end.x - 45} ${start.y + 105} ${end.x - 45} ${end.y + 19} ${end.x - 10} ${end.y + 19}`;
        } else if (start.x < end.x && start.y < end.y) { // handling blocks below the start right
            path = `${path} ${start.x + 105} ${start.y + 105} ${end.x - 45} ${start.y + 105} ${end.x - 45} ${end.y + 19} ${end.x - 10} ${end.y + 19}`;
        } else if(start.x > end.x && start.y > end.y) { // handling blocks above the start left
            path = `${path} ${start.x + 105} ${start.y - 45} ${end.x - 45} ${start.y - 45} ${end.x - 45} ${end.y + 19} ${end.x - 10} ${end.y + 19}`;
        } else if(start.x < end.x && start.y > end.y) { // handling blocks above the start right
            path = `${path} ${start.x + 105} ${start.y - 45} ${end.x - 45} ${start.y - 45} ${end.x - 45} ${end.y + 19} ${end.x - 10} ${end.y + 19}`;
        }
        return (
            <React.Fragment>
                <polyline points={path} fill="none" stroke="#BDBDBD" stroke-width="2" marker-end="url(#arrow)" markerStart="url(#circle)" />
            </React.Fragment>
        );
    }

    const squares = []
    for (let i = 0; i < 105; i++) {
        squares.push(renderSquare(i))
	}
	const getCoord = (item,block,coord) => {
		if(block === 'start')
		return item && item[coord];
		if(block === 'end'){
			const end = lastDroppedColor.find(block => block.id === item.end);
			return end && end[coord];
		}

	}
    return (<div ref={drop} id="builder" style={{ ...style, backgroundColor, opacity, }}>
            {squares}
            {lastDroppedColor && lastDroppedColor.length > 0 && lastDroppedColor.map((item, index) => {
                return <Departments key={"kjnbf" + index} department={item} styles={{ position: "absolute", top: item.y, left: item.x, zIndex: '2' }} color={type.DEPARTMENT}>{item.name}</Departments>
            })}
        <svg width="1500px" height="1500px" className="example">
            <defs>
                <marker id="arrow" markerWidth="15" markerHeight="15" refX="0" refY="3" orient="auto" markerUnits="strokeWidth" viewBox="0 0 20 20">
                    <path d="M0,0 L0,6 L9,3 z" fill="#BDBDBD" />
                </marker>
                <marker id="circle" markerWidth="2" markerHeight="2" refX="1" refY="1">
                    <circle cx="1" cy="1" r="1" stroke="none" fill="#BDBDBD" />
                </marker>
            </defs>
            {lastDroppedColor && lastDroppedColor.length > 1 && lastDroppedColor.map((item, index) => {
                if (index < lastDroppedColor.length - 1) {
                    return drawArrow({ x: getCoord(item,'start','x'), y: getCoord(item,'start','y') }, { x: getCoord(item,'end','x'), y: getCoord(item,'end','y') });
                } else {
                    return '';
                }
            })}
        </svg>
    </div>
    )
}
export default Builder
