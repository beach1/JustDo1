import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {API} from '../support/constants';
import {authHeader} from '../support/jwt';
import {validatePassword} from '../support/validatePassword';

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
		this.changePage = this.changePage.bind(this);
		this.sendAction=this.sendAction.bind(this);

	}

	changePage(pageValue){
		this.props.changePage(pageValue);
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
		fetch(API+'/ChangePass',
		{
		method: 'POST',
		headers: authHeader(),
		body:JSON.stringify({
			newpassword:this.state.newPassword,
			password:this.state.password})
		})
		.then(response =>{
			if (!response.ok){
				this.setState({success:false});
			} else{
				this.props.history.push("/SignIn");
				localStorage.removeItem('user');
				this.changePage(1);
			}
		});
	}

  	render() {
		return (
			<div className="reset-form">
				<img alt='1' className='left-arrow'
				onClick={()=>this.changePage(1)}
				src="./img/ic_arrow_left.png"></img>
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
		);
  	}
}
export default withRouter(ChangePassword);