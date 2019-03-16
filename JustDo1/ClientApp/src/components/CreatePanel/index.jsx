import React, { Component } from 'react';
import DatePicker from "react-datepicker";

import {APITask, selectAlarm, selectPriority, pad} from '../../support/constants';
import {TasksContext} from '../../context';
import {authHeader} from '../../support/jwt';
import 'react-datepicker/dist/react-datepicker.css';
import './create-panel.css';

import Timer from '../Timer';
import Popup from '../Popup';

const initialState = {
	name: '',
	date: new Date(),
	hour: '16',
	minute: '00',
	alarmValue: '1 hour',
	priorityValue: 'Neutral'
};

class CreatePanel extends Component {
	constructor (props) {
		super(props);
		this.state = initialState;
		this.changeDate = this.changeDate.bind(this);
		this.getValueAlarm=this.getValueAlarm.bind(this);
		this.getValuePriority=this.getValuePriority.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
	}

	changeDate(date) {
		this.setState({
		  date: date
		});
	}

	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({[name]: value});
	}

	onSubmit(contextValue){
		if (!this.state.name){ return }
		let state=this.state;

		let date = state.date.getFullYear()+'-'+
		pad(state.date.getMonth()+1,2)+'-'+pad(state.date.getDate(),2)
		+' '+ state.hour+	':'+state.minute;

		let task = {name: state.name, description:'Добавьте описание',
		date: date, priority: state.priorityValue, alarm: state.alarmValue}
		fetch(APITask+'/Create', {
            method: 'put',
			headers: authHeader(),
            body: JSON.stringify(task)
		}).then(()=>contextValue.onAdd());

		this.setState({initialState});
	}

	getValueAlarm(e){
		let valueAlarm=e.currentTarget.textContent;
		this.setState({alarmValue:valueAlarm});
	}

	getValuePriority(e){
		let priorityValue=e.currentTarget.textContent;
		this.setState({priorityValue:priorityValue});
	}

	colorPriority(index){
		switch (index) {
			case 0:
				return 'circle red-priority'
			case 1:
				return 'circle yellow-priority'
			case 2:
				return 'circle blue-priority'
			case 3:
				return 'circle grey-priority'
			default:
				break;
		}
	}
	
  	render() {
		return (
		<TasksContext.Consumer>
			{value=> (
				<div className='create-panel'>
						<input
							value ={this.state.name}
							onChange={this.handleUserInput}
							name='name'
							placeholder='Enter task title...'
						/>
						<hr className='footer-line'/>
						<div className='dropdown-menu'>
							<Popup
								src='./img/ic_calendar.png'
								className={'footer-calendar'}
								classNameDiv='footer-dropdown'
							>
								<DatePicker
									inline
									selected={this.state.date}
									onChange={this.changeDate}
								/>
							</Popup>
							<Popup
								src='./img/ic_clock.png'
								classNameDiv='footer-dropdown select-clock'
							>
								<Timer
									onChangeHour={(hour)=>this.setState({hour:hour})}
									onChangeMinute={(minute)=>this.setState({minute:minute})}
									hour={this.state.hour}
									minute={this.state.minute}
								/>
							</Popup>
							<Popup
								src='./img/ic_alarm.png'
								classNameDiv='footer-dropdown select-alarm'
							>
								<div className='alarm-select'>
									{selectAlarm.map((alarm,index)=>
										<div
											onClick={this.getValueAlarm}
											key={alarm}
											name={alarm}
											style={this.state.alarmValue===alarm ? 
											{color:'#2F80ED'}:{color:'#212020'}}
										>
											{alarm}
										</div>
									)}
								</div>
							</Popup>
							<Popup
								src='./img/circle.png'
								classNameDiv='footer-dropdown select-priority'
							>
								<div className='priority-select'>
									{selectPriority.map((priority,index)=>
										<div
											onClick={this.getValuePriority}
											key={priority}
											name={priority}
											style={this.state.priorityValue===priority ? 
											{color:'#2F80ED'}:{color:'#212020'}}
										>
											<div className={this.colorPriority(index)}/>
											<p>
												{priority}
											</p>
										</div>
									)}
								</div>
							</Popup>
							<p
								onClick={()=>this.onSubmit(value)}
								className='footer-send'
							>
								Send
							</p>
						</div>
				</div>)}
		</TasksContext.Consumer>
		);
  	}
}
export default CreatePanel;