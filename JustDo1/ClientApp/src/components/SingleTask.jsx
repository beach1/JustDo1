import React, { Component } from 'react';
import {authHeader} from '../support/jwt';
const API = '/api/app';
class SingleTask extends Component {
    constructor (props) {
        super(props);
        this.state = {
          description:props.task.description
        }
        this.switchImportant=this.switchImportant.bind(this);
        this.switchAlarm=this.switchAlarm.bind(this);
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
    switchImportant=() =>{
        let {task} = this.props;
        switch(task.priority){
            case 1:
                return <div className='importance'><div className='curcle red-important'></div>Urgently priority</div>
            case 2:
                return <div className='importance'><div className='curcle yellow-important'></div>Important priority</div>
            case 3:
                return <div className='importance'><div className='curcle blue-important'></div>Normal priority</div>
            case 4:
                return <div className='importance'><div className='curcle grey-important'></div>Neutral priority</div>
            default:
                return null;
        }
    }
    switchAlarm=() =>{
        let {task} = this.props;
        switch(task.alarm){
            case 1:
                return <p>5 min.</p>
            case 2:
                return <p>10 min.</p>
            case 3:
                return <p>30 min.</p>
            case 4:
                return <p>1 hour</p>
            case 5:
                return <p>3 hours</p>
            case 6:
                return <p>1 day</p>
            case 7:
                return <p>1 week</p>
            default:
                return null;
        }
    }
  render() {
      let task = this.props.task;
    return (<div style={{display: this.props.display ? 'flex' : 'none' }} className='singletask'>
                      <div className='task-select'>
                        <input onChange={()=>this.props.checkedTask(task.id)} type="checkbox"></input>
                        <label htmlFor="task-select"></label>
                      </div>
                      <div className='task-fields'>
                        <p>{task.name}</p>
                        <textarea name='description' defaultValue={this.state.description} onChange={this.onInputChange}
                         onBlur={()=>this.updateTask()}
                        ></textarea>
                        <div className='task-status'>
                          {this.switchImportant()}
                          <img alt='1' src='./img/ic_clock.png'></img>{task.time}
                          <img alt='1' src='./img/ic_alarm.png'></img>{this.switchAlarm()}
                        </div>
                      </div>
                    </div>
        
    );
  }
}
export default SingleTask;