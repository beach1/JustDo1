import React, { Component } from 'react';
import {authHeader} from '../../support/jwt';
import {alarmToString,priorityToString} from '../../support/switchcase';
import {APITask} from '../../support/constants';
import moment from 'moment';
import './task.css';

class Task extends Component {
    constructor (props) {
        super(props);
        this.state = {
          description:props.task.description
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.updateTask=this.updateTask.bind(this);
    }

    onInputChange(e) {
        const name = e.target.name;
        this.setState({ [name]: e.target.value });
    }

    updateTask(){
        let {task} = this.props;
        if(task.description===this.state.description){
            return false;
        }
        task.description = this.state.description;
        fetch(APITask, {
            method: 'put',
            headers: authHeader(),
            body: JSON.stringify(task)
        }).then(response=>console.log(response.status))
    }

    render() {
        let task = this.props.task;
        return (
            <div className='task'>
                <div className='select-task'>
                    <input
                        onChange={()=>this.props.checkedTask(task.id)}
                        type="checkbox"
                    />
                    <label htmlFor="task-select"/>
                </div>
                <div className='task-fields'>
                    <p>
                        {task.name}
                    </p>
                    <textarea
                        name='description'
                        defaultValue={this.state.description}
                        onChange={this.onInputChange}
                        onBlur={this.updateTask}
                    />
                    <div className='task-status'>
                        {priorityToString(task.priority)}
                        <img
                            alt='1'
                            src='./img/ic_clock.png'
                        />
                        {moment(task.date).format('HH:mm')}
                        <img
                            alt='1'
                            src='./img/ic_alarm.png'
                        />
                        {alarmToString(task.alarm)}
                    </div>
                </div>
            </div>
            
        );
    }
}
export default Task;