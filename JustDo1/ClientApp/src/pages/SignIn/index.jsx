import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {APIIdentity} from '../../support/constants';
import {validateEmail} from '../../support/validateEmail';
import history from '../../support/history';
import './signin.css';
import '../../css/common.css';

import { Layout } from '../../components/Layout';
import { ValidateInput } from '../../components/ValidateInput';
import { SubmitButton } from '../../components/SubmitButton';

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
		this.signIn = this.signIn.bind(this);
	}


	handleUserInput = (e) => {
		let obj = {...this.state};
		const name = e.target.name;
		const value = e.target.value;
		obj[name] = value;
		if (name === 'email'){
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
			<Layout>
				<div className='content-align-end'>
					<p className='signin-headline headline'>
						Sign in
					</p>
					<form>
						<ValidateInput
							type='email'
							name='email'
							placeholder='E-mail'
							value={this.state.email}
							onChange={this.handleUserInput}
							error = {this.state.emailError}
						/>
						<ValidateInput
							type='password'
							name='password'
							placeholder='Password'
							value={this.state.password}
							onChange={this.handleUserInput}
							withEye={true}
						/>
						<Link 
							className='forget-pass'
							to='/forget-pass'
						>
							Forgot password?
						</Link>
						<SubmitButton
							name='Sign In'
							className="button-submit"
                            type='submit'
                            error={this.state.success?'':'Invalid credentials'}
							disabled={!this.state.emailValid}
							onClick={this.signIn}
						/>
						<Link to='/signup'>Sign up</Link>
					</form>
					<div className="footer">
						By accessing your account, you agree to our<br></br>
						<Link to='/terms-conditions'>Terms conditions</Link> and <Link to='/privacy-policy'>
						Privacy Policy</Link>
					</div>
				</div>
			</Layout>
		);
	}
}
export default SignIn;