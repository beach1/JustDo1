export const APITask = '/api/task';
export const APIIdentity = '/api/identity';
export const selectAlarm = ['5 min.','10 min.','30 min.','1 hour','3 hours','1 day','1 week'];
export const selectPriority = ['Urgently','Important','Normal','Neutral'];
export function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
