import React, { Component } from 'react';
import {Router,Switch,Route} from 'react-router-dom';
import history from './support/history';
import MainPage from './components/MainPage';
import {checkAuth} from './support/jwt';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {Terms} from './components/Terms';
import {PrivacyPolicy} from './components/PrivacyPolicy';
import ForgetPass from './components/ForgetPass';
import ResetPass from './components/ResetPass';
import ChangePassword from './components/ChangePassword';


class App extends Component {
	constructor (props) {
	super(props);
	}

	render() {
		return (
			<Router history={history}>
				<Switch>
					<Route path="/signin" exact render={()=> checkAuth() ? <MainPage></MainPage>: <SignIn/>}/>
					<Route path="/" exact render={()=> checkAuth() ? <MainPage></MainPage>: <SignIn/>}/>
					<Route path="/signup" exact render={()=> checkAuth() ? <MainPage/>: <SignUp/>}/>
					<Route path="/privacy-policy" exact render={()=> checkAuth() ? <MainPage/>: <PrivacyPolicy/>}/>
					<Route history={history} path="/terms-conditions" exact render={()=> checkAuth() ? <MainPage/>: <Terms/>}/>
					<Route path="/forget-pass" exact render={()=> checkAuth() ? <MainPage/>: <ForgetPass/>}/>
					<Route path="/reset-pass" exact render={()=> checkAuth() ? <MainPage/>: <ResetPass/>}/>
					<Route path="/change-pass" exact render={()=> checkAuth() ? <ChangePassword/>: <SignIn/>}/>
				</Switch>
			</Router>
		)
	}
}
export default App;
