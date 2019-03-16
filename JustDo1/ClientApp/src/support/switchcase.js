import React from 'react';

export function alarmToString(alarm){
    return <p>{alarm}</p>
}

export function priorityToString(priority){
    switch(priority){
        case 'Urgently':
            return <div className='priority'><div className='circle red-priority'></div>Urgently priority</div>
        case 'Important':
            return <div className='priority'><div className='circle yellow-priority'></div>Important priority</div>
        case 'Normal':
            return <div className='priority'><div className='circle blue-priority'></div>Normal priority</div>
        case 'Neutral':
            return <div className='priority'><div className='circle grey-priority'></div>Neutral priority</div>
        default:
            return null;
    }
}