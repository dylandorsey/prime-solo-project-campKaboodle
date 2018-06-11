import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { AddCircleOutline } from '@material-ui/icons'; // destructuring

const ButtonAddCircleOutline = props => (
    <Button
    >
        <AddCircleOutline />
        {props.text}
    </Button>
);

export default ButtonAddCircleOutline;