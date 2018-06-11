import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';

import About from '../About/About';
import ButtonHamburgerMenu from '../ButtonHamburgerMenu/ButtonHamburgerMenu';
import ButtonAbout from '../ButtonAbout/ButtonAbout';
import DrawerList from '../DrawerList/DrawerList';


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
      top: false,
    }
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
    console.log('init toggleDrawer');
  };

  render() {

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
            <Drawer open={this.state.top} onClose={this.toggleDrawer('top', false)}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('top', false)}
                onKeyDown={this.toggleDrawer('top', false)}
              >
              <About />
              </div>
            </Drawer>
            <Typography variant="title" color="inherit" className={this.props.classes.flex}>
              {this.props.title}
            </Typography>
            <ButtonAbout onClick={this.toggleDrawer('top', true)} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

AppBar.propTypes = {
  classes: PropTypes.object,
};

export default connect(mapStateToProps)((withStyles(styles)(Header)));
