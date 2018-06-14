import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';


const mapStateToProps = state => ({
    state,
    currentTrip: state.trip.currentTrip,
    user: state.user,
});

class CurrentTripIndicator extends Component {

    render() {
        return (
            <div className="CurrentTripIndicatorContainer">
                <Paper className="CurrentTripIndicator" elevation={4} square={true}>
                    {this.props.user.userName ?
                        this.props.currentTrip ?
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
                        :
                        <Typography className="subheading" variant="subheading">
                            Log in to plan your next camping adventure!
                        </Typography>
                    }


                </Paper >
            </div>

        );
    }
}

export default connect(mapStateToProps)(CurrentTripIndicator);