//@flow
import React from 'react';
import { render } from 'react-dom';
import Root from './comp/Root'

const renderDom = Component => {
    render(
        <Component />,
        window.document.getElementById('app')
    );
};
renderDom(Root);