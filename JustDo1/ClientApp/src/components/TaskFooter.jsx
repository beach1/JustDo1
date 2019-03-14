import React, { Component } from 'react';
import PopupWrapper from './PopupWrapper';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {APITask, selectAlarm, selectPriority, pad} from '../support/constants';
import {alarmToEnum} from '../support/switchcase';
import {TasksContext} from './TasksContext';
import {authHeader} from '../support/jwt';
import TimerPopup from './TimerPopup';

const initialState ={name:'',date: new Date(),hour:'16',minute:'00',alarmValue:'1 hour',priorityValue:'Neutral'};

class TaskFooter extends Component {
	constructor (props) {
		super(props);
		this.state = initialState;
		this.changeDate = this.changeDate.bind(this);
		this.getValueAlarm=this.getValueAlarm.bind(this);
		this.getValuePriority=this.getValuePriority.bind(this);
		this.handleUserInput=this.handleUserInput.bind(this);
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
				return 'curcle red-important'
			case 1:
				return 'curcle yellow-important'
			case 2:
				return 'curcle blue-important'
			case 3:
				return 'curcle grey-important'
			default:
				break;
		}
	}
	
  	render() {
		return (
		<TasksContext.Consumer>
		{value=> (
			<div className='add-task-footer'>
					<input value ={this.state.name} onChange={this.handleUserInput}
					name='name' placeholder='Enter task title...'/>
					<hr className='footer-line'/>
					<div className='dropdown-menu'>
						<PopupWrapper src='./img/ic_calendar.png'
						className={'footer-calendar'}
						classNameDiv='footer-dropdown'>
							<DatePicker inline
							selected={this.state.date}
							onChange={this.changeDate}
							/>
						</PopupWrapper>
						<PopupWrapper src='./img/ic_clock.png'
						classNameDiv='footer-dropdown select-clock'>
							<TimerPopup onChangeHour={(hour)=>this.setState({hour:hour})}
							 onChangeMinute={(minute)=>this.setState({minute:minute})}
							 hour={this.state.hour} minute={this.state.minute}/>
						</PopupWrapper>
						<PopupWrapper src='./img/ic_alarm.png'
						classNameDiv='footer-dropdown select-alarm'>
							<div className='alarm-select'>
								{selectAlarm.map((alarm,index)=>
								<div onClick={this.getValueAlarm}
								key={alarm} name={alarm}
								style={this.state.alarmValue==alarm ? 
								{color:'#2F80ED'}:{color:'#212020'}}>{alarm}
								</div>)}
							</div>
						</PopupWrapper>
						<PopupWrapper src='./img/circle.png'
						classNameDiv='footer-dropdown select-important'>
							<div className='important-select'>
								{selectPriority.map((priority,index)=>
								<div onClick={this.getValuePriority}
								key={priority} name={priority}
								style={this.state.priorityValue==priority ? 
								{color:'#2F80ED'}:{color:'#212020'}}>
									<div className={this.colorPriority(index)}></div>
									<p>{priority}</p>
								</div>)}
							</div>
						</PopupWrapper>
						<p onClick={()=>this.onSubmit(value)} className='footer-send'>Send</p>
					</div>
			</div>)}
		</TasksContext.Consumer>
		);
  	}
}
export default TaskFooter;