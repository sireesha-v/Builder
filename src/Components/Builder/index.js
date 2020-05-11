import React, { useState, useCallback, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import Departments from "./../Departments/index";
import { Modal, Select } from "antd";
const { Option } = Select;
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

const TargetBox = ({ }) => {
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
            if (coordinates && coordinates.y > 0 && coordinates.y < 1500 && coordinates.x > 0 && coordinates.x < 1500) {
                let x = 0, y = 0;
                x = (Math.floor(coordinates.x / 150) * 150) + 45;
                y = (Math.floor(coordinates.y / 150) * 150) + 50;
                if (lastDroppedColor && lastDroppedColor.length && x && y) {
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
    const [connections, setConnections] = useState([]);
    const [highLight, setHighLight] = useState({});
    const [showModal, handleModal] = useState(false);
    const [selectedDepartment, setDepartment] = useState(null);
    const [connectTo, setConnectItem] = useState(null);
    const [lastDroppedColor, setLastDroppedColor] = useState([])
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
    const renderSquare = (i) => {
        const x = i % 8
        const y = Math.floor(i / 8)
        return (
            <TargetBox key={i}  {...props} lastDroppedColor={lastDroppedColor} x={x} y={y} />
        )
    }

    const drawArrow = (start, end, highLight) => {
        let isDirUp = false, isDirDown = false, isDirLeft = false, isDirRight = false;
        let path = `${start.x + 70} ${start.y + 19} ${start.x + 105} ${start.y + 19}`;
        let stroke = '#BDBDBD';
        let zIndex = '0';
        let circle = `url(#circle)`,
            arrow = `url(#arrow)`;
        // handling blocks in the same row
        if (start.x === end.x) {
            if (start.y > end.y) {
                isDirUp = true;
            } else {
                isDirDown = true;
            }
            if (isDirDown) {
                path = `${path} ${end.x + 105} ${end.y - 45} ${end.x - 45} ${end.y - 45} ${end.x - 45} ${end.y + 19} ${end.x - 10} ${end.y + 19}`;
            }
            if (isDirUp) {
                path = `${path} ${end.x + 105} ${end.y + 105} ${end.x - 45} ${end.y + 105} ${end.x - 45} ${end.y + 19} ${end.x - 10} ${end.y + 19}`;
            }
        } else if (start.y === end.y) { // handling blocks in the same row
            if (start.x > end.x) {
                isDirLeft = true;
            } else {
                isDirRight = true;
            }
            if (isDirRight) {
                let distance = end.x - start.x;
                if (distance < 200) {
                    path = `${path} ${end.x - 45} ${end.y + 19} ${end.x - 10} ${end.y + 19}`;
                } else {
                    path = `${path} ${start.x + 105} ${end.y - 45} ${end.x - 45} ${end.y - 45} ${end.x - 45} ${end.y + 19} ${end.x - 10} ${end.y + 19}`;
                }
            }
            if (isDirLeft) {
                path = `${path} ${start.x + 105} ${end.y + 105} ${end.x - 45} ${end.y + 105} ${end.x - 45} ${end.y + 19} ${end.x - 10} ${end.y + 19}`;
            }
        } else if (start.x > end.x && start.y < end.y) { // handling blocks below the start left
            path = `${path} ${start.x + 105} ${start.y + 105} ${end.x - 45} ${start.y + 105} ${end.x - 45} ${end.y + 19} ${end.x - 10} ${end.y + 19}`;
        } else if (start.x < end.x && start.y < end.y) { // handling blocks below the start right
            path = `${path} ${start.x + 105} ${start.y + 105} ${end.x - 45} ${start.y + 105} ${end.x - 45} ${end.y + 19} ${end.x - 10} ${end.y + 19}`;
        } else if (start.x > end.x && start.y > end.y) { // handling blocks above the start left
            path = `${path} ${start.x + 105} ${start.y - 45} ${end.x - 45} ${start.y - 45} ${end.x - 45} ${end.y + 19} ${end.x - 10} ${end.y + 19}`;
        } else if (start.x < end.x && start.y > end.y) { // handling blocks above the start right
            path = `${path} ${start.x + 105} ${start.y - 45} ${end.x - 45} ${start.y - 45} ${end.x - 45} ${end.y + 19} ${end.x - 10} ${end.y + 19}`;
        }
        if (highLight && highLight.start && highLight.end && highLight.highLightType === "line") {
            if (highLight.start.id === start.id && highLight.end.id === end.id) {
                stroke = 'red';
                circle = `url(#redCircle)`;
                arrow = `url(#redArrow)`;
                zIndex = '5';
            }
        }
        if (highLight && highLight.start && highLight.highLightType == "box") {
            if (highLight.start.id === start.id || highLight.start.id === end.id) {
                stroke = 'red';
                circle = `url(#redCircle)`;
                arrow = `url(#redArrow)`;
                zIndex = '5';
            }
        }
        return (
            <React.Fragment>
                <polyline onMouseEnter={(event) => {
                    setHighLight({ highLightType: 'line', start, end })
                }} onMouseOut={() => {
                    setHighLight({});
                }} points={path} fill="none" z-index={zIndex} stroke={stroke} strokeWidth="2" markerEnd={arrow} markerStart={circle} />
            </React.Fragment>
        );
    }

    const handleClick = (item) => {
        setDepartment(item);
        handleModal(true);
    }

    const handleChange = (value) => {
        setConnectItem(lastDroppedColor.find(item => value === item.id));
    }

    const handleOk = () => {
        setConnections([...connections, { start: selectedDepartment, end: connectTo }]);
        handleModal(false);
    }

    useEffect(() => {
        // Update the document title using the browser API
        setConnections(connections.map(item => {
            lastDroppedColor.forEach(department => {
                if (item.start.id === department.id) {
                    item.start = department;
                }
                if (item.end.id === department.id) {
                    item.end = department;
                }
            })
            return item;
        }))
    }, [lastDroppedColor]);

    const squares = []
    for (let i = 0; i < 150; i++) {
        squares.push(renderSquare(i))
    }
    const hanleHighLightBox = ({ id, y, x, name }) => {
        let highLightStyle = { position: "absolute", top: y, left: x, zIndex: '2' };
        if (highLight && highLight.start && highLight.end && highLight.highLightType === "line") {
            if (highLight.start.id === id || highLight.end.id === id || highLight.start.id === id || highLight.end.id === id) {
                highLightStyle.border = '1px solid red';
                highLightStyle.backgroundColor = 'red';
            }
        }
        if (highLight && highLight.start && highLight.highLightType == "box") {
            if (highLight.start.id === id || highLight.start.id === id) {
                highLightStyle.border = '1px solid red';
                highLightStyle.backgroundColor = 'red';
            }
        }
        if(props.searchString && props.searchString.toLowerCase() == name.toLowerCase()) {
            highLightStyle.backgroundColor = 'red';
        }
        return highLightStyle;
    }

    return (<div id="builder" style={{ ...style, backgroundColor, opacity, }}>
        {showModal && lastDroppedColor && lastDroppedColor.length > 0 && <Modal
            title={`Connection ${selectedDepartment && selectedDepartment.name} To`}
            visible={showModal}
            onOk={handleOk}
            onCancel={() => {
                setDepartment(null);
                handleModal(false);
            }}
        >
            <Select style={{ width: 120 }} onChange={handleChange}>
                {lastDroppedColor && lastDroppedColor.length > 0 && lastDroppedColor.filter(item => item.id !== selectedDepartment.id).map(item => <Option value={item.id}>{item.name}</Option>)}
            </Select>
        </Modal>}
        {squares}
        {lastDroppedColor && lastDroppedColor.length > 0 && lastDroppedColor.map((item, index) => {
            return <Departments key={"kjnbf" + index} setHighLight={setHighLight} handleClick={handleClick} department={item} styles={hanleHighLightBox(item)} color={type.DEPARTMENT}>{item.name}</Departments>
        })}
        <svg ref={drop} width="1500px" height="1500px" className="example">
            <defs>
                <marker id="arrow" markerWidth="15" markerHeight="15" refX="0" refY="3" orient="auto" markerUnits="strokeWidth" viewBox="0 0 20 20">
                    <path d="M0,0 L0,6 L9,3 z" fill="#BDBDBD" />
                </marker>
                <marker id="circle" markerWidth="2" markerHeight="2" refX="1" refY="1">
                    <circle cx="1" cy="1" r="1" stroke="none" fill="#BDBDBD" />
                </marker>
                <marker id="redArrow" markerWidth="15" markerHeight="15" refX="0" refY="3" orient="auto" markerUnits="strokeWidth" viewBox="0 0 20 20">
                    <path d="M0,0 L0,6 L9,3 z" fill="red" />
                </marker>
                <marker id="redCircle" markerWidth="2" markerHeight="2" refX="1" refY="1">
                    <circle cx="1" cy="1" r="1" stroke="none" fill="red" />
                </marker>
            </defs>
            {connections && connections.length > 0 && connections.map((item, index) => {
                return drawArrow(item.start, item.end, highLight);
            })}
            {connections.filter((item) => {
                if (highLight && highLight.start && highLight.end && highLight.highLightType === "line") {
                    if (highLight.start.id === item.start.id && highLight.end.id === item.end.id) {
                        console.log('entered');
                        return true;
                    }
                }
                if (highLight && highLight.start && highLight.highLightType == "box") {
                    if (highLight.start.id === item.start.id || highLight.start.id === item.end.id) {
                        return true;
                    }
                }
                return false;
            }).map((item, index) => {
                return drawArrow(item.start, item.end, highLight);
            })}
        </svg>
    </div>
    )
}
export default Builder
