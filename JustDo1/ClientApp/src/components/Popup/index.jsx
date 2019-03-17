import React, { Component } from 'react';

import './popup.css';

class Popup extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen:false,
        }
        this.handleClick=this.handleClick.bind(this);
        this.onImageClick=this.onImageClick.bind(this);
        this.onDivClick=this.onDivClick.bind(this);        
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

    onImageClick() {
        if (this.props.wrappedImage) {
            return;
        }
        this.setState((prevState)=>({isOpen:!prevState.isOpen}));
    }
    onDivClick() {
        if (!this.props.wrappedImage) {
            return;
        }
        this.setState((prevState)=>({isOpen:!prevState.isOpen}));
    }
    
    render() {
        return(
			<div
                onClick={this.onDivClick}
				className={this.props.classNameDiv}
				ref={(ref)=>this.node=ref}
			>
                {this.state.isOpen ? this.props.children:null}
                <img
                    alt='1'
					onClick={this.onImageClick}
					className={this.props.className}
					src={this.props.src}
				/>
            </div>
        )
    }
}
export default Popup

Popup.defaultProps = {
    wrappedImage:false
  };

