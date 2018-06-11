import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ArrowUpward } from '@material-ui/icons'; // destructuring

const ButtonArrowUpward = props => (
    <Button
        onClick={props.onClick}
    >
        <ArrowUpward />
    </Button>
);

export default ButtonArrowUpward;