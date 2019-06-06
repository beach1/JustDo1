import React, { Component } from 'react';
import { authHeader } from '../../support/jwt';
import { APITask } from '../../support/constants';
import moment from 'moment';
import TextareaAutosize from 'react-autosize-textarea';
import './task.css';

import styled, { css } from 'styled-components';

import { Priority } from '../Priority';
import { TasksContext } from '../../context';

const TrashBinWrapper = styled.div`
	position: sticky;

	right: 5%;

	display: flex;
	justify-items: center;
	align-items: center;
`;

const TrashBin = styled.img`
	opacity: 0.1;

	&:hover {
		cursor: pointer;
		opacity: 1;
	}
`;

class Task extends Component {
	constructor(props) {
		super(props);
		this.state = {
			description: props.task.description
		}
		this.onInputChange = this.onInputChange.bind(this);
		this.updateTask = this.updateTask.bind(this);
	}

	onInputChange(e) {
		const name = e.target.name;
		this.setState({ [name]: e.target.value });
	}

	updateTask() {
		let { task } = this.props;
		if (task.description === this.state.description) {
			return false;
		}
		task.description = this.state.description;
		fetch(APITask, {
			method: 'put',
			headers: authHeader(),
			body: JSON.stringify(task)
		}).then(response => console.log(response.status))
	}

	removeTask = async (callback) => {
		await fetch(`${APITask}\\${this.props.task.id}`, {
			method: 'delete',
			headers: authHeader()
		});

		callback();
	}

	toggleTask = async (callback) => {
		await fetch(`${APITask}\\${this.props.task.id}\\toggle`, {
			method: 'get',
			headers: authHeader()
		});

		callback();
	}

	render() {
		let task = this.props.task;
		return (
			<TasksContext.Consumer>
				{value => (
					<div className='task'>
						<div className='select-task'>
							<input
								checked={task.checked}
								onChange={() => this.toggleTask(value.onDelete)}
								type="checkbox"
							/>
							<label htmlFor="task-select" />
						</div>
						<div className='task-fields'>
							<p>
								{task.name}
							</p>
							<TextareaAutosize
								ref={(ref) => { this.node = ref }}
								name='description'
								defaultValue={this.state.description}
								onChange={this.onInputChange}
								onBlur={this.updateTask}
							/>
							<div className='task-status'>
								<Priority priority={task.priority} />
								<img
									alt='1'
									src='./img/ic_clock.png'
								/>
								{moment(task.date).format('HH:mm')}
								<img
									alt='1'
									src='./img/ic_alarm.png'
								/>
								<p>{task.alarm}</p>
							</div>
						</div>
						<TrashBinWrapper>
							<TrashBin
								src='/img/ic_trash.png'
								onClick={() => this.removeTask(value.onDelete)}
							/>
						</TrashBinWrapper>
					</div>
				)}
			</TasksContext.Consumer>
		);
	}
}
export default Task;