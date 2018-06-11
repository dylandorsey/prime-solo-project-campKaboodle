import React, { Component } from 'react';
import { ArrowUpward } from '@material-ui/icons'; // destructuring

const ButtonArrowUpward = props => (
        <ArrowUpward onClick={props.onClick}/>
);

export default ButtonArrowUpward;