import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {API} from '../support/constants';
import {authHeader} from '../support/jwt';

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
      () => { this.validateField(name,value) });
  }

  validateField(fieldName,value) {
    let newPasswordValid = this.state.newPasswordValid;
    if (fieldName==='newPassword'){
        if (value.length===0) {
          this.setState({passwordError:''});
        } else if (!value.match(/^[A-Za-z\d@$!%*?&]{8,}/i)){
          this.setState({passwordError:'The password must be at least 8 characters'});
        } else if (!value.match(/^(?=.*[a-z])/i)){
          this.setState({passwordError:'The password must contain lowercase letters'});
        } else if (!value.match(/^(?=.*[A-Z])/i)){
          this.setState({passwordError:'The password must contain capital letters'});
        } else if (!value.match(/^(?=.*\d)/i)){
          this.setState({passwordError:'The password must contain digits'});
        } else if (!value.match(/^(?=.*[@$!%*?&])/i)){
          this.setState({passwordError:'The password must contain special characters'});
        } else {
          this.setState({passwordError:''});
          newPasswordValid = true;
        }
    }
    this.setState({newPasswordValid: newPasswordValid,
      confPasswordValid: (this.state.confPassword === this.state.newPassword)
    }, this.validateForm);
  }
  validateForm() {
    this.setState({formValid: this.state.newPasswordValid &&
      this.state.confPasswordValid&& this.state.password.length>=8});
  }
  sendAction(event){
    fetch(API+'/ChangePass',
     {
      method: 'POST',
      headers: authHeader(),
      body:JSON.stringify({
        newpassword:this.state.newPassword,
        password:this.state.password})})
      .then(response =>{
        console.log(response.status);
        if (!response.ok){
          this.setState({success:false});
         } else{
          this.props.history.push("/SignIn");
          localStorage.removeItem('user');
          this.changePage(1);
         }
      });
      event.preventDefault();
  }
  render() {
    return (
        <div className="reset-form">
          <img alt='1' className='left-arrow' onClick={()=>this.changePage(1)} src="./img/ic_arrow_left.png"></img>
          <div className="reset-label">Change Password</div>
          <form>
              <div className='with-eye'>
                  <input type='password' name='password' placeholder='Password'
                  value={this.state.password} onChange={this.handleUserInput} />
              </div>
              <div className='with-eye'>
                  <input type='password' name='newPassword' placeholder='New password'
                  value={this.state.newPassword} onChange={this.handleUserInput} />
                  <p className='texterror'>{this.state.passwordError}</p>
              </div>
              <div className='with-eye'>
                  <input type='password' name='confPassword' placeholder='Confirm Password'
                  value={this.state.confPassword} onChange={this.handleUserInput} />
                  <p className='texterror'>{(this.state.confPassword === this.state.newPassword)?'':'Password do not match'}</p>
                  <p className='validerror'>{this.state.success?'':'Invalid Password'}</p>
              </div>
              <button type='submit' className='button-reset'
               disabled={!this.state.formValid} onClick={this.sendAction}>Change Password</button>
          </form>
        </div>
    );
  }
}
export default withRouter(ChangePassword);