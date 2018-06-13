import React, { Component } from 'react';
import { ArrowDropDown } from '@material-ui/icons'; // destructuring

const ButtonArrowDownWard = props => (
        <ArrowDropDown onClick={props.onClick}/>
);

export default ButtonArrowDownWard;