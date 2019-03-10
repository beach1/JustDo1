export const API = '/api/app';
export const defaultState ={name:'',date: new Date(),hour:'16',minute:'00',alarmValue:'1 hour',importantValue:'Neutral'};
export const selectAlarm = ['5 min.','10 min.','30 min.','1 hour','3 hours','1 day','1 week'];
export const selectImportant = ['Urgently','Important','Normal','Neutral'];
export function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
