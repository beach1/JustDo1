import React, {useState} from 'react';
import './validate-input.css'


export const ValidateInput = (props) => {
    const {error='',type,withEye, ...restProps }=props;
	const [hidden, setHidden] = useState(true);

	return(
		<div className='input-field'>
			<input
                type={hidden ? props.type : 'text'}
				{...restProps}
			/>
			{props.withEye ? 
				<img
					alt='1'
					onClick={() => setHidden(hidden => !hidden)}
					className={hidden? 'icon-eye':'icon-eye-novis'}
				/>
				: null
			}
			<p className='text-error'>
				{props.error}
			</p>
		</div>
	);
}