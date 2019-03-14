import React, { Component } from 'react';
import {StartBg} from './StartBg';

export const StartLayout = (props)=>{
    return (
    <div className="start-page">
		<StartBg></StartBg>
		<div className='valid-part'>
            {props.children}
        </div>
    </div>);
}