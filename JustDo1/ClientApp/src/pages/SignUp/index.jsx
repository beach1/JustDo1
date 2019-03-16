import React, { Component } from 'react';
import {APIIdentity} from '../../support/constants';
import {Link} from 'react-router-dom';
import {validatePassword} from '../../support/validatePassword';
import {validateEmail} from '../../support/validateEmail';
import history from '../../support/history';
import './signup.css';
import '../../css/common.css';

import { Layout } from '../../components/Layout';
import { ValidateInput } from '../../components/ValidateInput';
import { SubmitButton } from '../../components/SubmitButton';

class SignUp extends Component {

	constructor (props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			confPassword: '',
			emailError:'',
			passwordError:'',
			confPasswordError:'',
			confError:'',
			emailValid: false,
			passwordValid: false,
			confPasswordValid:false,
			formValid: false,
			success:true,
		} 
		this.signUp=this.signUp.bind(this);

	}

	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		let obj = {...this.state};
		obj[name] =  value;
		switch (name) {
			case 'email':
				obj.emailValid = validateEmail(value);
				obj.emailError = obj['emailValid'] ? '': 'This email does not exist';
				break;
            case 'password':
				obj.passwordError = validatePassword(value);
				obj.passwordValid = obj.passwordError==='' ? true : false;
				obj.confPasswordValid = value===obj.confPassword;
				obj.confPasswordError = obj.confPasswordValid ? '' : 'Password do not match';
				break;
            case 'confPassword':
				obj.confPasswordValid = value===obj.password;
				obj.confPasswordError = obj.confPasswordValid ? '' : 'Password do not match';
				break;
			default:
				break;
		}
		obj.formValid = (obj.passwordValid && obj.emailValid && obj.confPasswordValid);
		this.setState(obj);
	}

	signUp(event){
		event.preventDefault();
		fetch(APIIdentity+'/SignUp',
		{
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body:JSON.stringify({
				email:this.state.email,
				password:this.state.password})
			})
			.then(response =>{
				if (!response.ok){
					this.setState({success:false});
				} else {
					history.push('/');
				}
			});
	}
	render() {
		return (
			<Layout>
                <div className='content-align-end'>
                    <p className='signup-headline headline'>
						Sign up
					</p>
                    <form>
						<ValidateInput
							type='email'
							name='email'
							placeholder='Email'
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
							error={this.state.passwordError}
						/>
						<ValidateInput
							type='password'
							name='confPassword'
							placeholder='Confirm Password'
							value={this.state.confPassword}
							onChange={this.handleUserInput}
							withEye={true}
							error={this.state.confPasswordError}
						/>
                        <SubmitButton
							name='Sign Up'
							type='submit'
							error={this.state.success?'':'Email already exist'}
							className='button-submit'
							disabled={!this.state.formValid}
							onClick={this.signUp}
						/>
                        <p className="return-signin">
                            I already have account. <Link to='/signin'>Sign in</Link>
                        </p>
                    </form>
                    <div className="footer">
                        By accessing your account, you agree to our<br></br>
                        <Link to='/terms-conditions'>Terms conditions
                        </Link> and <Link to='/privacy-policy'>Privacy Policy</Link>
                    </div>
                </div>
            </Layout>
		);
	}
}
export default SignUp;