import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import {TasksContext} from '../../context';
import {authHeader} from '../../support/jwt';
import {notifications, alarm} from '../../support/notifications';
import {APITask} from '../../support/constants';
import 'react-toastify/dist/ReactToastify.css';
import './main.css';

import { ToastContainer, toast } from 'react-toastify';
import TasksContainer from '../../components/TasksContainer';
import {Menu} from '../../components/Menu';
import Popup from '../../components/Popup';
import CreatePanel from '../../components/CreatePanel'

class Main extends Component {
	constructor (props) {
		super(props);
		this.state = {
			tasks:[],
			todayNotifications:[],
			currentFilter:5
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
//Check notifications by using interval (1 min)
		this.interval=setInterval(()=>{
			let alarming = alarm(this.state.todayNotifications);
			for (let task of alarming.nowNotifications){
				this.notify(task);
			}
			if (alarming.nowNotifications.length > 0){
				this.setState({todayNotifications:alarming.remainTasks})
			}
		}, 60000);
	}

//filtering by priority
	onAction(type){
		this.setState({currentFilter:type});
	}
		
	onSignOut(){
        localStorage.removeItem('user');
    }

	loadData() {
		fetch(APITask+'/'+this.state.currentFilter,
			{
			method: 'GET',
			headers: authHeader()
			})
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
			<div className="main">
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
				<Menu 
					selected={this.state.currentFilter}
					onAction={this.onAction}
				/>
				<TasksContext.Provider 
					value={{
						tasks: tasks,
						dates: dates,
						onDelete: this.loadData,
						onAdd: this.loadData
					}}
				>
					<div className='main-content'>
						<Popup
							classNameDiv='content-header'
							className=''
							src='./img/ic_menu.png'
						>
							<div className='header-menu'>
								<Link to='change-pass'>
									<p>
										Change Password
									</p>
								</Link>
								<Link to='/'>
									<p onClick={this.onSignOut}>
										Sign Out
									</p>
								</Link>
							</div>
						</Popup>
						<TasksContainer/>
						<CreatePanel/>
					</div>
				</TasksContext.Provider>
			</div>
		);
	}
}
  export default Main;