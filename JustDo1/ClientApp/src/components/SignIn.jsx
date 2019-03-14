import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {APIIdentity} from '../support/constants';
import {validateEmail} from '../support/validateEmail';
import { StartLayout } from './StartLayout';
import history from '../support/history';

class SignIn extends Component {

	constructor (props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			emailError:'',
			emailValid: false,
			hidden:true,
			success:true
		}
		this.handleUserInput = this.handleUserInput.bind(this); 
		this.signIn = this.signIn.bind(this);
		this.toggleShow = this.toggleShow.bind(this);
	}

	toggleShow() {
		this.setState({ hidden: !this.state.hidden });
	}

	handleUserInput = (e) => {
		let obj = {...this.state};
		const name = e.target.name;
		const value = e.target.value;
		obj[name] = value;
		if (name == 'email'){
			obj.emailValid = validateEmail(value);
			obj.emailError = obj['emailValid'] ? '': 'This email does not exist';
		}
		this.setState(obj);
	}

	signIn(event){
		fetch(APIIdentity+'/SignIn',
			{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body:JSON.stringify({
				email:this.state.email,
				password:this.state.password})
			})
			.then(response =>{
				return response.text();
			}).then(text =>{
				if (!text){
					this.setState({success:false});
					return;
				}
				localStorage.setItem('user',text);
				history.push('/');
			})
			event.preventDefault();
	}

	render() {
		return (
			<StartLayout>
				<div className='valid-form'>
					<div className="sign">Sign in</div>
					<form>
						<div className='with-eye'>
							<input type='email' name='email'
							placeholder='E-mail' value={this.state.email}
							onChange={this.handleUserInput} />
							<p className='texterror'>{this.state.emailError}</p>
						</div>
						<div className='with-eye'>
							<input type={this.state.hidden ? 'password' : 'text'}
							name='password' placeholder='Password'
							value={this.state.password}
							onChange={this.handleUserInput} />
							<img alt='1' onClick={this.toggleShow}
							className={this.state.hidden? 'icon-eye':'icon-eye-novis'}/>
							<p className='validerror'>
								{this.state.success?'':'Invalid credentials'}
							</p>
						</div>
						<div className="forgot-link">
							<Link to='/forget-pass'>Forgot password?</Link>
						</div>
						<button className="button-submit" type='submit'
						disabled={!this.state.emailValid} onClick={this.signIn}>
							Sign In
						</button>
						<div className="signup-link">
							<Link to='/signup'>Sign up</Link>
						</div>
					</form>
					<div className="start-footer">
						By accessing your account, you agree to our<br></br>
						<Link to='/terms-conditions'>Terms conditions</Link> and <Link to='/privacy-policy'>
						Privacy Policy</Link>
					</div>
				</div>
			</StartLayout>
		);
	}
}
export default SignIn;