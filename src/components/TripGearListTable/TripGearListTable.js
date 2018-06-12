import React, { Component } from 'react';
import { connect } from 'react-redux';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

import { GEAR_ACTIONS } from '../../redux/actions/gearActions';
import ButtonAddCircleOutline from '../ButtonAddCircleOutline/ButtonAddCircleOutline';
import ButtonArrowDownward from '../ButtonArrowDownward/ButtonArrowDownward';
import ButtonArrowUpward from '../ButtonArrowUpward/ButtonArrowUpward';
import ButtonCancel from '../ButtonCancel/ButtonCancel';
import ButtonSendInvitation from '../ButtonSendInvitation/ButtonSendInvitation';
import TripGearListTableItem from '../TripGearListTableItem/TripGearListTableItem';

const mapStateToProps = state => ({
    user: state.user,
    userTrips: state.trip.userTrips,
    currentTrip: state.trip.currentTrip,
    tripGear: state.gear.tripGear
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

class TripGearListTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            addingItem: false,
            newItem: {
                description: '',
                quantity: '',
            }
        }
    }

    clearInput = () => {
        this.setState({
            newItem: {
                description: '',
                quantity: '',
            }
        });
    }

    confirmAction = (item) => {
        const description = item.description;
        confirmAlert({
            title: 'Confirm delete camper from trip',
            message: `Are you sure you want to remove ${description} from the trip?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.executeDeleteItem(item)
                },
                {
                    label: 'No',
                    onClick: () => alert('aborted')
                }
            ]
        })
    };

    executeDeleteItem = (item) => {
        console.log('init handleClickDelete');
        const payload = { item: item, id: this.props.currentTrip.id };
        this.props.dispatch({
            type: GEAR_ACTIONS.DELETE_ITEM,
            payload
        });
    }

    handleChangeFor = propertyName => event => {
        this.setState({
            newItem: {
                ...this.state.newItem,
                [propertyName]: event.target.value
            }
        });
    }

    handleClickCancel = () => {
        console.log('init handleClickCancel');
        this.toggleAddingItem();
        console.log(this.state.addingItem);
        this.clearInput();

    }

    handleClickDelete = (item) => {
        console.log('init handleClickDelete');
        this.confirmAction(item);
    }

    handleClickProvide = (item) => {
        console.log('init handleClickProvide')
        const payload = { item: item, id: this.props.currentTrip.id };
        // initiate PUT request to add req.user.username to item in database
        this.props.dispatch({
            type: GEAR_ACTIONS.UPDATE_ITEM_PROVIDER,
            payload
        });
    }

    handleClickRemoveProvider = (item) => {
        console.log('init handleClickRemoveProvider')
        // initiate PUT request to remove provider of item in database
        const payload = { item: item, id: this.props.currentTrip.id };
        this.props.dispatch({
            type: GEAR_ACTIONS.REMOVE_ITEM_PROVIDER,
            payload
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

    handleClickSortByDescriptionAscending = () => {
        this.props.dispatch({ type: GEAR_ACTIONS.FETCH_TRIP_GEAR, payload: this.props.currentTrip });
    }

    handleClickSortByDescriptionDescending = () => {
        this.props.dispatch({ type: GEAR_ACTIONS.FETCH_TRIP_GEAR_BY_DESCRIPTION_DESC, payload: this.props.currentTrip });
    }

    handleClickSortByProviderAscending = () => {
        this.props.dispatch({ type: GEAR_ACTIONS.FETCH_TRIP_GEAR_BY_PROVIDER_ASC, payload: this.props.currentTrip });
    }

    handleClickSortByProviderDescending = () => {
        console.log('init handleClickSortyByProviderDescending');
        this.props.dispatch({ type: GEAR_ACTIONS.FETCH_TRIP_GEAR_BY_PROVIDER_DESC, payload: this.props.currentTrip });
    }

    handleClickSortByQuantityAscending = () => {
        console.log('init handleClickSortByQuantityAscending');
        this.props.dispatch({ type: GEAR_ACTIONS.FETCH_TRIP_GEAR_BY_QUANTITY_ASC, payload: this.props.currentTrip });
    }

    handleClickSortByQuantityDescending = () => {
        console.log('init handleClickSortByQuantityDescending');
        this.props.dispatch({ type: GEAR_ACTIONS.FETCH_TRIP_GEAR_BY_QUANTITY_ASC, payload: this.props.currentTrip });
    }

    handleSubmitNewItem = event => {
        event.preventDefault();
        if (this.props.currentTrip.id === '') {
            alert('Trip ID must not be null');
        } else if (this.state.newItem.description === '') {
            alert('Item description must not be null');
        } else if (this.state.newItem.quantity === '') {
            alert('Item quantity must not be null');
        } else {
            const newItem = {
                newItem: this.state.newItem,
                id: this.props.currentTrip.id
            };
            this.props.dispatch({ type: GEAR_ACTIONS.CREATE_NEW_GEAR_ITEM, payload: newItem });
            this.handleSnackBarOpen()
            this.clearInput();
        }
    }

    renderAlert() {
        if (this.state.message !== '') {
            alert(this.state.message);
        }
    }

    toggleAddingItem = () => {
        console.log('init toggleAddingItem');
        this.setState({
            addingItem: !this.state.addingItem
        });
    }

    render() {
        return (
            <div>
                <Paper className="table" elevation={1} square={true}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding='none'>ITEM</TableCell>
                                <TableCell padding='none'>QUANTITY</TableCell>
                                <TableCell padding='none'>PROVIDER</TableCell>
                                <TableCell padding='none'></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell padding='none'>
                                    <ButtonArrowUpward
                                        onClick={() => { this.handleClickSortByDescriptionAscending() }}
                                    ></ButtonArrowUpward>
                                    <ButtonArrowDownward
                                        onClick={() => { this.handleClickSortByDescriptionDescending() }}
                                    ></ButtonArrowDownward>
                                </TableCell>
                                <TableCell padding='none'>
                                    <ButtonArrowUpward
                                        onClick={() => { this.handleClickSortByQuantityAscending() }}
                                    ></ButtonArrowUpward>
                                    <ButtonArrowDownward
                                        onClick={() => { this.handleClickSortByQuantityDescending() }}
                                    ></ButtonArrowDownward>
                                </TableCell>
                                <TableCell padding='none'>
                                    <ButtonArrowUpward
                                        onClick={() => { this.handleClickSortByProviderAscending() }}
                                    ></ButtonArrowUpward>
                                    <ButtonArrowDownward
                                        onClick={() => { this.handleClickSortByProviderDescending() }}
                                    ></ButtonArrowDownward>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.tripGear.map(item =>
                                <TripGearListTableItem
                                    key={item.id}
                                    item={item}
                                    handleClickProvide={this.handleClickProvide}
                                    handleClickRemoveProvider={this.handleClickRemoveProvider}
                                    handleClickDelete={this.handleClickDelete}
                                />)}
                        </TableBody>
                    </Table>
                </Paper>
                <div>
                    {
                        this.state.addingItem ?
                            <Paper elevation={6} square={true}>
                                <form onSubmit={this.handleSubmitNewItem}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell padding='none'>
                                                    <FormControl>
                                                        <InputLabel htmlFor='item-description'>New item description</InputLabel>
                                                        <Input
                                                            id='item-description'
                                                            onChange={this.handleChangeFor('description')}
                                                            value={this.state.newItem.description} />
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell padding='none'>
                                                    <FormControl>
                                                        <InputLabel htmlFor='item-quantity'>Quantity</InputLabel>
                                                        <Input
                                                            id='item-quantity'
                                                            type='number'
                                                            onChange={this.handleChangeFor('quantity')}
                                                            value={this.state.newItem.quantity} />
                                                    </FormControl>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </form>
                                <ButtonCancel onClick={this.handleClickCancel} />
                                <ButtonSendInvitation onClick={this.handleSubmitNewItem} />
                            </Paper>
                            :
                            <Paper elevation={6} square={true}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell padding='none'>
                                                <button>
                                                    <ButtonAddCircleOutline onClick={this.toggleAddingItem} />
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>
                    }
                </div>
                <Snackbar
                    open={this.state.open}
                    autoHideDuration={4000}
                    onClose={this.handleSnackBarClose}
                    ContentProps={{
                        'aria-describedby': 'snackbar-fab-message-id',
                        className: this.props.classes.snackbarContent,
                    }}
                    message={<span id="snackbar-fab-message-id">Gear item added</span>}
                    action={
                        <Button color="inherit" size="small" onClick={this.handleSnackBarClose}>
                            Close
                            </Button>
                    }
                    className={this.props.classes.snackbar}
                />
            </div>
        );
    }
}

TripGearListTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(TripGearListTable));