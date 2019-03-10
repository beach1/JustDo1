import moment from 'moment';


export function notifications(tasks){
    let todayNotifications=[];
    let a = moment();
    for (let task of tasks){
        let b = moment(task.date+' '+ task.time);
        if (b.diff(a, 'days') ==0 && b.diff(a,'minutes')>0){
            let obj={name:task.name,date:task.date+' '+task.time,alarm:task.alarm}
            obj.alarm = alarmToMinutes(obj.alarm);
            todayNotifications.push(obj);
        }
    }
    return todayNotifications;
}

function alarmToMinutes(value){
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

export function alarm(tasks){
    let a = moment();
    let remainTasks=tasks.filter((task)=>{
        let b = moment(task.date);
        return (b.diff(a, 'minutes') >=task.alarm)
    });
    let nowNotifications=tasks.filter((task)=>{
        let b = moment(task.date);
        return (b.diff(a, 'minutes') <=task.alarm)
    });
    return {nowNotifications:nowNotifications,remainTasks:remainTasks};
}