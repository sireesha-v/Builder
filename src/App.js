import React, { useContext } from "react";
import classNames from "classnames";
import DragItem from "./DragItem";
import { Grid, GridImage, GridItem } from "./Grid";
import GridContext from "./GridContext";
import Sidebar from "./Containers/Sidebar";
import styles from "./styles.module.css";

function App() {
  const { items, moveItem } = useContext(GridContext);

  return (
    <div className={classNames(styles.container,'clearfix')}>
		<Sidebar/>
		<div className={styles.rightContainer}>

		</div>
    </div>
  );
}

export default App;
