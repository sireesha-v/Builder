import React, {Component} from "react";
import Card from "./Containers/Card.js";
import styles from "./styles.module.css";

class Sidebar extends Component {
	constructor(props) {
        super(props);
		this.state = {
			processList: [{id:1,name:'Make Collars'},{id:2,name:'Hem Band'},{id:3,name:'Hemming'},{id:4,name:'Prepare Flaps'},{id:5,name:'Inspection'},{id:6,name:'Making Fronts'}]
		};
	}
	render() {
		return (
			<div className={styles.sidebar}>
				<ul>
					{this.state.processList.map(item => <li onClick={() => {}}>
					<Card name={item.name} id={item.id}/>
					</li>)}
				</ul>
			</div>
		)
	}
}

export default Sidebar;