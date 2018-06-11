import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Popover } from '@material-ui/core/Popover';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';

import ButtonHamburgerMenu from '../ButtonHamburgerMenu/ButtonHamburgerMenu';
import ButtonAbout from '../ButtonAbout/ButtonAbout';
import DrawerList from '../DrawerList/DrawerList';
import Version from '../Version/Version';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  fullList: {
    width: 'auto',
  },
  list: {
    width: 250,
  },
  buttonHamburgerMenu: {

  },
};

const mapStateToProps = state => ({
  user: state.user,
  state,
});

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      left: false,
      anchorEl: null,
    }
  }

  handleClickPopover = event => {
    this.setState({
      ...this.state,
      anchorEl: event.currentTarget,
    });
  }

  handleClose = () => {
    this.setState({
      ...this.state,
      anchorEl: null,
    });
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
    console.log('init toggleDrawer');
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div className={this.props.classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <ButtonHamburgerMenu
              className={this.props.classes.buttonHamburgerMenu}
              onClick={this.toggleDrawer('left', true)}
            />
            <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('left', false)}
                onKeyDown={this.toggleDrawer('left', false)}
              >
                <DrawerList />
              </div>
            </Drawer>
            <Typography variant="title" color="inherit" className={this.props.classes.flex}>
              {this.props.title}
            </Typography>
            <ButtonAbout onClick={() => {this.handleClickPopover()}} />
          </Toolbar>
        </AppBar>
        {/* <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <div>
            <h2>
              campKaboodle
                            </h2>
            <p>
              Version: <Version />
            </p>
            <p>
              Author: Dylan Dorsey
                             </p>
            <p>
              This app is made possible by a bunch of stuff that none of us fully understands.
                             </p>
            <p>
              Thanks for giving it a try!
                             </p>
          </div>
        </Popover> */}
      </div>
    );
  }
}

AppBar.propTypes = {
  classes: PropTypes.object,
};

export default connect(mapStateToProps)((withStyles(styles)(Header)));
