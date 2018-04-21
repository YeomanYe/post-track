import React, { Component } from 'react';
import Event from './Event';

export default class TogglePanel extends Component {

    constructor(props){
        super(props);
        this.state = {
            datas:[],
            curIndex:0
        };
    }
    toggleCnt(num){
        Event.emit(EVENT_CHANGE_CNT,num);
        this.setState({
            curIndex:num
        });
    }
    render() {
        let {datas,curIndex} = this.state;
        return (
            <nav id="nav">
                <span onClick={()=>this.toggleCnt(0)} className={curIndex === 0 ? 'cur-tab' : ''}>收藏</span>
                <span onClick={()=>this.toggleCnt(1)} className={curIndex === 1 ? 'cur-tab' : ''}>设置</span>
            </nav>
        );
    }
}