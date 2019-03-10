import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class PopupSign extends Component{
    constructor(props){
        super(props);
        this.state={
            isOpen:false,
        }
        this.handleClick=this.handleClick.bind(this);
    }

    componentDidMount(){
        document.addEventListener('click', this.handleClick, false);
    }

    componentWillUnmount(){
        document.removeEventListener('click', this.handleClick, false);
    }

    handleClick(e) {
        if (!this.state.isOpen || this.node.contains(e.target)){
            return;
        }
        this.setState({isOpen:false});
    }

    onDivClick(){
        this.setState((prevState)=>({isOpen:!prevState.isOpen}));
    }

    onSignOut(){
        localStorage.removeItem('user');
        this.props.history.push('/SignIn');
    }
    
    render(){
        return(
			<div onClick={()=>this.onDivClick()}
			 className={this.props.className}
			 ref={(ref)=>this.node=ref}>
                {this.state.isOpen && 
                <div className={this.props.classNamePopup}>
                    <p onClick={()=>this.props.onChangePage(2)}>
						Change Password
					</p>
                    <p onClick={()=>this.onSignOut()}>
						Sign Out
					</p>
                </div>}
                <img src={this.props.src}></img>
            </div>
        )
    }
}
export default withRouter(PopupSign)