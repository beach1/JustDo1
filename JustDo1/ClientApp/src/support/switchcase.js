import React, { Component } from 'react';

export function alarmToString(alarm){
    return <p>{alarm}</p>
}

export function priorityToString(priority){
    switch(priority){
        case 'Urgently':
            return <div className='importance'><div className='curcle red-important'></div>Urgently priority</div>
        case 'Important':
            return <div className='importance'><div className='curcle yellow-important'></div>Important priority</div>
        case 'Normal':
            return <div className='importance'><div className='curcle blue-important'></div>Normal priority</div>
        case 'Neutral':
            return <div className='importance'><div className='curcle grey-important'></div>Neutral priority</div>
        default:
            return null;
    }
}