import React, { Component } from 'react';
import { connect } from 'react-redux';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { GEAR_ACTIONS } from '../../redux/actions/gearActions';
import TripGearListTableItem from '../TripGearListTableItem/TripGearListTableItem';



const mapStateToProps = state => ({
    user: state.user,
    userTrips: state.trip.userTrips,
    currentTrip: state.trip.currentTrip,
    tripGear: state.gear.tripGear
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
            ...this.state,
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

    handleClickDelete = (item) => {
        this.confirmAction(item);
    }

    handleClickCancel = () => {
        this.toggleAddingItem();
        console.log(this.state.addingItem);
        this.clearInput();
        console.log('init handleClickCancel');
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
            // dispatch for post new item
            this.props.dispatch({ type: GEAR_ACTIONS.CREATE_NEW_GEAR_ITEM, payload: newItem });
            this.toggleAddingItem();
            this.clearInput();
        }
    }

    renderAlert() {
        if (this.state.message !== '') {
            alert(this.state.message);
        }
    }

    toggleAddingItem = () => {
        this.setState({
            addingItem: !this.state.addingItem
        });
    }

    render() {
        return (
            <div>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ITEM</TableCell>
                                <TableCell>QUANTITY</TableCell>
                                <TableCell>PROVIDER</TableCell>
                                <TableCell></TableCell>
                                <TableCell>PACKED</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <button
                                        onClick={() => {this.handleClickSortByDescriptionAscending()}}
                                    >Sort Ascending</button>
                                    <button
                                        onClick={() => {this.handleClickSortByDescriptionDescending()}}
                                    >Sort Descending</button>
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                    <button
                                        onClick={() => {this.handleClickSortByProviderAscending()}}
                                    >Sort Ascending</button>
                                    <button
                                        onClick={() => {this.handleClickSortByProviderDescending()}}
                                    >Sort Descending</button>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.tripGear.map(item => <TripGearListTableItem key={item.id} item={item}
                                handleClickProvide={this.handleClickProvide}
                                handleClickRemoveProvider={this.handleClickRemoveProvider}
                                handleClickDelete={this.handleClickDelete} />)}
                        </TableBody>
                    </Table>
                </Paper>
                <div>
                    {
                        this.state.addingItem ?
                            <Paper>
                                <form onSubmit={this.handleSubmitNewItem}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    <input type="text" value={this.state.newItem.description} onChange={this.handleChangeFor('description')}></input>
                                                </TableCell>
                                                <TableCell>
                                                    <input type="number" value={this.state.newItem.quantity} onChange={this.handleChangeFor('quantity')}></input>
                                                </TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                    <input type="submit" value="create new item"></input>
                                </form>
                                <button onClick={this.handleClickCancel}>cancel</button>
                            </Paper>
                            :
                            <Paper>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <button onClick={this.toggleAddingItem}>Add item</button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>
                    }
                </div>
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TripGearListTable);