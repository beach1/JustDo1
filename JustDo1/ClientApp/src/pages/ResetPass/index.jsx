import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import {APIIdentity} from '../../support/constants';
import {validatePassword} from '../../support/validatePassword';
import history from '../../support/history';
import './reset-pass.css';
import '../../css/common.css';

import { Layout } from '../../components/Layout';
import { ValidateInput } from '../../components/ValidateInput';
import { SubmitButton } from '../../components/SubmitButton';

class ChangePass extends Component {

	constructor (props) {
		super(props);
		this.state = {
			code: '',
			password:'',
			confPassword:'',
			confPasswordError:'',
			passwordError:'',
			codeValid:false,
			passwordValid: false,
			confPasswordValid:false,
			formValid:false,
			success:true
		}
		this.sendAction=this.sendAction.bind(this);

	}

	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		let obj = {...this.state};
		obj[name] = value;
		switch (name) {
			case 'code':
				obj.codeValid = obj[name].length ===6;
				break;
			case 'password':
				obj.passwordError = validatePassword(value);
                obj.passwordValid = obj.passwordError==='';
                obj.confPasswordValid = value===obj.confPassword;
				obj.confPasswordError = obj.confPasswordValid ? '' : 'Password do not match';
				break;
			case 'confPassword':
				obj.confPasswordValid = value === obj.password;
				obj.confPasswordError = obj.confPasswordValid ? '' : 'Password do not match';
				break;
			default:
				break;
		}
		obj.formValid = (obj.codeValid && obj.passwordValid && obj.confPasswordValid);
		this.setState(obj);
	}

	sendAction(event){
		fetch(APIIdentity+'/ResetPass',
		 {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body:JSON.stringify({
				code:this.state.code,
				password:this.state.password})
			})
			.then(response =>{
				if (!response.ok){
					this.setState({success:false});
				 } else{
					history.push('/');
				 }
			});
			event.preventDefault();
	}

	render() {
		return (
			<Layout>
				<div className='content-align-end'>
					<Link className='reset-arrow' to='/'>
						<img
							alt='1'
							className='left-arrow'
							src='./img/ic_arrow_left.png'
						/>
					</Link>
					<p className='reset-headline headline'>
						Forgot Password
					</p>
					<p className='reset-description'>
						Reset code was sent to your Email. Please enter the code and create new password
					</p>
					<form>
						<ValidateInput
							type='text'
							name='code'
							placeholder='Code'
							value={this.state.code}
							onChange={this.handleUserInput}
						/>
						<ValidateInput
							type='password'
							name='password'
							placeholder='Password'
							error={this.state.passwordError}
							value={this.state.password}
							onChange={this.handleUserInput}
							withEye={true}
						/>
						<ValidateInput
							type='password'
							name='confPassword'
							placeholder='Confirm Password'
							error={this.state.confPasswordError}
							value={this.state.confPassword}
							onChange={this.handleUserInput} 
							withEye={true}
						/>
						<SubmitButton
							type='submit'
							name='Send'
							error={this.state.success?'':'Invalid code'}
							className='button-reset'
							disabled={!this.state.formValid}
							onClick={this.sendAction}
						/>
					</form>
				</div>
			</Layout>
		);
	}
}
export default ChangePass;