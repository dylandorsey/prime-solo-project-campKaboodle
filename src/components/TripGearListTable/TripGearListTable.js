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
import Typography from '@material-ui/core/Typography';


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
            description: {
                sortAscending: true,
            },
            quantity: {
                sortAscending: true,
            },
            provider: {
                sortAscending: true,
            },
            newItem: {
                description: '',
                quantity: '',
            },
            snackBarMessage: '',
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

    handleSnackBarOpen = (newMessage) => {
        this.setState({
            snackBarMessage: [newMessage],
            open: true,
        });
    }

    handleClickSortByDescriptionAscending = () => {
        this.props.dispatch({ type: GEAR_ACTIONS.FETCH_TRIP_GEAR, payload: this.props.currentTrip });
        this.setState({
            description: {
                sortAscending: false,
            }
        })
    }

    handleClickSortByDescriptionDescending = () => {
        this.props.dispatch({ type: GEAR_ACTIONS.FETCH_TRIP_GEAR_BY_DESCRIPTION_DESC, payload: this.props.currentTrip });
        this.setState({
            description: {
                sortAscending: true,
            }
        })
    }

    handleClickSortByProviderAscending = () => {
        this.props.dispatch({ type: GEAR_ACTIONS.FETCH_TRIP_GEAR_BY_PROVIDER_ASC, payload: this.props.currentTrip });
        this.setState({
            provider: {
                sortAscending: false,
            }
        })
    }

    handleClickSortByProviderDescending = () => {
        console.log('init handleClickSortyByProviderDescending');
        this.props.dispatch({ type: GEAR_ACTIONS.FETCH_TRIP_GEAR_BY_PROVIDER_DESC, payload: this.props.currentTrip });
        this.setState({
            provider: {
                sortAscending: true,
            }
        })
    }

    handleClickSortByQuantityAscending = () => {
        console.log('init handleClickSortByQuantityAscending');
        this.props.dispatch({ type: GEAR_ACTIONS.FETCH_TRIP_GEAR_BY_QUANTITY_ASC, payload: this.props.currentTrip });
        this.setState({
            quantity: {
                sortAscending: false,
            }
        })
    }

    handleClickSortByQuantityDescending = () => {
        console.log('init handleClickSortByQuantityDescending');
        this.props.dispatch({ type: GEAR_ACTIONS.FETCH_TRIP_GEAR_BY_QUANTITY_DESC, payload: this.props.currentTrip });
        this.setState({
            quantity: {
                sortAscending: true,
            }
        })
    }

    handleSubmitNewItem = event => {
        event.preventDefault();
        if (this.props.currentTrip.id === '') {
            this.handleSnackBarOpen('Please select a trip!')
        } else if (this.state.newItem.description === '') {
            this.handleSnackBarOpen('Enter description!');
        } else if (this.state.newItem.quantity === '') {
            this.handleSnackBarOpen('Enter quantity!');
        } else {
            const newItem = {
                newItem: this.state.newItem,
                id: this.props.currentTrip.id
            };
            this.props.dispatch({ type: GEAR_ACTIONS.CREATE_NEW_GEAR_ITEM, payload: newItem });
            this.handleSnackBarOpen('Item added')
            this.clearInput();
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
                <div>
                    <Paper className="table" elevation={1} square={true}>
                        <div className="tripGearListTableHeaderRow">
                            <div className="tripGearListTableHeaderRowItem">
                                <p>Item</p>
                                <div className="buttonSort">
                                    {this.state.description.sortAscending ?
                                        <ButtonArrowUpward
                                            onClick={() => { this.handleClickSortByDescriptionAscending() }}
                                        ></ButtonArrowUpward>
                                        :
                                        <ButtonArrowDownward
                                            onClick={() => { this.handleClickSortByDescriptionDescending() }}
                                        ></ButtonArrowDownward>
                                    }
                                </div>
                            </div>
                            <div className="tripGearListTableHeaderRowQuantity">
                                <p>Qty</p>
                                <div className="buttonSort">
                                    {this.state.quantity.sortAscending ?
                                        <ButtonArrowDownward
                                            onClick={() => { this.handleClickSortByQuantityAscending() }}
                                        ></ButtonArrowDownward>
                                        :
                                        <ButtonArrowUpward
                                            onClick={() => { this.handleClickSortByQuantityDescending() }}
                                        ></ButtonArrowUpward>
                                    }
                                </div>
                            </div>
                            <div className="tripGearListTableHeaderRowProvider">
                                <p>Provider</p>
                                <div className="buttonSort">
                                    {this.state.provider.sortAscending ?
                                        <ButtonArrowDownward
                                            onClick={() => { this.handleClickSortByProviderAscending() }}
                                        ></ButtonArrowDownward>
                                        :
                                        <ButtonArrowUpward
                                            onClick={() => { this.handleClickSortByProviderDescending() }}
                                        ></ButtonArrowUpward>
                                    }
                                </div>
                            </div>
                        </div>
                        <div>
                            {this.props.tripGear.map(item =>
                                <TripGearListTableItem
                                    key={item.id}
                                    item={item}
                                    handleClickProvide={this.handleClickProvide}
                                    handleClickRemoveProvider={this.handleClickRemoveProvider}
                                    handleClickDelete={this.handleClickDelete}
                                />)}
                        </div>
                    </Paper>
                </div>
                <div id="addNewItem">
                    {this.state.addingItem ?
                        <Paper elevation={1} square={true}>
                            <form id="newGearItemInput" onSubmit={this.handleSubmitNewItem}>
                                    <div id="newGearItemDescription">
                                        <input
                                            id="newItemDescription"
                                            type="text"
                                            name="newItemDescription"
                                            placeholder="description"
                                            onChange={this.handleChangeFor('description')}
                                            value={this.state.newItem.description}
                                        />
                                    </div>
                                    <div id="newGearItemQuantity">
                                        <input
                                            id="newItemQuantity"
                                            type="number"
                                            placeholder="quantity"
                                            onChange={this.handleChangeFor('quantity')}
                                            value={this.state.newItem.quantity}
                                        />

                                    </div>
                                    <div id="newGearItemActions">
                                        <ButtonCancel id="cancelAddItem" onClick={this.handleClickCancel} />
                                        <ButtonSendInvitation id="submitAddItem" onClick={this.handleSubmitNewItem} />
                                    </div>
                            </form>

                        </Paper>
                        :
                        <Paper elevation={1} square={true}>
                            <div id="newGearItemInitiate">
                                <ButtonAddCircleOutline id="newGearItemInitiateButton" onClick={this.toggleAddingItem} />
                            </div>
                        </Paper>
                    }
                </div >
                <Snackbar
                    open={this.state.open}
                    autoHideDuration={4000}
                    onClose={this.handleSnackBarClose}
                    ContentProps={{
                        'aria-describedby': 'snackbar-fab-message-id',
                        className: this.props.classes.snackbarContent,
                    }}
                    message={<span id="snackbar-fab-message-id">{this.state.snackBarMessage}</span>}
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
}

TripGearListTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(TripGearListTable));