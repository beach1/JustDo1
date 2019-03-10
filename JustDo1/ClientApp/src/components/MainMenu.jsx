import React, { Component } from 'react';

class MainMenu extends Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <div className="main-menu">
        <p className='menu-label'>Just do</p>
        <div className='menu-h1'>
          <p>Priority</p>
          <img src='./img/arrow_down.png' alt='1'></img>
        </div>
        <p className={this.props.selected==0?'underline-paragraph':''} 
        onClick={()=>this.props.onAction(0)}>All</p>
        <p className={this.props.selected==1?'underline-paragraph':''} 
        onClick={()=>this.props.onAction(1)}>Urgently</p>
        <p className={this.props.selected==2?'underline-paragraph':''} 
        onClick={()=>this.props.onAction(2)}>Important</p>
        <p className={this.props.selected==3?'underline-paragraph':''} 
        onClick={()=>this.props.onAction(3)}>Normal</p>
        <p className={this.props.selected==4?'underline-paragraph':''} 
        onClick={()=>this.props.onAction(4)}>Neutral</p>
        <img className='add-img' src='img/ic_add.png' alt='2'></img>
      </div>
    );
  }
}
export default MainMenu;