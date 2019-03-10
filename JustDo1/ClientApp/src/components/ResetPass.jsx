import React, { Component } from 'react';
const API = '/api/app';

class ChangePass extends Component {

  constructor (props) {
    super(props);
    this.state = {
      code: '',
      password:'',
      confPassword:'',
      passwordError:'',
      hiddenPass:true,
      hiddenConf:true,
      passwordValid: false,
      confPasswordValid:false,
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
    this.setState({[name]: value}, 
      () => { this.validateField(name,value) });
  }

  validateField(fieldName,value) {
    let passwordValid = this.state.passwordValid;
    if (fieldName==='password'){
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
          passwordValid = true;
        }
    }
    this.setState({passwordValid: passwordValid,
      confPasswordValid: (this.state.confPassword === this.state.password)
    }, this.validateForm);
  }
  validateForm() {
    this.setState({formValid: this.state.passwordValid &&
      this.state.confPasswordValid});
  }
  sendAction(event){
    fetch(API+'/ResetPass',
     {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        code:this.state.code,
        password:this.state.password})})
      .then(response =>{
        console.log(response.status);
        if (!response.ok){
          this.setState({success:false});
         } else{
          this.setState({success:true});
          this.changePage(1);
         }
      });
      event.preventDefault();
  }
  render() {
    return (
        <div className="reset-form">
          <img alt='1' className='left-arrow' onClick={()=>this.changePage(1)} src="./img/ic_arrow_left.png"></img>
          <div className="reset-label">Forgot Password</div>
          <div className="reset-description">Reset code was sent to your Email. Please enter the code and create new password</div>
          <form>
              <input type='text' name='code' placeholder='Code' value={this.state.code} onChange={this.handleUserInput} />
              <div className='with-eye'>
                  <input type={this.state.hiddenPass ? 'password' : 'text'} name='password' placeholder='Password'
                  value={this.state.password} onChange={this.handleUserInput} />
                  <img alt='2' onClick={this.toggleShowPass} className={this.state.hiddenPass? 'icon-eye':'icon-eye-novis'}></img>
                  <p className='texterror'>{this.state.passwordError}</p>
              </div>
              <div className='with-eye'>
                  <input type={this.state.hiddenConf ? 'password' : 'text'} name='confPassword' placeholder='Confirm Password'
                  value={this.state.confPassword} onChange={this.handleUserInput} />
                  <img alt='3' onClick={this.toggleShowConf} className={this.state.hiddenConf? 'icon-eye':'icon-eye-novis'}></img>
                  <p className='texterror'>{(this.state.confPassword === this.state.password)?'':'Password do not match'}</p>
                  <p className='validerror'>{this.state.success?'':'Invalid code'}</p>
              </div>
              <button type='submit' className='button-reset'
               disabled={!this.state.formValid} onClick={this.sendAction}>Change Password</button>
          </form>
        </div>
    );
  }
}
export default ChangePass;