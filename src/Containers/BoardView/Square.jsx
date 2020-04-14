import React from 'react';
import classNames from 'classnames';
import styles from '../../styles.module.css';

const squareStyle = {
  width: '100%',
  height: '100%',
}
export const Square = ({data,children,style}) => {
  return (
    <div
      style={{
        ...squareStyle,
		border: '1px solid #262626',
		...style
	  }}
	  className={classNames({[styles.itemInGrid] : data && data.name})}
    >
      {data.name}
    </div>
  )
}
