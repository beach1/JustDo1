import React from 'react';
import './submit-button.css';

export const SubmitButton = (props) => (
	<div className='submit-button'>
		{props.error ? 
			<p className='submit-error'>
				{props.error}
			</p>
			: null
		}
		<button {...props}>{props.name}
		</button>
	</div>
);

SubmitButton.defaultProps = {
	error:''
  };