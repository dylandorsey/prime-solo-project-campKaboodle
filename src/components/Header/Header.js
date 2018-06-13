import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';

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
      right: false,
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
        <AppBar position="static" color="default" elevation={1}>
          <Paper className="Header" elevation={2} square={true}>
            <Toolbar>
              <ButtonAbout onClick={this.toggleDrawer('left', true)} />
              <Typography variant="title" color="inherit" className={this.props.classes.flex}>
                {this.props.title}
              </Typography>
              {this.props.user.userName ?
                <ButtonHamburgerMenu
                  onClick={this.toggleDrawer('right', true)}
                />
                :
                <div></div>
              }
            </Toolbar>
          </Paper>
        </AppBar>
        <Drawer open={this.state.right} onClose={this.toggleDrawer('right', false)}>
          <div className="drawer"
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
          >
            <DrawerList />
          </div>
        </Drawer>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div className="drawer"
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            <About />
          </div>
        </Drawer>
      </div>
    );
  }
}

AppBar.propTypes = {
  classes: PropTypes.object,
};

export default connect(mapStateToProps)((withStyles(styles)(Header)));
