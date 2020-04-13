import React, {Component} from "react";
import styles from "./styles.module.css";

class Sidebar extends Component {
	constructor(props) {
        super(props);
		this.state = {
			processList: ['Make Collars','Hem Band','Hemming','Prepare Flaps','Inspection','Making Fronts']
		};
	}
	render() {
		return (
			<div className={styles.sidebar}>
				<ul>
					{this.state.processList.map(item => <li onClick={() => {}}>{item}</li>)}
				</ul>
			</div>
		)
	}
}

export default Sidebar;