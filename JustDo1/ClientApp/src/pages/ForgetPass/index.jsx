import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import history from '../../support/history';
import {validateEmail} from '../../support/validateEmail';
import {APIIdentity} from '../../support/constants';
import './forget-pass.css';
import '../../css/common.css';

import { Layout } from '../../components/Layout';
import { ValidateInput } from '../../components/ValidateInput';
import { SubmitButton } from '../../components/SubmitButton';

class ForgetPass extends Component {

	constructor (props) {
		super(props);
		this.state = {
			email: '',
			emailValid: false,
			success:true
		}
		this.handleUserInput = this.handleUserInput.bind(this); 
		this.sendAction=this.sendAction.bind(this);
	}

	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		let obj = {...this.state};
		obj[name] = value;
		obj.emailValid = validateEmail(value);
		this.setState(obj);
	}

	sendAction(event){
		event.preventDefault();
		fetch(APIIdentity+'/ForgetPass',
			{
				method: 'POST',
				headers: {
				'Content-Type': 'application/json',
				},
				body:JSON.stringify({
				email:this.state.email,
				password:''})
			})
			.then(response =>{
				if (!response.ok){
					this.setState({success:false});
				} else {
					history.push('/reset-pass');
				}
		});
	}

	render() {
		return (
			<Layout>
				<div className="content-align-start">
					<Link className='forget-arrow' to='/'>
						<img
							alt='1'
							className='left-arrow'
							src="./img/ic_arrow_left.png"
						/>
					</Link>
					<p className="forget-headline headline">
						Forgot Password
					</p>
					<p className="forget-description">
						Please enter your email to recieve your<br></br> password reset instructions
					</p>
					<form>
                        <ValidateInput
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={this.state.email}
                            onChange={this.handleUserInput} 
                        />
						<SubmitButton
							type='submit'
                            className='button-forget'
                            name='Send'
                            error={this.state.success?'':'Email does not contains'}
							disabled={!this.state.emailValid}
							onClick={this.sendAction}
						/>
					</form>
				</div>
			</Layout>
		);
	}
}
export default ForgetPass;