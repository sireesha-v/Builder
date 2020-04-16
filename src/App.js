
import React from 'react'
import classNames from "classnames";
import Board from "./Containers/BoardView/Board"
import Sidebar from "./Containers/Sidebar";
import styles from "./styles.module.css";
import SampleCode from './Containers/SampleCode';

function App() {
  return (
    <div className={classNames(styles.container,'clearfix')}>
		<Sidebar/>
		<div className={styles.rightContainer}>
			<Board/>
      {/* <SampleCode/> */}
		</div>
    </div>
  );
}

export default App;
