import React, { Component } from 'react';

class ImportantWrapper extends Component{
    constructor(props){
        super(props);
        this.state={
            isOpen:false,
            currentValue:'1 hour'
        }
        this.handleClick=this.handleClick.bind(this);
        this.selectImportant=this.selectImportant.bind(this);
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
    selectImportant(e){
        let value=e.currentTarget.textContent;
        this.props.getValue(value);
        this.setState((prevState)=>
            ({currentValue:value,
            isOpen:!prevState.isOpen}));
    }

    onImageClick(){
        this.setState((prevState)=>({isOpen:!prevState.isOpen}));
    }
    
    render(){
        let props=this.props;
        return(
            <div className={props.classNameDiv} ref={(ref)=>this.node=ref}>
                {this.state.isOpen &&
                    <div className={props.className}>
                        {props.values.map((value,index)=>
                            <div onClick={this.selectImportant}
                            key={value} name={value}
                            style={this.state.currentValue==value ? 
                            {color:'#2F80ED'}:{color:'#212020'}}>{value}
                            </div>)}
                    </div>}
                <img onClick={()=>this.onImageClick()}
                src={this.props.src}></img>
            </div>
        )
    }
}
export default ImportantWrapper

