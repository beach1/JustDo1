import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {API} from '../support/constants';

class SignIn extends Component {

  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailValid: false,
      passwordValid: false,
      formValid: false,
      hidden:true,
      success:true
    }
    this.handleUserInput = this.handleUserInput.bind(this); 
    this.changePage = this.changePage.bind(this);
    this.signIn = this.signIn.bind(this);
    this.toggleShow = this.toggleShow.bind(this);

  }
  changePage(pageValue){
      this.props.changePage(pageValue);
  }
  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, 
      () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let emailValid = this.state.emailValid;
    if (fieldName==='email'){
      emailValid = value.match(/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/i);
    }
    this.setState({emailValid: emailValid
    });
  }
  signIn(event){
    fetch(API+'/SignIn',
     {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        email:this.state.email,
        password:this.state.password})})
      .then(response =>{
        return response.text();
      }).then(text =>{
        console.log(text);
        localStorage.setItem('user',text);
        this.setState({success:true});
        this.props.history.push("/");
      })
      event.preventDefault();
  }

  render() {
    return (
      <div className="valid-form">
         <div className="sign">Sign in</div>
         <form>
            <input type='email' name='email' placeholder='E-mail'
             value={this.state.email} onChange={this.handleUserInput} />
            <div className='with-eye'>
            <input type={this.state.hidden ? 'password' : 'text'} name='password' placeholder='Password'
             value={this.state.password} onChange={this.handleUserInput} />
             <img alt='1' onClick={this.toggleShow} className={this.state.hidden? 'icon-eye':'icon-eye-novis'}></img>
             <p className='validerror'>{this.state.success?'':'Invalid credentials'}</p>
            </div>
            <div className="forgot-link">
               <a onClick={()=> this.changePage(5)}>Forgot password?</a>
            </div>
            <button className="button-submit" type='submit' disabled={!this.state.emailValid}
             onClick={this.signIn}>Sign In</button>
            <div className="signup-link">
               <a onClick={()=>this.changePage(4)}>Sign up</a>
            </div>
         </form>
         <div className="start-footer">
            By accessing your account, you agree to our<br></br>
            <a onClick={()=> this.changePage(2)}>Terms conditions</a> and <
              a onClick={()=> this.changePage(3)}>Privacy Policy</a>
         </div>
      </div>
    );
  }
}
export default withRouter(SignIn);