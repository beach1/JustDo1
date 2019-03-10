import React, { Component } from 'react';
import PopupWrapper from './PopupWrapper';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {API, defaultState, selectAlarm, selectImportant, pad} from '../support/constants';
import {priorityToInt, alarmToInt} from '../support/switchcase';
import {TasksContext} from './TasksContext';
import {authHeader} from '../support/jwt';

class TaskFooter extends Component {
	constructor (props) {
		super(props);
		this.state = defaultState;
		  this.handleChange = this.handleChange.bind(this);
		  this.getValueAlarm=this.getValueAlarm.bind(this);
		  this.getValueImportant=this.getValueImportant.bind(this);
		  this.hourUp=this.hourUp.bind(this);
		  this.hourDown=this.hourDown.bind(this);
		  this.minuteUp=this.minuteUp.bind(this);
		  this.minuteDown=this.minuteDown.bind(this);
		  this.handleUserInput=this.handleUserInput.bind(this);
		  this.onSubmit=this.onSubmit.bind(this);
	}

	handleChange(date) {
		this.setState({
		  date: date
		});
	}

	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({[name]: value});
	}

	onSubmit(value){
		if (!this.state.name){ return }

		let state=this.state;
		let date = state.date.getFullYear()+'-'+
		pad(state.date.getMonth()+1,2)+'-'+pad(state.date.getDate(),2)
		+' '+ state.hour+':'+state.minute;
		let important = priorityToInt(state.importantValue);
		let alarm = alarmToInt(state.alarmValue);
		let task = {name: state.name, description:'Добавьте описание',
		date: date, priority: important, alarm: alarm}

		fetch(API+'/Create', {
            method: 'put',
			headers: authHeader(),
            body: JSON.stringify(task)
		}).then(()=>value.onAdd());

		this.setState({defaultState});
	}

	getValueAlarm(e){
		let value=e.currentTarget.textContent;
		this.setState({alarmValue:value});
	}

	getValueImportant(e){
		let value=e.currentTarget.textContent;
		this.setState({importantValue:value});
	}

	hourUp(){
		let current=parseInt(this.state.hour, 10)
		let hour;
		if (current==23){
			hour='00';
		} else{
			current++;
			hour = pad(current,2);
		}
		this.setState({hour:hour});
		
	}

	minuteUp(){
		let current=parseInt(this.state.minute, 10)
		let minute;
		if (current==59){
			minute='00';
		} else{
			current++;
			minute = pad(current,2);
		}
		this.setState({minute:minute});
	}

	hourDown(){
		let current=parseInt(this.state.hour, 10)
		let hour;
		if (current==0){
			hour='23';
		} else{
			current--;
			hour = pad(current,2);
		}
		this.setState({hour:hour});
	}

	minuteDown(){
		let current=parseInt(this.state.minute, 10)
		let minute;
		if (current==0){
			minute='59';
		} else{
			current--;
			minute = pad(current,2);
		}
		this.setState({minute:minute});
	}

	colorImportant(index){
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
					name='name' placeholder='Enter task title...'></input>
					<hr className='footer-line'></hr>
					<div className='dropdown-menu'>
						<PopupWrapper src={'./img/ic_calendar.png'}
						className={'footer-calendar'}
						classNameDiv='footer-dropdown'>
							<DatePicker inline
							selected={this.state.date}
							onChange={this.handleChange}
							/>
						</PopupWrapper>
						<PopupWrapper src={'./img/ic_clock.png'}
						classNameDiv='footer-dropdown select-clock'>
							<div className='clock-select'>
								<div className='part-clock'>
									<img onClick={this.hourUp}
									 src='./img/ic_arrow_up_grey.png' alt='1'></img>
									<p>{this.state.hour}</p>
									<img onClick={this.hourDown}
									 src='./img/ic_arrow_down.png' alt='1'></img>
								</div>
								<div className='part-clock'>
									<img onClick={this.minuteUp}
									 src='./img/ic_arrow_up_grey.png' alt='1'></img>
									<p>{this.state.minute}</p>
									<img onClick={this.minuteDown}
									 src='./img/ic_arrow_down.png' alt='1'></img>
								</div>
							</div>
						</PopupWrapper>
						<PopupWrapper src={'./img/ic_alarm.png'}
						classNameDiv='footer-dropdown select-alarm'>
							<div className='alarm-select'>
								{selectAlarm.map((value,index)=>
								<div onClick={this.getValueAlarm}
								key={value} name={value}
								style={this.state.alarmValue==value ? 
								{color:'#2F80ED'}:{color:'#212020'}}>{value}
								</div>)}
							</div>
						</PopupWrapper>
						<PopupWrapper src={'./img/circle.png'}
						classNameDiv='footer-dropdown select-important'>
							<div className='important-select'>
								{selectImportant.map((value,index)=>
								<div onClick={this.getValueImportant}
								key={value} name={value}
								style={this.state.importantValue==value ? 
								{color:'#2F80ED'}:{color:'#212020'}}>
									<div className={this.colorImportant(index)}></div>
									<p>{value}</p>
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