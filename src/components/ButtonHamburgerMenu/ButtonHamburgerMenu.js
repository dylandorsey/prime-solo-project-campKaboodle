import React, { Component } from 'react';
import { Menu } from '@material-ui/icons';

const ButtonHamburgerMenu = props => (
        <Menu         onClick={props.onClick}/>
);

export default ButtonHamburgerMenu;