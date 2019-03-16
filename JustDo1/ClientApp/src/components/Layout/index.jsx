import React from 'react';
import './layout.css';
export const Layout = (props) => {
    return (
    <div className='start'>
		<div className="side-background">
            <img
                alt='1'
                src='./img/logo.png'
            />
	    </div>
        {props.children}
    </div>);
}