import React, { Component } from 'react';
import {APIIdentity} from '../support/constants';
import {Link} from 'react-router-dom';
import { StartLayout } from './StartLayout';
import history from '../support/history';
import {validateEmail} from '../support/validateEmail';

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
			<StartLayout>
				<div className="valid-form">
					<Link to='/'>
						<img alt='1' className='left-arrow forget-arrow'
						src="./img/ic_arrow_left.png"/>
					</Link>
					<div className="forget-label">Forgot Password</div>
					<div className="forget-description">
						Please enter your email to recieve your<br></br> password reset instructions
					</div>
					<form>
						<div className='with-eye'>
							<input type='email' name='email'
							placeholder='Email' value={this.state.email}
							onChange={this.handleUserInput} />
							<p className='validerror'>
								{this.state.success?'':'Email does not contains'}
							</p>
						</div>
						<button type='submit' className='button-forget'
						disabled={!this.state.emailValid} onClick={this.sendAction}>
							Send
						</button>
					</form>
				</div>
			</StartLayout>
		);
	}
}
export default ForgetPass;