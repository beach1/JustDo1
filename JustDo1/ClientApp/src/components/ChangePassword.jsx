import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {APIIdentity} from '../support/constants';
import {authHeader} from '../support/jwt';
import {validatePassword} from '../support/validatePassword';
import history from '../support/history';
import { MainLayout } from './MainLayout';

class ChangePassword extends Component {

	constructor (props) {
		super(props);
		this.state = {
			password:'',
			newPassword:'',
			confPassword:'',
			passwordError:'',
			passwordValid: false,
			newPasswordValid:false,
			confPasswordValid:false,
			success:true
		}
		this.handleUserInput = this.handleUserInput.bind(this); 
		this.sendAction=this.sendAction.bind(this);

	}

	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({[name]: value}, 
			() => {
				if (name=='newPassword'){
					this.validateField(value)
				} else if(name=='confPassword'){
					this.setState({confPasswordValid:
						 (this.state.confPassword === this.state.newPassword)},
						  ()=>this.validateForm())
				}});
	}

	validateField(value) {
		let error = validatePassword(value);
		let newPasswordValid = (error == '' && value.length > 0) ? true:false;
		this.setState({
			passwordError:validatePassword(value),
			newPasswordValid: newPasswordValid,
			confPasswordValid: (this.state.confPassword === this.state.newPassword)
		}, ()=>this.validateForm())
	}

	validateForm() {
		this.setState({formValid: this.state.newPasswordValid &&
		this.state.confPasswordValid && this.state.password.length>=8});
	}

	sendAction(event){
		event.preventDefault();
		fetch(APIIdentity+'/ChangePass',
		{
		method: 'POST',
		headers: authHeader(),
		body:JSON.stringify({
			newpassword:this.state.newPassword,
			password:this.state.password})
		})
		.then(response =>{
			if (!response.ok) {
				this.setState({success:false});
			} else {
				localStorage.removeItem('user');
				history.push('/');
				
			}
		});
	}

  	render() {
		return (
			<MainLayout>
				<div className='main-change-workplace'>
					<div className="reset-form">
						<Link to='/'>
							<img alt='1' className='left-arrow'
							src="./img/ic_arrow_left.png"/>
						</Link>
						<div className="reset-label">Change Password</div>
						<form>
							<div className='with-eye'>
								<input type='password'
								name='password' placeholder='Password'
								value={this.state.password}
								onChange={this.handleUserInput}/>
							</div>
							<div className='with-eye'>
								<input type='password' name='newPassword'
								placeholder='New password'
								value={this.state.newPassword}
								onChange={this.handleUserInput} />
								<p className='texterror'>{this.state.passwordError}</p>
							</div>
							<div className='with-eye'>
								<input type='password' name='confPassword'
								placeholder='Confirm Password'
								value={this.state.confPassword}
								onChange={this.handleUserInput} />
								<p className='texterror'>
									{(this.state.confPassword === this.state.newPassword)?''
									:'Password do not match'}
								</p>
								<p className='validerror'>
									{this.state.success?'':'Invalid Password'}
								</p>
							</div>
							<button type='submit'
							className='button-reset'
							disabled={!this.state.formValid}
							onClick={this.sendAction}>
								Change Password
							</button>
						</form>
					</div>
				</div>
			</MainLayout>
		);
  	}
}
export default ChangePassword;