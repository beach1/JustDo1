import moment from 'moment';


export function notifications(tasks) {
	let array = [];

	let now = moment();

	for (let task of tasks) {
		let date = moment(task.date);
		console.log(date.format('DD.MM.YYYY HH:mm:ss'))
		console.log('is same day: ' + date.isSame(now, 'day'));
		console.log('is after now: ' + date.isAfter(now));

		if (date.isSame(now, 'day') && date.isAfter(now)) {

			let obj = {
				name: task.name,
				date: date,
				alarm: alarmToMinutes(task.alarm)
			}

			array.push(obj);
		}
	}

	return array;
}

function alarmToMinutes(value) {
	switch (value) {
		case 1:
			return 5;
		case 2:
			return 10;
		case 3:
			return 30;
		case 4:
			return 60;
		case 5:
			return 180;
		case 6:
			return 1440;
		case 7:
			return 10080;
		default:
			break;
	}
}

export function alarm(tasks) {
	let now = moment();

	let remainTasks = tasks.filter(task => moment(task.date).isAfter(now));
	let nowNotifications = tasks.filter(task => moment(task.date).isSameOrBefore(now));

	return { nowNotifications, remainTasks };
}