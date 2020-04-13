import React, {Component} from "react";
import styles from "./styles.module.css";

class TableContainer extends Component {
	constructor(props) {
        super(props);
		this.state = {
		};
    }
    
    renderRows = () => {
        let table = [];
        for(let i = 0; i <= 5; i++ ){
            let children = []
            for (let j = 0; j < 5; j++) {
                children.push(<td></td>)
              }
              table.push(<tr>{children}</tr>)
        }
        return table;
    }

	render() {
		return (
			<table className={styles.gridView}>
				{this.renderRows()}
			</table>
		)
	}
}

export default TableContainer;