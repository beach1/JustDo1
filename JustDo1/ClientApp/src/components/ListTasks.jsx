import React, { Component } from 'react';
import SingleTask from './SingleTask';

class ListTasks extends Component {
	constructor (props) {
		super(props);
		this.state = {
			isOpen:false,
			listChecked:[]

		}
		this.changeVisible=this.changeVisible.bind(this);
	}

	changeVisible=()=>{
		this.setState((prevState)=>{isOpen:!prevState.isOpen});
	}

	render(){
		const options = { weekday: 'long', month: 'long', day: 'numeric' };
		let {tasks}=this.props;
		return(
			<li>
				<p onClick={()=>this.changeVisible()} tabIndex='-1'className='date-li'>
					{(new Date(this.props.date)).toLocaleString('en-US', options)}
					<img src={this.state.isOpen
					 ?'./img/ic_arrow_up_grey.png':'./img/ic_arrow_down.png'} alt='1'>
					</img>
				</p>
				{tasks.map((task,index)=>
				(<SingleTask checkedTask={(id)=>this.props.addChecked(id)}
				 display={this.state.isOpen}
				 key={task.id} task={task}>
				</SingleTask>))}
			</li>
		);
	}
}
export default ListTasks;