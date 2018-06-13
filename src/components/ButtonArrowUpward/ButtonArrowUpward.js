import React, { Component } from 'react';
import { ArrowDropUp } from '@material-ui/icons';

const ButtonArrowUpward = props => (
        <ArrowDropUp onClick={props.onClick}/>
);

export default ButtonArrowUpward;