import React, { Component } from 'react';
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

export function alarmToString(alarm){
    switch(alarm){
        case 1:
            return <p>5 min.</p>
        case 2:
            return <p>10 min.</p>
        case 3:
            return <p>30 min.</p>
        case 4:
            return <p>1 hour</p>
        case 5:
            return <p>3 hours</p>
        case 6:
            return <p>1 day</p>
        case 7:
            return <p>1 week</p>
        default:
            return null;
    }
}

export function importantToString(important){
    switch(important){
        case 1:
            return <div className='importance'><div className='curcle red-important'></div>Urgently priority</div>
        case 2:
            return <div className='importance'><div className='curcle yellow-important'></div>Important priority</div>
        case 3:
            return <div className='importance'><div className='curcle blue-important'></div>Normal priority</div>
        case 4:
            return <div className='importance'><div className='curcle grey-important'></div>Neutral priority</div>
        default:
            return null;
    }
}