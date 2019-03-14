import React, { Component } from 'react';
import {pad} from '../support/constants';
class TimerPopup extends Component {
	constructor (props) {
		super(props);
		this.state = {
			hour:props.hour,
			minute:props.minute,
		};
		  this.hourUp=this.hourUp.bind(this);
		  this.hourDown=this.hourDown.bind(this);
		  this.minuteUp=this.minuteUp.bind(this);
		  this.minuteDown=this.minuteDown.bind(this);
	}

//the method adds/deletes a task from array when selecting/deselecting at checkbox
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
			this.props.onChangeHour(hour);
            
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
		this.props.onChangeMinute(minute);
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
		this.props.onChangeHour(hour);
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
		this.props.onChangeMinute(minute);
	}

	render() {
		return (
			<div className='clock-select'>
                <div className='part-clock'>
                    <img onClick={this.hourUp}
                        src='./img/ic_arrow_up_grey.png' alt='1'/>
                    <p>{this.state.hour}</p>
                    <img onClick={this.hourDown}
                        src='./img/ic_arrow_down.png' alt='1'/>
                </div>
                <div className='part-clock'>
                    <img onClick={this.minuteUp}
                        src='./img/ic_arrow_up_grey.png' alt='1'/>
                    <p>{this.state.minute}</p>
                    <img onClick={this.minuteDown}
                        src='./img/ic_arrow_down.png' alt='1'/>
                </div>
			</div>
		);
	}
}
export default TimerPopup;