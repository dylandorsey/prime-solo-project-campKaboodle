import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { DeleteForever } from '@material-ui/icons';

const ButtonDeleteForever = props => (
    <Button
        onClick={props.onClick}
    >
        <DeleteForever />
    </Button>
);

export default ButtonDeleteForever;