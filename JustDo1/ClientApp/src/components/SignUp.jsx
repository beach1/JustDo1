import React, { Component } from 'react';
import {APIIdentity} from '../support/constants';
import {Link} from 'react-router-dom';
import {validatePassword} from '../support/validatePassword';
import {validateEmail} from '../support/validateEmail';
import { StartLayout } from './StartLayout';
import history from '../support/history';

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
			hiddenPass:true,
			hiddenConf:true,
			success:true,
		}
		this.handleUserInput = this.handleUserInput.bind(this); 
		this.signUp=this.signUp.bind(this);
		this.toggleShowPass = this.toggleShowPass.bind(this);
		this.toggleShowConf = this.toggleShowConf.bind(this);

	}

	toggleShowPass() {
		this.setState({ hiddenPass: !this.state.hiddenPass });
	}

	toggleShowConf() {
		this.setState({ hiddenConf: !this.state.hiddenConf });
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
				obj.passwordValid = obj.passwordError=='' ? true : false;
				break;
			case 'confPassword':
				obj.confPasswordValid = obj.password==obj.confPassword ? true : false;
				obj.confPasswordError = obj.confPasswordValid ? '' : 'Password do not match';
				break;
			default:
				break;
		}
		obj.formValid = (obj.passwordValid && obj.emailValid && obj.confPasswordValid) ? true : false;
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
			<StartLayout>
                <div className='valid-form'>
                    <div className="sign">Sign up</div>
                    <form>
                        <div className='with-eye'>
                            <input type='email' name='email'
                            placeholder='Email' value={this.state.email}
                            onChange={this.handleUserInput} />
                            <p className='texterror'>{this.state.emailError}</p>
                        </div>
                        <div className='with-eye'>
                            <input type={this.state.hiddenPass ? 'password' : 'text'}
                            name='password' placeholder='Password' value={this.state.password}
                            onChange={this.handleUserInput} />
                            <img alt='1' onClick={this.toggleShowPass}
                            className={this.state.hiddenPass? 'icon-eye':'icon-eye-novis'}/>
                            <p className='texterror'>
                                {this.state.passwordError}
                            </p>
                        </div>
                        <div className='with-eye'>
                            <input type={this.state.hiddenConf ? 'password' : 'text'}
                            name='confPassword' placeholder='Confirm Password'
                            value={this.state.confPassword} onChange={this.handleUserInput} />
                            <img alt='2' onClick={this.toggleShowConf}
                            className={this.state.hiddenConf? 'icon-eye':'icon-eye-novis'}/>
                            <p className='texterror'>
                                {this.state.confPasswordError}
                            </p>
                            <p className='validerror'>
                                {this.state.success?'':'Email already exist'}
                            </p>
                        </div>
                        <button type='submit' className='button-submit'
                        disabled={!this.state.formValid} onClick={this.signUp}>
                            Submit
                        </button>
                        <div className="sign-link">
                            I already have account. <Link to='/signin'>Sign in</Link>
                        </div>
                    </form>
                    <div className="start-footer">
                        By accessing your account, you agree to our<br></br>
                        <Link to='/terms-condition'>Terms conditions
                        </Link> and <Link to='/privacy-policy'>Privacy Policy</Link>
                    </div>
                </div>
            </StartLayout>
		);
	}
}
export default SignUp;