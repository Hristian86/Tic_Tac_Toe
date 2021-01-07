import React, { Component } from 'react';

export default class LogInSuccess extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="text-center">
                successfully loged in {this.props.email}
            </div>
            )
    }
}