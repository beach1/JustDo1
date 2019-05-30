
import './main.css';

import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import {TasksContext} from '../../context';
import {authHeader} from '../../support/jwt';
import {notifications, alarm} from '../../support/notifications';
import {APITask} from '../../support/constants';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';
import TasksContainer from '../../components/TasksContainer';
import {Menu} from '../../components/Menu';
import Popup from '../../components/Popup';
import { PriorityIcon } from '../../components/Priority';
import CreatePanel from '../../components/CreatePanel'
import moment from 'moment';

class Main extends Component {
	constructor (props) {
		super(props);
		this.state = {
			tasks: [],
			todayNotifications: [],
			currentFilter: 5
		}
		this.loadData=this.loadData.bind(this);
		this.onAction=this.onAction.bind(this);
	}

	renderNotifyFromTask = (task) => {
		return (<React.Fragment>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<PriorityIcon
					priority={task.priority}
					style={{ marginLeft: 0, marginRight: '10px' }}
				/>
				<span style={{fontFamily: '"SF UI Text", Helvetica, Arial', fontSize: '14px', fontWeight: 'bold', color: '#000000' }}>
					{task.date.format('HH:mm')}
				</span>
			</div>
			<p style={{fontFamily: '"SF UI Text", Helvetica, Arial', fontSize: '14px', fontWeight: 'bold', color: '#000000' }}>
				{task.name}
			</p>
			<p style={{fontFamily: '"SF UI Text", Helvetica, Arial', fontSize: '12px', color: '#BBBBC7' }}>
				{task.description}
			</p>
		</React.Fragment>);
	}
  
	notify = (task) => toast(this.renderNotifyFromTask(task), {
		position: "top-right",
		autoClose: 5500,
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
		this.interval = setInterval(() => {
			let alarming = alarm(this.state.todayNotifications);
			
			for (let task of alarming.nowNotifications){
				this.notify(task);
			}

			if (alarming.nowNotifications.length > 0){
				this.setState({ todayNotifications: alarming.remainTasks })
			}
		}, 10000);
	}

	//filtering by priority
	onAction(type){
		this.setState({ currentFilter: type });
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
				let todayNotifications = notifications(data);

				this.setState({
					tasks: data.map(task => ({
						...task,
						date: moment(task.date)
					})),
					todayNotifications
				})
			})
	}

	render() {
		
		let { tasks } = this.state;
		let dates = [...new Set(tasks.map(task => moment(task.date).format('DD.MM.YYYY')))];

		dates.sort((a,b) => moment(a, 'DD.MM.YYYY').isAfter(moment(b, 'DD.MM.YYYY')));
		tasks.sort((a,b) => moment(a.date).isAfter(moment(b.date)));
		
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
                            wrappedImage={true}
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