import React, { Component } from 'react';
import {Router,Switch,Route} from 'react-router-dom';
import history from './support/history';

import {checkAuth} from './support/jwt';
import ChangePassword from './pages/ChangePassword/index';
import ForgetPass from './pages/ForgetPass';
import Main from './pages/Main';
import {PrivacyPolicy} from './pages/PrivacyPolicy'
import ResetPass from './pages/ResetPass';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import {TermsAndConditions} from './pages/TermsAndConditions';


class App extends Component {

	render() {
		return (
			<Router history={history}>
				<Switch>
					<Route path="/signin" exact render={()=> checkAuth() ? <Main />: <SignIn/>}/>
					<Route path="/" exact render={()=> checkAuth() ?  <Main />: <SignIn/>}/>
					<Route path="/signup" exact render={()=> checkAuth() ? <Main/>: <SignUp/>}/>
					<Route path="/privacy-policy" exact render={()=> checkAuth() ? <Main/>: <PrivacyPolicy/>}/>
					<Route path="/terms-conditions" exact render={()=> checkAuth() ? <Main/>: <TermsAndConditions/>}/>
					<Route path="/forget-pass" exact render={()=> checkAuth() ? <Main/>: <ForgetPass/>}/>
					<Route path="/reset-pass" exact render={()=> checkAuth() ? <Main/>: <ResetPass/>}/>
					<Route path="/change-pass" exact render={()=> checkAuth() ? <ChangePassword/>: <SignIn/>}/>
				</Switch>
			</Router>
		)
	}
}
export default App;
