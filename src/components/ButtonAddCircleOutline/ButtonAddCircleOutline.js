import React, { Component } from 'react';
import { AddCircleOutline } from '@material-ui/icons'; // destructuring

const ButtonAddCircleOutline = props => (
        <AddCircleOutline onClick={props.onClick}/>
);

export default ButtonAddCircleOutline;