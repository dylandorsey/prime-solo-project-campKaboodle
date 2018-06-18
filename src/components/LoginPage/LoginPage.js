import React, { Component } from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
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

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      open: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(clearError());
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.user.userName) {
      this.props.history.push('user-trip-list');
    }
  }

  login = (event) => {
    console.log('init login');
    event.preventDefault();
    if (this.state.username === '' || this.state.password === '') {
      this.handleSnackBarOpen('Please enter username and password!');
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
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


  // renderAlert() {
  //   if (this.props.login.message !== '') {
  //     return (
  //       <h2
  //         className="alert"
  //         role="alert"
  //       >
  //         {this.props.login.message}
  //       </h2>
  //     );
  //   }
  //   return (<span />);
  // }

  render() {
    return (
      <div>
        <Paper id="loginWindow" elevation={1} square={true}>
          <div id="loginFields">
            <input
              autoFocus='true'
              className="loginInput"
              type="text"
              name="username"
              placeholder="username"
              // value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
            />
            <input
              className="loginInput"
              type="password"
              name="password"
              placeholder="password"
              // value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
            />
            <div
              onClick={this.login}
              id="loginButton">
              <p>
                LOG IN
            </p>
            </div>
          </div>
        </Paper>
        <Paper
          id="registerLink"
          elevation={1}
          square={true}
          component={Link} to="/register"
        >
          <p>REGISTER</p>
        </Paper>
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
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));
