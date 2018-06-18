import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      open: false,
    };
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

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.handleSnackBarOpen('Please enter a new username and password!')
    } else {
      const body = {
        username: this.state.username,
        password: this.state.password,
      };

      // making the request to the server to post the new user's registration
      axios.post('/api/user/register/', body)
        .then((response) => {
          if (response.status === 201) {
            this.props.history.push('/home');
          } else {
            this.handleSnackBarOpen('Ooops! That didn\'t work. The username might already be taken. Try again!');
          }
        })
        .catch(() => {
          this.handleSnackBarOpen('Ooops! Something went wrong. Please try again later!');
        });
    }
  } // end registerUser

  renderAlert() {
    if (this.state.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.state.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div>
        {this.renderAlert()}
        <Paper id="registerWindow" elevation={1} square={true}>
          <div id="registerFields">
            <input
              autoFocus='true'
              className="registerInput"
              type="text"
              name="username"
              placeholder="username"
              // value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
            />
            <input
              className="registerInput"
              type="password"
              name="password"
              placeholder="password"
              // value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
            />
            <div
              onClick={this.registerUser}
              id="registerButton">
              <p>
                REGISTER
            </p>
            </div>
          </div>
        </Paper>
        <Paper
          id="loginLink"
          elevation={1}
          square={true}
          component={Link} to="/home"
        >
          <p>Already registered?</p>
          <p>LOG IN</p>
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



      // <div>
      //   {this.renderAlert()}
      //   <form onSubmit={this.registerUser}>
      //     <h1>Register to begin</h1>
      //     <div>
      //       <label htmlFor="username">
      //         Username:
      //         <input
      //           type="text"
      //           name="username"
      //           value={this.state.username}
      //           onChange={this.handleInputChangeFor('username')}
      //         />
      //       </label>
      //     </div>
      //     <div>
      //       <label htmlFor="password">
      //         Password:
      //         <input
      //           type="password"
      //           name="password"
      //           value={this.state.password}
      //           onChange={this.handleInputChangeFor('password')}
      //         />
      //       </label>
      //     </div>
      //     <div>
      //       <input
      //         type="submit"
      //         name="submit"
      //         value="Register"
      //       />
      //       <Link to="/home">Cancel</Link>
      //     </div>
      //   </form>
      //   <h3>Already a member?</h3>
      //   <Link to="/home">login</Link>
      // </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterPage);

