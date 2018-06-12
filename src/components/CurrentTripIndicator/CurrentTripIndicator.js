import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';


const mapStateToProps = state => ({
    state,
    currentTrip: state.trip.currentTrip,
});

class CurrentTripIndicator extends Component {

    render() {
        return (
            <div className="CurrentTripIndicatorContainer">
                <Paper className="CurrentTripIndicator" elevation={8} square={true}>
                    {this.props.currentTrip ?
                        <Typography className="subheading" variant="subheading"
                            component={Link}
                            to='trip-overview'>
                            {this.props.currentTrip.name}
                        </Typography>
                        :
                        <Typography className="subheading" variant="subheading"
                            component={Link}
                            to='user-trip-list'>
                            View your trips
                    </Typography>
                    }
                </Paper >
            </div>

        );
    }
}

export default connect(mapStateToProps)(CurrentTripIndicator);