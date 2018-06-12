import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

import ButtonAddCircleOutline from '../ButtonAddCircleOutline/ButtonAddCircleOutline';

import { triggerLogout } from '../../redux/actions/loginActions';

const styles = {
    fullList: {
        width: 'auto',
    },
    list: {
        width: 300,
    },
    drawerlistItem: {
        textDecoration: 'none',
        paddingLeft: 10,
    }
};

const mapStateToProps = state => ({
    user: state.user,
    state,
});

class DrawerList extends Component {

    logout = () => {
        this.props.dispatch(triggerLogout());
    }

    render() {

        return (
            <div className={this.props.classes.list}>
                {
                    !this.props.user.isLoading && this.props.user.userName === null ?
                        <div>
                            <Typography
                                variant="body1" gutterBottom
                            >
                                We're happy that you chose campKaboodle :)
                                Please login!
                            </Typography>
                        </div>
                        :
                        <div>
                        <List>
                            <ButtonAddCircleOutline />
                            <Typography className={this.props.classes.drawerListItem}
                                variant="subheading" gutterBottom
                                component={Link} to='/create-a-trip'
                            >
                                Create a trip
                            </Typography>
                        </List>
                        <Divider />
                        <List>
                            <Typography
                                variant="subheading" gutterBottom
                                component={Link} to='/user-trip-list'
                            >Your trips
                    </Typography>
                        </List>
                        <Divider />
                        <List
                            onClick={this.logout}
                        >
                            <Typography
                                variant="subheading" gutterBottom
                            >Logout
                        </Typography>
                        </List>
                        </div>
                }
            </div>
        );
    }
}

DrawerList.propTypes = {
    classes: PropTypes.object,
};

export default connect(mapStateToProps)((withStyles(styles)(DrawerList)));
