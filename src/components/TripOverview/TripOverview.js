import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';



import ButtonAddCamper from '../ButtonAddCamper/ButtonAddCamper';
import ButtonSendInvitation from '../ButtonSendInvitation/ButtonSendInvitation';
import ButtonViewCampers from '../ButtonViewCampers/ButtonViewCampers';
import ButtonViewList from '../ButtonViewList/ButtonViewList';
import Nav from '../../components/Nav/Nav';
import Snackbar from '@material-ui/core/Snackbar';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { TRIP_ACTIONS } from '../../redux/actions/tripActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import { Typography } from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
    trip: state.trip,
    currentTrip: state.trip.currentTrip,
    gear: state.gear,

});

const styles = theme => ({
    root: {
        position: 'relative',
        overflow: 'hidden',
    },
    appFrame: {
        width: 360,
        height: 360,
        backgroundColor: theme.palette.background.paper,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    button: {
        marginBottom: theme.spacing.unit,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    fabMoveUp: {
        transform: 'translate3d(0, -46px, 0)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.enteringScreen,
            easing: theme.transitions.easing.easeOut,
        }),
    },
    fabMoveDown: {
        transform: 'translate3d(0, 0, 0)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.leavingScreen,
            easing: theme.transitions.easing.sharp,
        }),
    },
    snackbar: {
        position: 'absolute',
    },
    snackbarContent: {
        width: 360,
    },
});

class TripOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inviteOthers: false,
            inviteeUsername: '',
            open: false,
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
        this.setState({
            // open: true,
            inviteOthers: !this.state.inviteOthers,
        });
        this.clearInput();
    }

    logout = () => {
        this.props.dispatch(triggerLogout());
        this.props.history.push('home');
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
                    <h1 id="">
                        Trip Overview
                    </h1>
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
                                            <TableCell>
                                                <ButtonViewList onClick={this.navToTripGearList} />
                                                <Typography variant="body1" gutterBottom>
                                                    ({this.props.gear.tripGear.length} items)
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Campers</TableCell>
                                            <TableCell>
                                                <ButtonViewCampers onClick={this.navToTripCamperList} />
                                                <Typography variant="body1" gutterBottom>
                                                    ({this.props.trip.currentTripCamperList.length} campers)
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <ButtonAddCamper onClick={this.handleClickInviteOtherFolks} />
                                                <Typography variant="body1" gutterBottom>Invite others
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </form>
                            {/* WHALEHUNTER this button does not call the function upon click - figure out why! */}
                            {/* <ButtonAddCircleOutline onClick={() => {this.handleClickInviteOtherFolks}} text="Invite Other Folks"/> */}
                            {this.state.inviteOthers ?
                                <div>
                                    <FormControl onSubmit={this.handleSubmitInviteCamper}>
                                        <InputLabel htmlFor="invitee-username">invitee username</InputLabel>
                                        <Input
                                            id="invitee-username"
                                            onChange={this.handleChangeFor('inviteeUsername')}
                                            value={this.state.inviteeUsername} />
                                        <ButtonSendInvitation onClick={this.handleSubmitInviteCamper} type="submit" value="Invite user" />
                                    </FormControl>
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

                    <Snackbar
                        open={this.state.open}
                        autoHideDuration={4000}
                        onClose={this.handleClose}
                        ContentProps={{
                            'aria-describedby': 'snackbar-fab-message-id',
                            className: this.props.classes.snackbarContent,
                        }}
                        message={<span id="snackbar-fab-message-id">Invitation sent</span>}
                        action={
                            <Button color="inherit" size="small" onClick={this.handleClose}>
                                Close
                            </Button>
                        }
                        className={this.props.classes.snackbar}
                    />
                </div >
            );
        }
        return (
            <div>
                <Nav />
                {content}
            </div >
        );
    }
}

TripOverview.propTypes = {
    classes: PropTypes.object.isRequired,
};

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styles)(TripOverview));