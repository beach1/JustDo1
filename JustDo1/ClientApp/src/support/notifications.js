import moment from 'moment';


export function notifications(tasks) {
	let array = [];

	let now = moment();

	for (let task of tasks) {
		let date = moment(task.date);

		if (date.isSame(now, 'day') && date.isAfter(now)) {
			array.push({
				...task,
				date: date,
				alarm: alarmToMinutes(task.alarm)
			});
		}
	}

	return array;
}

function alarmToMinutes(value) {
	switch (value) {
		case '5 min.':
			return 5;
		case '10 min.':
			return 10;
		case '30 min.':
			return 30;
		case '1 hour':
			return 60;
		case '3 hours':
			return 180;
		case '1 day':
			return 1440;
		case '1 week':
			return 10080;
		default:
			break;
	}
}

export function alarm(tasks) {
	let now = moment();

	let remainTasks = tasks.filter(task => moment(task.date).diff(now, 'minutes') >= task.alarm);
	let nowNotifications = tasks.filter(task => moment(task.date).diff(now, 'minutes') <= task.alarm);

	return { nowNotifications, remainTasks };
}