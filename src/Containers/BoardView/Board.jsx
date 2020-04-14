import React, {Component} from "react";
import {BoardSquare} from './BoardSquare';
import {useDrop} from 'react-dnd'

/** Styling properties applied to the board element */
const boardStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap'
}
/** Styling properties applied to each square element */
const squareStyle = {
    width: '12.5%',
    height: '6.5%'
}

class Board extends Component {
	constructor(props) {
        super(props);
		this.state = {
			squares: []
		};
	}

	componentDidMount(){
		const squares = [];
		for (let i = 0; i < 120; i += 1) {
			squares.push({name: null,id:null});
		}
		this.setState({
			squares
		});
	}
	handleDrop = (item,i) => {
		console.log("dede",this.state.squares);
		const squares = this.state.squares.slice();
		squares[i] = {
			name: item.name,
			id: item.id
		};
		this.setState({
			squares
		});
	}
	renderSquare = (i) => {
		return this.state.squares.map((item,i) => {
			return (
				<div key={i} style={squareStyle}>
					<BoardSquare onDrop={(item) => this.handleDrop(item,i)} data={item}/>
				</div>
			)
		});
    }
	render() {
		const {squares} = this.state;
		return (
			<div style={boardStyle}>{this.renderSquare()}</div>
		)
	}
}

export default Board;