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
			{/* <Grid className={styles.gridView}>
				{items.map(item => (
				<DragItem key={item.id} id={item.id} onMoveItem={moveItem}>
					<GridItem>
					<GridImage src={item.src}></GridImage>
					
				</DragItem>
				))}
			</Grid> */}

			<table className={styles.gridView}>
				<tr>
			{items.map(item => (
				<DragItem key={item.id} id={item.id} onMoveItem={moveItem}>
					<GridItem><td><img src={item.src} alt={'not available'}/></td></GridItem>
				</DragItem>
				))}
				</tr>
			</table>

		</div>
    </div>
  );
}

export default App;
