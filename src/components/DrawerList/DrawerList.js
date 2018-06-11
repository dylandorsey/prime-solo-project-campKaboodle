import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

import ButtonAbout from '../ButtonAbout/ButtonAbout';
import ButtonAddCircleOutline from '../ButtonAddCircleOutline/ButtonAddCircleOutline';

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
    state,
});

class DrawerList extends Component {

    render() {

        return (
            <div className={this.props.classes.list}>
                <List>
                    <Typography className={this.props.classes.drawerListItem}
                        variant="subheading" gutterBottom
                        component={Link} to='/create-a-trip'
                    >
                    <ButtonAddCircleOutline/>
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
            </div>
        );
    }
}

DrawerList.propTypes = {
    classes: PropTypes.object,
};

export default connect(mapStateToProps)((withStyles(styles)(DrawerList)));
