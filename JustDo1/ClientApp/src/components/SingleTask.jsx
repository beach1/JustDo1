import React, { Component } from 'react';
import {authHeader} from '../support/jwt';
import {alarmToString,importantToString} from '../support/switchcase';
const API = '/api/app';
class SingleTask extends Component {
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
        if(task.description==this.state.description){
            return false;
        }
        task.description = this.state.description;
        fetch(API, {
            method: 'put',
            headers: authHeader(),
            body: JSON.stringify(task)
        }).then(response=>console.log(response.status))
    }

    render() {
        let task = this.props.task;
        return (
            <div style={{display: this.props.display ? 'flex' : 'none' }}
             className='singletask'>
                <div className='task-select'>
                    <input onChange={()=>this.props.checkedTask(task.id)}
                     type="checkbox"></input>
                    <label htmlFor="task-select"></label>
                </div>
                <div className='task-fields'>
                    <p>{task.name}</p>
                    <textarea name='description'
                     defaultValue={this.state.description}
                     onChange={this.onInputChange}
                     onBlur={()=>this.updateTask()}
                    ></textarea>
                <div className='task-status'>
                    {importantToString(task.priority)}
                    <img alt='1' src='./img/ic_clock.png'></img>
                    {task.time}
                    <img alt='1' src='./img/ic_alarm.png'></img>
                    {alarmToString(task.alarm)}
                </div>
                </div>
            </div>
            
        );
    }
}
export default SingleTask;