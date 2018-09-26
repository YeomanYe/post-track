//@flow
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Constant from '../config/Constant';

const {SHOW_COL, SHOW_SETTING} = Constant;

@observer
export default class TogglePanel extends Component{
    render() {
        let {showStore:{showContent, setShowContent}} = this.props;
        return (
            <nav id="nav">
                <span onClick={() => setShowContent(SHOW_COL)}
                      className={showContent === SHOW_COL ? 'cur-tab' : ''}>收藏</span>
                <span onClick={() => setShowContent(SHOW_SETTING)}
                      className={showContent === SHOW_SETTING ? 'cur-tab' : ''}>设置</span>
            </nav>
        )
    }
}

