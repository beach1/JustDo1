import React, { Component } from 'react';

import {TasksContext} from '../../context';
import {authHeader} from '../../support/jwt';
import {APITask} from '../../support/constants';
import './tasks-container.css';

import Task from '../Task';
import AccordionTasks from '../AccordionTasks';

class TasksContainer extends Component {
	constructor (props) {
		super(props);
		this.state = {
			listChecked:[]
		}
		this.addChecked=this.addChecked.bind(this);
		this.removeCheckedTasks=this.removeCheckedTasks.bind(this);
	}

//the method adds/deletes a task from array when selecting/deselecting at checkbox
	addChecked(id){
		let {listChecked}=this.state;
		let index = listChecked.indexOf(id);
		if(index === -1){
			listChecked.push(id);
		} else{
			listChecked.splice(index, 1);
		}
		this.setState({listChecked:listChecked});
	}

	removeCheckedTasks(value){
		let {listChecked}=this.state;
		fetch(APITask, {
			method: 'delete',
			headers: authHeader(),
			body: JSON.stringify(listChecked)
		}).then(()=>value.onDelete());
		this.setState({listChecked:[]});
	}
	
//this method groups tasks by date
	listTasks = (value) => (
		value.dates.map((date) =>
			<AccordionTasks
				date={date}
			>
				{value.tasks.filter((task)=> task.date === date).map((task)=> (
					<Task
						checkedTask={(id)=>this.addChecked(id)}
						key={task.id}
						task={task}
					/>
				))}	
            </AccordionTasks>
		)
	);

	render() {
        let {listChecked}=this.state;
        return(
			<TasksContext.Consumer>
				{value=> (
					<div className='tasks-container'>
						<img
							onClick={()=>this.removeCheckedTasks(value)}
							className={listChecked.length>0?'trash':'trash hidden-trash'}
							src='./img/ic_trash.png' alt='1'
						/>
							<ul>
								{this.listTasks(value)}
							</ul>
					</div>
				)}
			</TasksContext.Consumer>
        );
    }
}
export default TasksContainer;