import React, { Component } from 'react';
import StartBg from './StartBg';
import ValidPart from './ValidPart';

class StartPage extends Component {
	constructor (props) {
		super(props);
		this.changePage=this.changePage.bind(this);
	}

	changePage(){
		this.props.changePage(1);
	}

	render() {
		return (
			<div className="start-page">
				<StartBg></StartBg>
				<ValidPart changePage={this.changePage}></ValidPart>
			</div>
		);
	}
}
  export default StartPage;