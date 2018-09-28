import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'mobx-react';
import Root from './components/Root';
import store from './store';
import scss from '../css/popup.scss';

const renderDom = Component => {
    render(
        <Provider {...store}>
            <Component/>
        </Provider>,
        window.document.getElementById('app')
    );
};
renderDom(Root);
