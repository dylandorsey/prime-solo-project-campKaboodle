import React, { Component } from 'react';
import { connect } from 'react-redux';

import HamburgerMenuButton from '../HamburgerMenuButton/HamburgerMenuButton';
import AboutButton from '../AboutButton/AboutButton';

const mapStateToProps = state => ({
  state
});

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="instructions">
        <div>
          <h1 className="lead">{this.props.title}</h1>
        </div>
        {/* <AboutButton /> */}

      </div>
    );
  }
}
export default connect(mapStateToProps)(Header);
