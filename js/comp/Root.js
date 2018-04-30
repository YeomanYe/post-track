//@flow
import React, { Component } from 'react';
import ColList from './ColList';
import SettingList from './SettingList';
import TogglePanel from './TogglePanel';
import Toolbar from './Toolbar';


export default class Root extends Component<any,any> {
    constructor(props: any){
        super(props);

    }

/*    getChildContext() {
        return {Event};
    }*/
    render() {
        return (
            <div id='content-wrap'>
                <Toolbar/>
                <ColList/>
                <SettingList/>
                <TogglePanel/>
            </div>
        );
    }
}