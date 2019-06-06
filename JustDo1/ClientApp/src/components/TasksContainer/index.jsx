import React, { Component } from 'react';

import { TasksContext } from '../../context';
import './tasks-container.css';

import Task from '../Task';
import AccordionTasks from '../AccordionTasks';
import moment from 'moment';

class TasksContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listChecked: []
		}
		this.addChecked = this.addChecked.bind(this);
	}

	//the method adds/deletes a task from array when selecting/deselecting at checkbox
	addChecked(id) {
		let { listChecked } = this.state;
		let index = listChecked.indexOf(id);
		if (index === -1) {
			listChecked.push(id);
		} else {
			listChecked.splice(index, 1);
		}
		this.setState({ listChecked: listChecked });
	}

	render() {
		return (
			<TasksContext.Consumer>
				{value => (
					<div className='tasks-container'>
						<ul>
							{value.dates.map((date) =>
								<AccordionTasks
									date={date}
								>
									{value.tasks
										.filter(task => moment(task.date, 'DD.MM.YYYY').isSame(moment(date, 'DD.MM.YYYY'), 'day'))
										.map(task => (
											<Task
												checkedTask={(id) => this.addChecked(id)}
												key={task.id}
												task={task}
											/>
										))
									}
								</AccordionTasks>
							)
							}
						</ul>
					</div>
				)}
			</TasksContext.Consumer>
		);
	}
}
export default TasksContainer;