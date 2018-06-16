import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      message: '',
    };
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.setState({
        message: 'Choose a username and password!',
      });
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
            this.setState({
              message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });
        });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

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

export default RegisterPage;

