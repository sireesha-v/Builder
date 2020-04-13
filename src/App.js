
import React from 'react'
import classNames from "classnames";
import DragItem from "./DragItem";
import Board from "./Containers/BoardView/Board"
import Sidebar from "./Containers/Sidebar";
import styles from "./styles.module.css";

function App() {
  return (
    <div className={classNames(styles.container,'clearfix')}>
		<Sidebar/>
		<div className={styles.rightContainer}>
			<Board/>
		</div>
    </div>
  );
}

export default App;
