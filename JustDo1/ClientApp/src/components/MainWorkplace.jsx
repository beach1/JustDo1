import React, { Component } from 'react';
import TaskFooter from './TaskFooter';
import WorkplaceBody from './WorkplaceBody';
import PopupSign from './PopupSign';

export const MainWorkplace = ()=> (
    <div className='main-workplace'>
        <PopupSign className='workplace-header'
        classNamePopup='header-menu'
        src='./img/ic_menu.png'
        />
        <WorkplaceBody/>
        <TaskFooter/>
    </div>
);