import React from 'react';
import { render } from 'react-dom';
import Root from './comp/Root'

const renderDom = Component => {
    render(
        <Component />,
        document.getElementById('app')
    );
}
renderDom(Root);