import React, { Component } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Terms from './Terms';
import PrivacyPolicy from './PrivacyPolicy';
import ForgotPass from './ForgotPass';
import ResetPass from './ResetPass';


class ValidPart extends Component {

  constructor (props) {
    super(props);
    this.state = {
      page:1
    }
    this.setPage=this.setPage.bind(this);
  }
  setPage(pageValue){
    this.setState({page:pageValue});
  }

  render() {
    switch(this.state.page){
      case 1:
        return (
          <div className="valid-part">
            <SignIn changePage={this.setPage}></SignIn>
          </div>
        );
      case 2:
        return (
          <div className="terms-part">
            <Terms changePage={this.setPage}></Terms>
          </div>
        );
      case 3:
          return(
            <div className="privacy-part">
              <PrivacyPolicy changePage={this.setPage}></PrivacyPolicy>
            </div>
            );
      case 4:
          return(
            <div className="valid-part">
              <SignUp changePage={this.setPage}></SignUp>
          </div>
          );
      case 5:
          return(
            <div className="valid-part">
              <ForgotPass changePage={this.setPage}></ForgotPass>
          </div>
          );
      case 6:
          return(
            <div className="valid-part">
              <ResetPass changePage={this.setPage}></ResetPass>
            </div>
          )
      default:
        break;
    }
  }
}
export default ValidPart;