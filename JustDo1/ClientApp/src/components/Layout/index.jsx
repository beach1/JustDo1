import React from 'react';
import styles from './layout.module.css';
export const Layout = (props) => {
    return (
    <div className={styles.start}>
		<div className={styles['side-background']}>
            <img
                alt='1'
                src='./img/logo.png'
            />
	    </div>
        {props.children}
    </div>);
}