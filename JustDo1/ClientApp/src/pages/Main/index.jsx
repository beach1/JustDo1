
import './main.css';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";

import { TasksContext } from '../../context';
import { authHeader } from '../../support/jwt';
import { notifications, alarm } from '../../support/notifications';
import { APITask } from '../../support/constants';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';
import TasksContainer from '../../components/TasksContainer';
import { Menu } from '../../components/Menu';
import Popup from '../../components/Popup';
import { PriorityIcon } from '../../components/Priority';
import CreatePanel from '../../components/CreatePanel'
import moment from 'moment';

import styled, { css } from 'styled-components';

const FilterBlock = styled.div`
	width: 100%;
	display: flex;

	& > :not(:last-child) {
		margin-right: 30px;
	}
`;

const TabWrapper = styled.div`

`;

const Tab = styled.span`
	font-family: "SF UI Text", Helvetica, Arial;
	font-size: 18px;

	color: #BBBBC7;

	&:hover {
		cursor: pointer;
	}

	&:not(:last-child) {
		margin-right: 10px;
	}

	${props => props.active && css`
		color: #000000;
		text-decoration: underline;
		cursor: default;
	`}
`;

const Tabs = ({
	checked,
	onChange
}) => {
	const onActiveClick = () => onChange(false);
	const onDoneClick = () => onChange(true);

	return (
		<TabWrapper>
			<Tab
				active={!checked}
				onClick={onActiveClick}
			>
				Active tasks
			</Tab>
			<Tab
				active={checked}
				onClick={onDoneClick}
			>
				Done tasks
			</Tab>
		</TabWrapper>
	);
}

const PeriodWrapper = styled.div`
	display: flex;
`;

const PeriodText = styled.span`
	margin-right: 10px;
	user-select: none;
`;

const Cross = styled.i`
	font-family: Arial, Helvetica, sans-serif;
	font-size: 18px;
	font-weight: bold;
	font-style: normal;
	line-height: 15px;

	color: #BBBBC7;
	margin-left: 10px;

	&:hover {
		cursor: pointer;
		color: #000000;
	}
`;

const PeriodSelector = ({
	value,
	onChange
}) => {
	const changeDate = (v) => onChange(moment(v));
	const clearDate = () => onChange(undefined);

	return (
		<PeriodWrapper>
			<PeriodText>
				{value
					? moment(value).format('DD.MM.YYYY')
					: 'Any date'
				}
			</PeriodText>
			<Popup
				src='./img/ic_calendar.png'
				className='footer-calendar'
				classNameDiv='footer-dropdown unleashed'
			>
				<DatePicker
					inline
					dateFormat='DD.MM.YYYY'
					selected={value && value.toDate()}
					onChange={changeDate}
				/>
			</Popup>
			{value
				&& <Cross onClick={clearDate} >
					x
				</Cross>
			}
		</PeriodWrapper>
	);
}


class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
			todayNotifications: [],

			currentFilter: 5,
			checked: false,
			date: moment()
		}
		this.loadData = this.loadData.bind(this);
		this.onAction = this.onAction.bind(this);
	}

	renderNotifyFromTask = (task) => {
		return (<React.Fragment>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<PriorityIcon
					priority={task.priority}
					style={{ marginLeft: 0, marginRight: '10px' }}
				/>
				<span style={{ fontFamily: '"SF UI Text", Helvetica, Arial', fontSize: '14px', fontWeight: 'bold', color: '#000000' }}>
					{task.date.format('HH:mm')}
				</span>
			</div>
			<p style={{ fontFamily: '"SF UI Text", Helvetica, Arial', fontSize: '14px', fontWeight: 'bold', color: '#000000' }}>
				{task.name}
			</p>
			<p style={{ fontFamily: '"SF UI Text", Helvetica, Arial', fontSize: '12px', color: '#BBBBC7' }}>
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

	componentDidUpdate(prevProps, prevState) {
		if (this.state.currentFilter !== prevState.currentFilter) {
			this.loadData();
		}
	}

	componentDidMount() {
		this.loadData();

		//Check notifications by using interval (1 min)
		this.interval = setInterval(() => {
			let alarming = alarm(this.state.todayNotifications);

			for (let task of alarming.nowNotifications) {
				this.notify(task);
			}

			if (alarming.nowNotifications.length > 0) {
				this.setState({ todayNotifications: alarming.remainTasks })
			}
		}, 10000);
	}

	//filtering by priority
	onAction(type) {
		this.setState({ currentFilter: type });
	}

	onSignOut() {
		localStorage.removeItem('user');
	}

	loadData = async () => {
		let date = this.state.date
			? moment(this.state.date).format('DD.MM.YYYY')
			: '';

		fetch(`${APITask}/?type=${this.state.currentFilter}&date=${date}&checked=${this.state.checked}`,
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

	onCheckedChange = (value) => {
		this.setState({ checked: value }, this.loadData);
	}

	onDateChange = (value) => {
		this.setState({ date: value }, this.loadData);
	}

	render() {

		let { tasks } = this.state;
		let dates = [...new Set(tasks.map(task => moment(task.date).format('DD.MM.YYYY')))];

		dates.sort((a, b) => moment(a, 'DD.MM.YYYY').isAfter(moment(b, 'DD.MM.YYYY')));
		tasks.sort((a, b) => moment(a.date).isAfter(moment(b.date)));

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
						<FilterBlock>
							<Tabs
								checked={this.state.checked}
								onChange={this.onCheckedChange}
							/>
							<PeriodSelector
								value={this.state.date}
								onChange={this.onDateChange}
							/>
						</FilterBlock>
						<TasksContainer />
						<CreatePanel />
					</div>
				</TasksContext.Provider>
			</div>
		);
	}
}

export default Main;