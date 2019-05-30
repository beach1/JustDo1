import React from 'react';
import './priority.css';

export const PriorityIcon = ({ priority, style }) => {
	switch (priority) {
		case 'Urgently':
			return <i
				className='circle red-priority'
				style={style}
			/>;
		case 'Important':
			return <i
				className='circle yellow-priority'
				style={style}
			/>;
		case 'Normal':
			return <i
				className='circle blue-priority'
				style={style}
			/>;
		case 'Neutral':
			return <i
				className='circle grey-priority'
				style={style}
			/>;
		default:
			return null;
	}
}

export const Priority = ({ priority }) => {
	return (
		<div className='priority'>
			<PriorityIcon priority={priority} />
			{priority} priority
		</div>
	);
}