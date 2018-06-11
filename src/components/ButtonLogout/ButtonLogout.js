import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const ButtonLogout = props => (
    <Button
        onClick={props.onClick}
    >
        <Typography variant="button" gutterBottom>LOGOUT</Typography>
    </Button>
);

export default ButtonLogout;