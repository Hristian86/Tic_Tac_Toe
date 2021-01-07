import React, { Component } from 'react';

export default class Tests extends Component {
    constructor(props) {
        super(props)
        
    }

    render() {
        return (
            <div>
                {this.props.name !== "" ? <div className="text-center">You are currently logged as {this.props.name} </div>: <div></div>}
            </div>
            )
    }
}