import React from 'react';
import ColList from '../containers/ColListContainer';
import SettingList from '../containers/SettingListContainer';
import TogglePanel from '../containers/TogglePanelContainer';
import Toolbar from '../containers/ToolbarContainer';
import DevTools from 'mobx-react-devtools';

const Root = () => (
    <div id='content-wrap'>
        <Toolbar />
        <ColList />
        <SettingList/>
        <TogglePanel/>
        <DevTools/>
    </div>
);
export default Root;
