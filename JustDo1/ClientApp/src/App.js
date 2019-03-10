import React, { Component } from 'react';
import StartPage from './components/StartPage';
import MainPage from './components/MainPage';
import Test from './components/Test';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import {getJwt} from './support/jwt';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      redirect:false
    }
  }
  checkAuth(){
    var jwt = getJwt();
    if (!jwt){
      return false;
    }
    return true;
  }
  render() {
    return(
    <BrowserRouter>
      <Switch>
        <Route path="/signin" exact component={StartPage}></Route>
        <Route path="/" exact render={()=> this.checkAuth() ? <MainPage></MainPage>: <StartPage></StartPage>}></Route>
      </Switch>
    </BrowserRouter>
    )
  }
}
export default App;
