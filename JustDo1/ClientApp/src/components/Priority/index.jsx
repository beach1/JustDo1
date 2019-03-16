import React from 'react';
import './priority.css';

export const Priority = (props) => {
    switch(props.priority){
        case 'Urgently':
            return (
                <div className='priority'>
                    <div className='circle red-priority'/>
                    Urgently priority
                </div>
            );
        case 'Important':
            return (
                <div className='priority'>
                    <div className='circle yellow-priority'/>
                    Important priority
                </div>
            );
        case 'Normal':
            return (
                <div className='priority'>
                    <div className='circle blue-priority'/>
                    Normal priority
                </div>
            );
        case 'Neutral':
            return (
                <div className='priority'>
                    <div className='circle grey-priority'/>
                    Neutral priority
                </div>
            );
        default:
            return null;
    }
}