import React, { Component } from 'react';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';


const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
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
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.props.login.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div>
        {this.renderAlert()}
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
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoginPage);
