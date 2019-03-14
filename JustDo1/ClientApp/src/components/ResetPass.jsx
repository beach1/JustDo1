import React, { Component } from 'react';
import {APIIdentity} from '../support/constants';
import {Link} from 'react-router-dom';
import {validatePassword} from '../support/validatePassword';
import { StartLayout } from './StartLayout';
import history from '../support/history';

class ChangePass extends Component {

	constructor (props) {
		super(props);
		this.state = {
			code: '',
			password:'',
			confPassword:'',
			confPasswordError:'',
			passwordError:'',
			hiddenPass:true,
			hiddenConf:true,
			codeValid:false,
			passwordValid: false,
			confPasswordValid:false,
			formValid:false,
			success:true
		}
		this.handleUserInput = this.handleUserInput.bind(this); 
		this.changePage = this.changePage.bind(this);
		this.sendAction=this.sendAction.bind(this);
		this.toggleShowPass = this.toggleShowPass.bind(this);
		this.toggleShowConf = this.toggleShowConf.bind(this);

	}

	toggleShowPass() {
		this.setState({ hiddenPass: !this.state.hiddenPass });
	}

	toggleShowConf() {
		this.setState({ hiddenConf: !this.state.hiddenConf });
	}

	changePage(pageValue){
			this.props.changePage(pageValue);
	}

	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		let obj = {...this.state};
		obj[name] = value;
		switch (name) {
			case 'code':
				obj.codeValid = obj[name].length ==6 ? true:false;
				break;
			case 'password':
				obj.passwordError = validatePassword(value);
				obj.passwordValid = obj.passwordError=='' ? true : false;
				break;
			case 'confPassword':
				obj.confPasswordValid = obj.confPassword == obj.password ? true : false;
				obj.confPasswordError = obj.confPasswordValid ? '' : 'Password do not match';
				break;
			default:
				break;
		}
		obj.formValid = (obj.codeValid && obj.passwordValid && obj.confPasswordValid) ? true : false;
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
			<StartLayout>
				<div className="reset-form">
					<Link to='/'>
						<img alt='1' className='left-arrow'
							src="./img/ic_arrow_left.png"/>
					</Link>
					<div className="reset-label">Forgot Password</div>
					<div className="reset-description">
						Reset code was sent to your Email. Please enter the code and create new password
					</div>
					<form>
						<input type='text' name='code'
						 placeholder='Code' value={this.state.code}
						 onChange={this.handleUserInput} />
						<div className='with-eye'>
								<input type={this.state.hiddenPass ? 'password' : 'text'}
								 name='password' placeholder='Password'
								 value={this.state.password} onChange={this.handleUserInput} />
								<img alt='2' onClick={this.toggleShowPass}
								 className={this.state.hiddenPass? 'icon-eye':'icon-eye-novis'}/>
								<p className='texterror'>{this.state.passwordError}</p>
						</div>
						<div className='with-eye'>
								<input type={this.state.hiddenConf ? 'password' : 'text'}
								 name='confPassword' placeholder='Confirm Password'
								 value={this.state.confPassword} onChange={this.handleUserInput} />
								<img alt='3' onClick={this.toggleShowConf}
								 className={this.state.hiddenConf? 'icon-eye':'icon-eye-novis'}/>
								<p className='texterror'>
									{this.state.confPasswordError}
								</p>
								<p className='validerror'>
									{this.state.success?'':'Invalid code'}
								</p>
						</div>
						<button type='submit' className='button-reset'
							disabled={!this.state.formValid} onClick={this.sendAction}>
							Change Password
						</button>
					</form>
				</div>
			</StartLayout>
		);
	}
}
export default ChangePass;