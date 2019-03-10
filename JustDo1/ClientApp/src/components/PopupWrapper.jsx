import React, { Component } from 'react';

class PopupWrapper extends Component{
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

    onImageClick(){
        this.setState((prevState)=>({isOpen:!prevState.isOpen}));
    }
    
    render(){
        return(
            <div className={this.props.classNameDiv} ref={(ref)=>this.node=ref}>
                {this.state.isOpen ? this.props.children:null}
                <img onClick={()=>this.onImageClick()}
                 className={this.props.className} src={this.props.src}></img>
            </div>
        )
    }
}
export default PopupWrapper

