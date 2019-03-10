import React, { Component } from 'react';

class Terms extends Component {

  constructor (props) {
    super(props);
    this.state = {
    }
    this.changePage=this.changePage.bind(this);
  }

  changePage(pageValue){
      this.props.changePage(pageValue);
  }

  render() {
    return (
        <div className="terms-form">
        <div className="terms-header">
          <img alt='1' className='left-arrow' onClick={()=>this.changePage(1)} src="./img/ic_arrow_left.png"></img>
          <div className="terms-title">Terms Conditions</div>
        </div>
            <div className="terms-text">
            <p></p>These terms and conditions («Terms», «Agreement») are an agreement between Mobile Application Developer
             («Mobile Application Developer», «us», «we» or «our») and you («User», «you» or «your»). This Agreement sets forth
              the general terms and conditions of your use of the Mentalstack mobile application and any of its products or services
              (collectively, «Mobile Application» or «Services»).
               <p className="terms-subtitle">Accounts and membership</p>
                You must be at least 13 years of age to use this
              Mobile Application. By using this Mobile Application and by agreeing to this Agreement you warrant and represent that you are
              at least 13 years of age. If you create an account in the Mobile Application, you are responsible for maintaining the security
              of your account and you are fully responsible for all activities that occur under the account and any other actions taken in
              connection with it. Providing false contact information of any kind may result in the termination of your account. You must
              immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for
              any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions. We may suspend,
              disable, or delete your account (or any part thereof) if we determine that you have violated any provision of this Agreement or
              that your conduct or content would tend to damage our reputation and goodwill. If we delete your account for the foregoing
              reasons, you may not re-register for our Services. We may block your email address and Internet protocol address to prevent
              further registration. 
              <p className="terms-subtitle">User content</p>
               We do not own any data, information or material («Content») that you submit in the Mobile
              Application in the course of using the Service. You shall have sole responsibility for the accuracy, quality, integrity,
              legality, reliability, appropriateness, and intellectual property ownership or right to use of all submitted Content.
              We may, but have no obligation to, monitor Content in the Mobile Application submitted or created using our Services
              by you. Unless specifically permitted by you, your use of the Mobile Application does not grant us the license to use,
              reproduce, adapt, modify, publish or distribute the Content created by you or stored in your user account for
              commercial, marketing or any similar purpose. But you grant us permission to access, copy, distribute, store,
              transmit, reformat, display and perform the Content of your user account solely as required for the purpose of
              providing the Services to you.<p></p>
            </div>
        </div>
    );
  }
}
export default Terms;