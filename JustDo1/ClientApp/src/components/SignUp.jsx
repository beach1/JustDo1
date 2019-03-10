import React, { Component } from 'react';
const API = '/api/app';

class SignUp extends Component {

  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confPassword: '',
      emailError:'',
      passwordError:'',
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
    this.changePage = this.changePage.bind(this);
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
  changePage(pageValue){
      this.props.changePage(pageValue);
  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, 
      () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
  switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/i);
        if (value.length===0) {
          this.setState({emailError:''});
          break;
        } else if (!emailValid){
          this.setState({emailError:'This address does not exist'});
          break;
        } else{
          this.setState({emailError:''});
          break;
        }
      case 'password':
        if (value.length===0) {
          this.setState({passwordError:''});
          break;
        } else if (!value.match(/^[A-Za-z\d@$!%*?&]{8,}/i)){
          this.setState({passwordError:'The password must be at least 8 characters'});
          break;
        } else if (!value.match(/^(?=.*[a-z])/i)){
          this.setState({passwordError:'The password must contain lowercase letters'});
          break;
        } else if (!value.match(/^(?=.*[A-Z])/i)){
          this.setState({passwordError:'The password must contain capital letters'});
          break;
        } else if (!value.match(/^(?=.*\d)/i)){
          this.setState({passwordError:'The password must contain digits'});
          break;
        } else if (!value.match(/^(?=.*[@$!%*?&])/i)){
          this.setState({passwordError:'The password must contain special characters'});
          break;
        } else {
          this.setState({passwordError:''});
          passwordValid = true;
          break;
        }
      default:
        break;
    }
    this.setState({ emailValid: emailValid,
                    passwordValid: passwordValid,
                    confPasswordValid: (this.state.confPassword === this.state.password)
                  }, this.validateForm);
  }
  validateForm() {
    this.setState({formValid: this.state.emailValid &&
                              this.state.passwordValid &&
                              this.state.confPasswordValid});
  }
  signUp(event){
    fetch(API+'/SignUp',
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
       console.log(response);
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
        <div className="valid-form">
            <div className="sign">Sign up</div>
            <form>
                <div className='with-eye'>
                  <input type='email' name='email' placeholder='Email'
                  value={this.state.email} onChange={this.handleUserInput} />
                  <p className='texterror'>{this.state.emailError}</p>
                </div>
                <div className='with-eye'>
                  <input type={this.state.hiddenPass ? 'password' : 'text'} name='password' placeholder='Password'
                  value={this.state.password} onChange={this.handleUserInput} />
                  <img alt='1' onClick={this.toggleShowPass} className={this.state.hiddenPass? 'icon-eye':'icon-eye-novis'}></img>
                  <p className='texterror'>{this.state.passwordError}</p>
                </div>
                <div className='with-eye'>
                  <input type={this.state.hiddenConf ? 'password' : 'text'} name='confPassword' placeholder='Confirm Password'
                  value={this.state.confPassword} onChange={this.handleUserInput} />
                  <img alt='2' onClick={this.toggleShowConf} className={this.state.hiddenConf? 'icon-eye':'icon-eye-novis'}></img>
                  <p className='texterror'>{(this.state.confPassword === this.state.password)?'':'Password do not match'}</p>
                  <p className='validerror'>{this.state.success?'':'Email already exist'}</p>
                </div>
                <button type='submit' className='button-submit' disabled={!this.state.formValid}
                 onClick={this.signUp}>Submit</button>
                <div className="sign-link">
                    I already have account. <a onClick={()=>this.changePage(1)}>Sign in</a>
                </div>
            </form>
            <div className="start-footer">
                By accessing your account, you agree to our<br></br>
                <a onClick={()=> this.changePage(2)}>Terms conditions</a
                > and <a onClick={()=> this.changePage(3)}>Privacy Policy</a>
            </div>
        </div>
    );
  }
}
export default SignUp;