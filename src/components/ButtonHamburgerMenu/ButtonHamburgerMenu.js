import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Menu } from '@material-ui/icons'; // destructuring

const ButtonHamburgerMenu = props => (
    <Button
        onClick={props.onClick}
    >
        <Menu />
    </Button>
);

export default ButtonHamburgerMenu;