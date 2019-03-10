import React, { Component } from 'react';
import ListTasks from './ListTasks';
import {TasksContext} from './TasksContext';
import {authHeader} from '../support/jwt';
const API = '/api/app';
class MainMenu extends Component {
  constructor (props) {
    super(props);
    this.state = {
      listChecked:[]
    }
    this.listTasks=this.listTasks.bind(this);
    this.addChecked=this.addChecked.bind(this);
    this.removeCheckedTasks=this.removeCheckedTasks.bind(this);
  }
  
  addChecked(id){
    let {listChecked}=this.state;
    let index = listChecked.indexOf(id);
    if(index == -1){
        listChecked.push(id);
    } else{
        listChecked.splice(index, 1);
    }
    console.log(listChecked);
    this.setState({listChecked:listChecked});
  }
  removeCheckedTasks(value){
    let {listChecked}=this.state;
    fetch(API, {
        method: 'delete',
        headers: authHeader(),
        body: JSON.stringify(listChecked)
    }).then(()=>value.onDelete());
    this.setState({listChecked:[]});
  }

  listTasks=(value)=>{
    return(
        value.dates.map((date,index) =>
          <ListTasks
          addChecked={(id)=>this.addChecked(id)}
            tasks={value.tasks.filter((task)=> task.date === date)}
            date={date} key={date}>
          </ListTasks>)
      )}
  render() {
    let {listChecked}=this.state;
    return (
      <TasksContext.Consumer>
        {value=> (
        <div className='workplace-body'>
          <img onClick={()=>this.removeCheckedTasks(value)}
          className={listChecked.length>0?'trash':'trash hidden-trash'}
            src='./img/ic_trash.png' alt='1'></img>
              <ul>
                  {this.listTasks(value)}
              </ul>
        </div>)}
      </TasksContext.Consumer>
    );
  }
}
export default MainMenu;