import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class PopupSign extends Component{
    constructor(props){
        super(props);
        this.state={
            isOpen:false,
        }
        this.handleClick=this.handleClick.bind(this);
		this.onDivClick=this.onDivClick.bind(this);
		this.onSignOut=this.onSignOut.bind(this);
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
    }
    
    render(){
        return(
			<div onClick={this.onDivClick}
			 className={this.props.className}
			 ref={(ref)=>this.node=ref}>
                {this.state.isOpen && 
                <div className={this.props.classNamePopup}>
                    <Link to='change-pass'>
                        <p>
                            Change Password
                        </p>
                    </Link>
                    <Link to='/'>
                        <p onClick={this.onSignOut}>
                            Sign Out
                        </p>
                    </Link>
                </div>}
                <img src={this.props.src}/>
            </div>
        )
    }
}
export default PopupSign