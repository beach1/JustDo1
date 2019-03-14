import React from 'react';
import {MainMenu} from './MainMenu';

export const MainLayout = (props) => (
    <div className="main-page">
        <MainMenu/>
        {props.children}
	</div>
)