import React from 'react';

export const MainMenu = (props) => (
	<div className="main-menu">
		<p className='menu-label'>Just do</p>
		<div className='menu-h1'>
			<p>Priority</p>
			<img src='./img/arrow_down.png' alt='1'/>
		</div>
		<p className={props.selected==0?'underline-paragraph':''} 
		onClick={()=>props.onAction(0)}>All</p>
		<p className={props.selected==1?'underline-paragraph':''} 
		onClick={()=>props.onAction(1)}>Urgently</p>
		<p className={props.selected==2?'underline-paragraph':''} 
		onClick={()=>props.onAction(2)}>Important</p>
		<p className={props.selected==3?'underline-paragraph':''} 
		onClick={()=>props.onAction(3)}>Normal</p>
		<p className={props.selected==4?'underline-paragraph':''} 
		onClick={()=>props.onAction(4)}>Neutral</p>
		<img className='add-img' src='img/ic_add.png' alt='2'/>
	</div>
);