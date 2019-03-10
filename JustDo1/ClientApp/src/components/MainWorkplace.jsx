import React, { Component } from 'react';
import TaskFooter from './TaskFooter';
import WorkplaceBody from './WorkplaceBody';
import ChangePassword from './ChangePassword';
import PopupSign from './PopupSign';



class MainWorkplace extends Component {
    constructor (props) {
        super(props);
        this.state = {
            page:1
        }
        this.changePage=this.changePage.bind(this);
      }

    changePage(page){
        this.setState({
            page:page
        })
    }

    render() {
    switch(this.state.page){
        case 1:
            return (
                <div className='main-workplace'>
                    <PopupSign className='workplace-header'
                    classNamePopup='header-menu'
                    src='./img/ic_menu.png'
                    onChangePage={this.changePage}
                    >
                    </PopupSign>
                    <WorkplaceBody></WorkplaceBody>
                    <TaskFooter></TaskFooter>
                </div>
            );
        case 2:
                return (
                <div className='main-change-workplace'>
                    <ChangePassword changePage={this.changePage}></ChangePassword>
                </div>
            );   
        default:
            break;
        }
    }
}
export default MainWorkplace;