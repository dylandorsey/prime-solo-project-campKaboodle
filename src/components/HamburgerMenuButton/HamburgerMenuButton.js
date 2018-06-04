import React, { Component } from 'react';

class HamburgerMenuButton extends Component {
    render() {
        return (
            <button className="button" color="primary" onClick={this.props.navToUserMainMenu} 
            >
            Hamburger Menu
            </button>
        );
    }
}

// this allows us to use <App /> in index.js
export default HamburgerMenuButton;