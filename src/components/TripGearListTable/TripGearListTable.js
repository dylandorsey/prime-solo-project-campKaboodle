import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TripGearListTableItem from '../TripGearListTableItem/TripGearListTableItem';

const mapStateToProps = state => ({
    state
});

class TripGearListTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            addingItem: false,
            newItem: {
                description: '',
                quantity: '',
                tripID: this.props.state.trip.currentTrip.id,
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

    handleClickCancel = () => {

        this.toggleAddingItem();
        this.clearInput();
        console.log('init handleClickCancel')
    }

    handleSubmitNewItem = event => {
        event.preventDefault();
        if (this.state.newItem.description === '') {
            alert('Item description must not be empty.');
        } else {
            const newItem = {
                newItem: this.state.newItem,
                tripID: this.props.state.trip.currentTrip.id
            }
            this.postNewItem(newItem);
            this.toggleAddingItem();
            this.clearInput();
        }
    }

    postNewItem = (body) => {
        axios.post(`api/gear/new-item`, body)
            .then((response) => {
                if (response.status === 201) {
                    alert('new gear posted with status', response.status);
                } else {
                    this.setState({
                        message: 'That didn\'t work. Server error...',
                    });
                }
            })
            .catch(() => {
                this.setState({
                    message: 'That didn\'t work. Is the server running?',
                });
            });
    }

    renderAlert() {
        if (this.state.message !== '') {
            alert(this.state.message)
        }
    }

    toggleAddingItem = () => {
        this.setState({
            ...this.state,
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
                                <TableCell>PACKED</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.state.gear.tripGear.map(item => <TripGearListTableItem key={item.id} item={item} />)}
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