import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-uicore/AppBar';
import ButtonHamburgerMenu from '../ButtonHamburgerMenu/ButtonHamburgerMenu';
// import AboutButton from '../AboutButton/AboutButton';

const mapStateToProps = state => ({
  state
});

class Header extends Component {

  render() {
    return (
      <div className="instructions">
        <div>
          <ButtonHamburgerMenu />
          <h1 className="lead">{this.props.title}</h1>
        </div>
        {/* <AboutButton /> */}

      </div>
    );
  }
}
export default connect(mapStateToProps)(Header);
