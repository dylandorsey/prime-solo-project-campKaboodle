import React, { Component } from 'react';
import { ArrowDownward } from '@material-ui/icons'; // destructuring

const ButtonArrowDownWard = props => (
        <ArrowDownward onClick={props.onClick}/>
);

export default ButtonArrowDownWard;