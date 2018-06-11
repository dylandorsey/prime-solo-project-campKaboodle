import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const ButtonLogin = props => (
    <Button
        onClick={props.onClick}
    >
        <Typography variant="button" gutterBottom>LOGIN</Typography>
    </Button>
);

export default ButtonLogin;