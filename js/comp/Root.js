import React, { Component } from 'react';
import ColList from './ColList';

export default class Root extends Component {
    render() {
        return (
            <div id='content-wrap'>
                <ColList/>
            </div>
        );
    }
}