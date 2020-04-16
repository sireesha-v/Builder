import React, {Component} from "react";
import styles from "./styles.module.css";

class SampleCode extends Component {
	constructor(props) {
        super(props);
		this.state = {
		};
    }
    
    handleClick = (event) => {
        console.log(event.clientX,'sadasdasd',event.clientY)
    }

	render() {
		return (
			<div className={styles.container}>
				<div className={styles.divOne} onClick={(e) => this.handleClick(e)}></div>
                <div className={styles.divTwo} onClick={(e) => this.handleClick(e)}></div>
                <svg height="500" width="500">
                <polyline points="100 203,800 203" fill="none" stroke="red" strokeWidth="3"/>
                </svg>
			</div>
		)
	}
}

export default SampleCode;