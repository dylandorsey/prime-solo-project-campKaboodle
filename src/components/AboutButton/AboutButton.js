
import React, { Component } from 'react';
import { Popover } from '@material-ui/core/Popover';
import Version from '../Version/Version';

class AboutButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    handlePopoverClick = event => {
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
    render() {
        const { anchorEl } = this.state;

        return (
            <div>
                <button onClick={this.handlePopoverClick}>
                    App Info
                    </button>
                <Popover
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
                </Popover>
            </div>
        );
    }
}

export default AboutButton;