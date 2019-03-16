import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import {APIIdentity} from '../../support/constants';
import {authHeader} from '../../support/jwt';
import {validatePassword} from '../../support/validatePassword';
import history from '../../support/history';
import './change-password.css';

import {Menu} from '../../components/Menu';
import { ValidateInput } from '../../components/ValidateInput';
import { SubmitButton } from '../../components/SubmitButton';

class ChangePassword extends Component {

	constructor (props) {
		super(props);
		this.state = {
			password:'',
			newPassword:'',
			confPassword:'',
			passwordError:'',
			confPasswordError:'',
			passwordValid: false,
			newPasswordValid:false,
			confPasswordValid:false,
			formValid:false,
			success:true
		}
		this.handleUserInput = this.handleUserInput.bind(this); 
		this.sendAction=this.sendAction.bind(this);

	}

	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		let obj={...this.state}
        obj[name] = value;
		switch (name) {
			case 'password':
				obj.passwordValid = (obj.password.length >=8);
				break;
            case 'newPassword':
				obj.newPasswordError = validatePassword(value);
                obj.newPasswordValid = obj.newPasswordError==='';
                obj.confPasswordValid = (value===obj.confPassword);
				obj.confPasswordError = obj.confPasswordValid ? '' : 'Password do not match';
				break;
			case 'confPassword':
				obj.confPasswordValid = (value === obj.newPassword);
				obj.confPasswordError = obj.confPasswordValid ? '' : 'Password do not match';
				break;
			default:
				break;
		}
        obj.formValid = (obj.passwordValid && obj.newPasswordValid && obj.confPasswordValid);
        console.log(obj.formValid);
		this.setState(obj);
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
			<div className='main'>
				<Menu/>
				<div className='changepass-content'>
                    <Link className='reset-arrow' to='/'>
                        <img
                            alt='1'
                            className='left-arrow'
                            src="./img/ic_arrow_left.png"
                        />
                    </Link>
                    <p className="reset-headline">
                        Change Password
                    </p>
                    <form>
                        <ValidateInput
                            type='password'
                            name='password' 
                            placeholder='Password'
                            value={this.state.password}
                            onChange={this.handleUserInput}
                        />
                        <ValidateInput
                            withEye={true}
                            type='password'
                            name='newPassword'
                            placeholder='New password'
                            error={this.state.newPasswordError}
                            value={this.state.newPassword}
                            onChange={this.handleUserInput} 
                        />
                        <ValidateInput
                            withEye={true}
                            type='password' 
                            name='confPassword'
                            placeholder='Confirm Password'
                            error={this.state.confPasswordError}
                            value={this.state.confPassword}
                            onChange={this.handleUserInput} 
                        />
                        <SubmitButton
                            type='submit'
                            name='Change Password'
                            error={this.state.success?'':'Invalid Password'}
                            className='button-reset'
                            disabled={!this.state.formValid}
                            onClick={this.sendAction}
                        />
                    </form>
                </div>
			</div>
		);
  	}
}
export default ChangePassword;