import React, {Component} from 'react';
import classNames from 'classnames';
import styles from '../../styles.module.css';

const squareStyle = {
    width: '100%',
    height: '100%'
}

class Square extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: []
		};
		this.square = React.createRef();
    }

	componentDidMount(){

	}
	componentWillReceiveProps(nextProps){
		if(nextProps.data && nextProps.data.name){
			const rect = this.square.current.getBoundingClientRect();
			console.log(rect);
		}
	}
    render() {
		const {style,data} = this.props;
        return (
            <div
                style={{
                ...squareStyle,
                border: '1px solid #262626',
                ...style
            }}
                className={classNames({
                [styles.itemInGrid]: data && data.name
            })}
                ref={this.square}>
                {data.name}
            </div>
        )
    }
}

export default Square;