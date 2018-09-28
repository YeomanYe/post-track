import React from 'react';
import ColList from './ColList';
import SettingList from './SettingList';
import TogglePanel from './TogglePanel';
import Toolbar from './Toolbar';
import DevTools from 'mobx-react-devtools';
// console.log(process);
const Root = () => (
    <div id='content-wrap'>
        <Toolbar />
        <ColList />
        <SettingList/>
        <TogglePanel/>
        {process.env.NODE_ENV === 'production' ? null : <DevTools/>}
    </div>
);
export default Root;
