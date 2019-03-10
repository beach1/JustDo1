export function alarmToInt(string){
    switch (string) {
        case '5 min.':
            return 1;
        case '10 min.':
            return 2;
        case '30 min.':
            return 3;
        case '1 hour':
            return 4;
        case '3 hours':
            return 5;
        case '1 day':
            return 6;
        case '1 week':
            return 7;
    
        default:
            break;
    }
}
export function priorityToInt(string){
    switch (string) {
        case 'Urgently':
            return 1;
        case 'Important':
            return 2;
        case 'Normal':
            return 3;
        case 'Neutral':
            return 4;
        default:
            break;
    }
}