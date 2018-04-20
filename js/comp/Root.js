import React, { Component } from 'react';
import ColList from './ColList';
import TogglePanel from './TogglePanel';
import Event from './Event';

export default class Root extends Component {
    constructor(props){
        super(props);

    }
    render() {
        return (
            <div id='content-wrap'>
                <ColList/>
                <TogglePanel/>
            </div>
        );
    }
}