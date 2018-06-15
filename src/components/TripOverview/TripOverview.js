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
import moment from 'moment';

import ButtonAddCamper from '../ButtonAddCamper/ButtonAddCamper';
import ButtonCancel from '../ButtonCancel/ButtonCancel';
import ButtonSendInvitation from '../ButtonSendInvitation/ButtonSendInvitation';
import ButtonViewCampers from '../ButtonViewCampers/ButtonViewCampers';
import ButtonViewList from '../ButtonViewList/ButtonViewList';
import CurrentViewIndicator from '../CurrentViewIndicator/CurrentViewIndicator';
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
            ...this.state,
            [propertyName]: event.target.value,
        });
    }

    handleSnackBarClose = () => {
        this.setState({
            open: false,
        });
    }

    handleSnackBarOpen = () => {
        this.setState({
            open: true,
        });
    }

    handleClickInviteOtherFolks = () => {
        this.setState({
            inviteOthers: !this.state.inviteOthers,
        })
    }

    handleSubmitInviteCamper = event => {
        event.preventDefault();
        this.handleSnackBarOpen();
        this.clearInput();
        console.log(this.state.open);
        this.props.dispatch({
            type: TRIP_ACTIONS.INVITE_USER,
            payload: {
                inviteeUsername: this.state.inviteeUsername,
                trip_id: this.props.currentTrip.id,
            },
        });

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

    HandleSubmitEdits = event => {
        event.preventDefault();
    }

    render() {
        console.log(this.state.open);
        let content = null;
        let currentTrip = this.props.currentTrip;

        if (this.props.user.userName) {
            content = (
                <div>
                    {this.props.currentTrip ?
                        <div>
                            <CurrentViewIndicator currentViewName="Trip overview" />
                            <Paper className="table" elevation={1} square={true}>
                                <form onSubmit={this.handleSubmitEdits} className="table">
                                    <div className="tripOverviewTableRow">
                                        <div className="tripOverviewRowLabel">
                                            <p>Trip Name</p>
                                        </div>
                                        <div className="tripOverviewRow-StaticDetails">
                                            <p>{currentTrip.name}</p>
                                        </div>
                                    </div>
                                    <div className="tripOverviewTableRow">
                                        <div className="tripOverviewRowLabel">
                                            <p>Location</p>
                                        </div>
                                        <div className="tripOverviewRow-StaticDetails">
                                            <p>{currentTrip.location}</p>
                                        </div>
                                    </div>
                                    <div className="tripOverviewTableRow">
                                        <div className="tripOverviewRowLabel">
                                            <p>Meetup Time</p>
                                        </div>
                                        <div className="tripOverviewRow-StaticDetails">
                                            <p>{moment(currentTrip.meetup_time).format('MMM Do YYYY, h:mm:ss a')}</p>
                                        </div>
                                    </div>
                                    <div className="tripOverviewTableRow">
                                        <div className="tripOverviewRowLabel">
                                            <p>Meetup Spot</p>
                                        </div>
                                        <div className="tripOverviewRow-StaticDetails">
                                            <p>{currentTrip.meetup_spot}</p>
                                        </div>
                                    </div>
                                    <div className="tripOverviewTableRow">
                                        <div className="tripOverviewRowLabel">
                                            <p>Exit Time</p>
                                        </div>
                                        <div className="tripOverviewRow-StaticDetails">
                                        <p>{moment(currentTrip.exit_time).format('MMM Do YYYY, h:mm:ss a')}</p>
                                        </div>
                                    </div>
                                    <div className="tripOverviewTableRow">
                                        <div className="tripOverviewRowLabel">
                                            <p>Exit Spot</p>
                                        </div>
                                        <div className="tripOverviewRow-StaticDetails">
                                            <p>{currentTrip.exit_spot}</p>
                                        </div>
                                    </div>
                                    <div className="tripOverviewTableRow">
                                        <div className="tripOverviewRowLabel">
                                            <p>Trip Gear</p>
                                        </div>
                                        <div className="tripOverviewRow-ListDetails"
                                        >
                                            <div className="tripOverviewRowContentGearListButton">
                                                <ButtonViewList onClick={this.navToTripGearList} />
                                            </div>
                                            <div className="tripOverviewRowContentGearListQuantity">
                                                <p className="tripOverview-p">
                                                    ({this.props.gear.tripGear.length} items)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tripOverviewTableRow">
                                        <div className="tripOverviewRowLabel"
                                            onClick={this.navToTripCamperList}
                                        >
                                            <p>Campers</p>
                                        </div>
                                        <div className="tripOverviewRow-ListDetails">
                                            <div className="tripOverviewRowContentGearListButton">
                                                <ButtonViewCampers onClick={this.navToTripCamperList} />
                                            </div>
                                            <div>
                                                <p className="tripOverview-p">
                                                    {this.props.trip.currentTripCamperList.length > 1 ?
                                                        `(${this.props.trip.currentTripCamperList.length} campers)` :
                                                        `(${this.props.trip.currentTripCamperList.length} camper)`}
                                                </p>
                                            </div>
                                            <div className="tripOverviewRowContentInviteOthersButton">
                                                <ButtonAddCamper onClick={this.handleClickInviteOtherFolks} />
                                            </div>
                                            <div className="tripOverviewRowContentInviteOthersText">
                                                <p className="tripOverview-p">
                                                    Invite others
                                                    </p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                {this.state.inviteOthers ?
                                    <div className="tripOverviewRowLabel">
                                        <form onSubmit={this.handleSubmitInviteCamper}>
                                            <FormControl>
                                                <InputLabel htmlFor='invitee-username'>invitee username</InputLabel>
                                                <Input
                                                    id='invitee-username'
                                                    onChange={this.handleChangeFor('inviteeUsername')}
                                                    value={this.state.inviteeUsername} />
                                                <ButtonSendInvitation onClick={this.handleSubmitInviteCamper} />
                                                <ButtonCancel onClick={this.handleClickInviteOtherFolks} />
                                            </FormControl>
                                            {/* WHALEHUNTER this button does not call the function upon click - figure out why! */}
                                            {/* <ButtonAddCircleOutline onClick={()=> {this.handleSubmitInviteCamper}}/> */}
                                        </form>
                                    </div>
                                    :
                                    ''}
                            </Paper>
                        </div>
                        :
                        <p>Select a trip</p>
                    }
                    <Snackbar
                        open={this.state.open}
                        autoHideDuration={4000}
                        onClose={this.handleSnackBarClose}
                        ContentProps={{
                            'aria-describedby': 'snackbar-fab-message-id',
                            className: this.props.classes.snackbarContent,
                        }}
                        message={<span id="snackbar-fab-message-id">Invitation sent</span>}
                        action={
                            <Button color="inherit" size="small" onClick={this.handleSnackBarClose}>
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

export default connect(mapStateToProps)(withStyles(styles)(TripOverview));