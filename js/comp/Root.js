import React, { Component } from 'react';
import ColList from './ColList';
import SettingList from './SettingList';
import TogglePanel from './TogglePanel';

export default class Root extends Component {
    constructor(props){
        super(props);

    }

/*    getChildContext() {
        return {Event};
    }*/
    render() {
        return (
            <div id='content-wrap'>
                <ColList/>
                <SettingList/>
                <TogglePanel/>
            </div>
        );
    }
}