import React, { Component } from 'react';
import { connect } from 'react-redux';

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

    handleChangeFor = propertyName => event => {
        this.setState({
            newItem: {
                ...this.state.newItem,
                [propertyName]: event.target.value
            }
        });
    }

    handleClickDelete = (item) => {
        console.log('init handleClickDelete');
        const payload = { item: item, id: this.props.currentTrip.id }
        this.props.dispatch({
            type: GEAR_ACTIONS.DELETE_ITEM,
            payload
        })
    }

    handleClickCancel = () => {
        this.toggleAddingItem();
        console.log(this.state.addingItem);
        this.clearInput();
        console.log('init handleClickCancel');
    }

    handleClickProvide = (item) => {
        console.log('init handleClickProvide')
        const payload = { item: item, id: this.props.currentTrip.id }
        // initiate PUT request to add req.user.username to item in database
        this.props.dispatch({
            type: GEAR_ACTIONS.UPDATE_ITEM_PROVIDER,
            payload
        })
    }

    handleClickRemoveProvider = (item) => {
        console.log('init handleClickRemoveProvider')
        // initiate PUT request to remove provider of item in database
        const payload = { item: item, id: this.props.currentTrip.id }
        this.props.dispatch({
            type: GEAR_ACTIONS.REMOVE_ITEM_PROVIDER,
            payload
        })
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
            }
            // dispatch for post new item
            this.props.dispatch({ type: GEAR_ACTIONS.CREATE_NEW_GEAR_ITEM, payload: newItem })
            this.toggleAddingItem();
            this.clearInput();
        }
    }

    renderAlert() {
        if (this.state.message !== '') {
            alert(this.state.message)
        }
    }

    toggleAddingItem = () => {
        this.setState({
            addingItem: !this.state.addingItem
        })
    }

    render() {
        return (
            <div>
                <pre>{JSON.stringify(this.state.newItem)}</pre>
                <pre>{JSON.stringify(this.state.addingItem)}</pre>
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