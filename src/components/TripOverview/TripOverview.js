import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import ButtonAddCircleOutline from '../ButtonAddCircleOutline/ButtonAddCircleOutline';
import Nav from '../../components/Nav/Nav';
import HamburgerMenuButton from '../HamburgerMenuButton/HamburgerMenuButton';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { TRIP_ACTIONS } from '../../redux/actions/tripActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
    user: state.user,
    trips: state.trip.userTrips,
    currentTrip: state.trip.currentTrip,
    gear: state.gear,
});

class TripOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inviteOthers: false,
            inviteeUsername: '',
        }
    }

    clearInput = () => {
        this.setState({
            ...this.state,
            inviteeUsername: '',
        });
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: TRIP_ACTIONS.FETCH_USER_TRIPS });
        this.props.dispatch({ type: TRIP_ACTIONS.START_SAGA_SET_CURRENT_TRIP });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    handleChangeFor = propertyName => event => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    handleClickInviteOtherFolks = () => {
        this.setState({
            inviteOthers: !this.state.inviteOthers,
        })
    }

    handleSubmitInviteCamper = event => {
        event.preventDefault();
        this.props.dispatch({
            type: TRIP_ACTIONS.INVITE_USER,
            payload: {
                inviteeUsername: this.state.inviteeUsername,
                trip_id: this.props.currentTrip.id,
            },
        });
        this.clearInput();
    }

    logout = () => {
        this.props.dispatch(triggerLogout());
        // this.props.history.push('home');
    }

    navToTripCamperList = () => {
        this.props.history.push('trip-camper-list');
    }

    navToTripGearList = () => {
        this.props.history.push('trip-gear-list');
    }

    navToTripOverview = () => {
        this.props.history.push('trip-overview');
    }

    navToUserMainMenu = () => {
        console.log('init navToUserMainMenu');
        this.props.history.push('user-main-menu');
    }

    submitHandler = event => {
        event.preventDefault();

    }

    render() {
        let content = null;
        let currentTrip = this.props.currentTrip;

        if (this.props.user.userName) {
            content = (
                <div>
                    <HamburgerMenuButton navToUserMainMenu={this.navToUserMainMenu} />
                    <h1
                        id=""
                    >
                        Trip Overview
                    </h1>

                    {/* <ViewSelector
                        handleChangeFor={this.handleChangeFor}
                        navToTripOverview={this.navToTripOverview}
                        navToTripGearList={this.navToTripGearList}
                    /> */}
                    {this.props.currentTrip ?
                        <Paper>
                            <form onSubmit={this.submitHandler}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Trip Name</TableCell>
                                            <TableCell>{currentTrip.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Location</TableCell>
                                            <TableCell>{currentTrip.location}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Meetup Time</TableCell>
                                            <TableCell>
                                                {currentTrip.meetup_time}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Meetup Spot</TableCell>
                                            <TableCell>{currentTrip.meetup_spot}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Exit Time</TableCell>
                                            <TableCell>{currentTrip.exit_time}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Exit Spot</TableCell>
                                            <TableCell>{currentTrip.exit_spot}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Trip Gear</TableCell>
                                            <TableCell><button onClick={this.navToTripGearList}>View gear</button></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Campers</TableCell>
                                            <TableCell><button onClick={this.navToTripCamperList}>View campers</button></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <input type="submit" value="edit trip"></input>
                            </form>
                            {/* WHALEHUNTER this button does not call the function upon click - figure out why! */}
                            {/* <ButtonAddCircleOutline onClick={() => {this.handleClickInviteOtherFolks}} text="Invite Other Folks"/> */}
                            <button onClick={this.handleClickInviteOtherFolks}>Invite other Folks</button>
                            {this.state.inviteOthers ?
                                <div>
                                <form onSubmit={this.handleSubmitInviteCamper}>
                                    <input type="text" 
                                    onChange={this.handleChangeFor('inviteeUsername')} 
                                    placeholder="input username here"
                                    value={this.state.inviteeUsername}>
                                    </input>
                                    <input type="submit" value="Invite user"></input>
                                </form>
                                {/* WHALEHUNTER this button does not call the function upon click - figure out why! */}
                                {/* <ButtonAddCircleOutline onClick={()=> {this.handleSubmitInviteCamper}}/> */}
                                </div>
                                :
                                ''}
                        </Paper>
                        :
                        <p>Select a trip</p>
                    }
                    <button
                        onClick={this.logout}
                    >
                        Log Out
          </button>
                </div>
            );
        }
        return (
            <div>
                <Nav />
                {content}
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TripOverview);