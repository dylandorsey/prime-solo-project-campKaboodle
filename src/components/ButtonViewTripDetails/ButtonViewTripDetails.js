import React, { Component } from 'react';
import { Pageview } from '@material-ui/icons';

const ButtonViewTripDetails = props => (
        <Pageview onClick={props.onClick} />
);

export default ButtonViewTripDetails;