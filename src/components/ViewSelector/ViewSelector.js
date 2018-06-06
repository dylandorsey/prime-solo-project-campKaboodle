import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    user: state.user,
    trips: state.trip.userTrips,
});

class ViewSelector extends Component {

    render() {
        return (
            <div>
            <select onChange={this.props.handleChangeFor('selectedTrip')}>
                {this.props.trips.map((item, i) => <option key={i} value={i} >{item.name}</option>)}
            </select>
            <select>
                <option onChange={this.props.navToTripOverview}>Trip Overview</option>
                <option onChange={this.props.navToTripGearList}>Gear List</option>
            </select>
        </div>
        );
    }
}

export default connect(mapStateToProps)(ViewSelector);