import React, { Component } from 'react';
import MainMenu from './MainMenu';
import MainWorkplace from './MainWorkplace';
import {TasksContext} from './TasksContext';
import {authHeader} from '../support/jwt';
import {notifications, alarm} from '../support/notifications';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API = '/api/app';

class MainPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
	  tasks:[],
	  todayNotifications:[],
      currentFilter:0
    }
    this.loadData=this.loadData.bind(this);
    this.onAction=this.onAction.bind(this);
  }
  
	notify = (task) => toast(`🦄 Задача: ${task.name} - истекает срок выполнения!`, {
		position: "top-left",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
	});
	componentDidUpdate(prevProps, prevState){
		if (this.state.currentFilter !== prevState.currentFilter) {
			this.loadData();
		}
	}
	componentDidMount(){
		this.loadData();
		this.interval=setInterval(()=>{
			console.log(this.state.todayNotifications);
			let alarming = alarm(this.state.todayNotifications);
			for(let task of alarming.nowNotifications){
				this.notify(task);
			}
			if (alarming.nowNotifications.length>0){
				this.setState({todayNotifications:alarming.remainTasks})
			}
		},5000);
	}
	onAction(type){
		this.setState({currentFilter:type});
	}
	loadData() {
		fetch(API+'/'+this.state.currentFilter,
			{
			method: 'GET',
			headers: authHeader()}
			)
			.then(response => response.json())
			.then(data => {
				let todayNotifications=notifications(data);
				this.setState({tasks:data,
					todayNotifications:todayNotifications})
			})
	}
  render() {
      let {tasks}=this.state;
      let dates = [...new Set(tasks.map(task => task.date))];
      dates.sort((a,b)=>new Date(a)-new Date(b));
      tasks.sort((a,b)=>new Date('1970-01-01T' + a.time + 'Z')-new Date('1970-01-01T' + b.time + 'Z'));
      return (
        <div className="main-page">
          <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
            />
          <MainMenu selected={this.state.currentFilter} onAction={this.onAction}></MainMenu>
          <TasksContext.Provider value={{tasks:tasks,dates:dates,onDelete:this.loadData, onAdd:this.loadData}}>
            <MainWorkplace></MainWorkplace>
          </TasksContext.Provider>
        </div>
      );
    }
  }
  export default MainPage;