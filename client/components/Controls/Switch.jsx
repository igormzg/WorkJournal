import React from 'react';
import './Switch.less';
let currentId = 0;


const Switch = React.createClass({
    getInitialState() {
        return {
            active: this.props.active != undefined ? this.props.active : false,
            switchId: this.props.id ? this.props.id : `switch${currentId++}`
        };
    },

    handleSwitchOnClick: function (event) {
        let newState = !this.state.active
        this.setState({active: newState});
        this.props.onToggle ? this.props.onToggle(newState) : null;
    },

    render() {
        return (
            <div className="switch" >
                <input className="switch-input" type="CHECKBOX" id={this.state.switchId} onClick={ this.handleSwitchOnClick } />
                <label className="switch-paddle" htmlFor={this.state.switchId}>
                    { this.state.active ? <span className="switch-active" aria-hidden="true">{this.props.activeText}</span> : null }
                    { !this.state.active ? <span className="switch-inactive" aria-hidden="true">{this.props.inactiveText}</span> : null }
                </label>
            </div>
        );
    },
});

export default Switch;

