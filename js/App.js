import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import 'babel-polyfill';
import scss from '../css/popup.scss';

const renderDom = Component => {
    render(
        <Component />,
        window.document.getElementById('app')
    );
};
renderDom(Root);
