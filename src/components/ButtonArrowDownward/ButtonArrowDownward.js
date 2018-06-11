import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ArrowDownward } from '@material-ui/icons'; // destructuring

const ButtonArrowDownWard = props => (
    <Button
        onClick={props.onClick}
    >
        <ArrowDownward />
    </Button>
);

export default ButtonArrowDownWard;