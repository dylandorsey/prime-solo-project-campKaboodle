import React, { Component } from 'react';
import { Info } from '@material-ui/icons';

const ButtonAbout = props => (
    <Info onClick={props.onClick} />

);

export default ButtonAbout;