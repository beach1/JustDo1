import React, { Component } from 'react';
const API = '/api/app';

class ForgotPass extends Component {

  constructor (props) {
    super(props);
    this.state = {
      email: '',
      emailValid: false,
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
      () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let emailValid = this.state.emailValid;
        emailValid = value.match(/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/i);
    this.setState({emailValid: emailValid});
  }
  sendAction(event){
    fetch(API+'/ForgetPass',
     {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        email:this.state.email,
        password:''})})
      .then(response =>{
        console.log(response.status);
        if (!response.ok){
          this.setState({success:false});
         } else{
          this.setState({success:true});
          this.changePage(6);
         }
      });
      event.preventDefault();
  }
  render() {
    return (
        <div className="valid-form">
          <img alt='1' className='left-arrow forget-arrow' onClick={()=>this.changePage(1)} src="./img/ic_arrow_left.png"></img>
          <div className="forget-label">Forgot Password</div>
          <div className="forget-description">Please enter your email to recieve your<br></br> password reset instructions</div>
          <form>
            <div className='with-eye'>
              <input type='email' name='email' placeholder='Email' value={this.state.email} onChange={this.handleUserInput} />
              <p className='validerror'>{this.state.success?'':'Email does not contains'}</p>
            </div>
              <button type='submit' className='button-forget' disabled={!this.state.emailValid} onClick={this.sendAction}>Send</button>
          </form>
        </div>
    );
  }
}
export default ForgotPass;