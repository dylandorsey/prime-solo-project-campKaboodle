import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const ButtonRegister = props => (
    <Button
        onClick={props.onClick}
    >
        <Typography variant="button" gutterBottom>REGISTER</Typography>
    </Button>
);

export default ButtonRegister;