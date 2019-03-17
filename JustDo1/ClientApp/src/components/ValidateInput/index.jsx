import React, {useState} from 'react';
import styles from './validate-input.module.css'


export const ValidateInput = (props) => {
    const {error='',type,withEye, ...restProps }=props;
	const [hidden, setHidden] = useState(true);

	return(
		<div className={styles['input-field']}>
			<input
                type={hidden ? props.type : 'text'}
				{...restProps}
			/>
			{props.withEye ? 
				<img
					alt='1'
					onClick={() => setHidden(hidden => !hidden)}
					className={hidden? styles['icon-eye']:styles['icon-eye-novis']}
				/>
				: null
			}
			<p className={styles['text-error']}>
				{props.error}
			</p>
		</div>
	);
}