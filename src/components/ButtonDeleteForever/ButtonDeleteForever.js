import React, { Component } from 'react';
import { DeleteForever } from '@material-ui/icons';

const ButtonDeleteForever = props => (
        <DeleteForever onClick={props.onClick} />
);

export default ButtonDeleteForever;