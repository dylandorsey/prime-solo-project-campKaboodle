
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import '../../styles/main.css';

const mapStateToProps = state => ({
    state,
    currentTrip: state.trip.currentTrip,
});

class CurrentViewIndicator extends Component {

    render() {
        return (
            <Paper className="CurrentViewIndicator" elevation={10}  square="true">
                    <Typography vanriant="subheading">
                        {this.props.currentViewName}
                    </Typography>
            </Paper >

        );
    }
}

export default connect(mapStateToProps)(CurrentViewIndicator);