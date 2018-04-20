import React, { Component } from 'react';

export default class TogglePanel extends Component {

    constructor(props){
        super(props);
        this.state = {
            datas:[],
            curIndex:0
        };
    }
    toggleCnt(num){

    }
    render() {
        let {datas,curIndex} = this.state;
        return (
            <nav id="nav">
                <span onClick={()=>this.toggleCnt(0)} className={curIndex === 0 ? 'curTab' : ''}>收藏</span>
                <span onClick={()=>this.toggleCnt(1)} className={curIndex === 1 ? 'curTab' : ''}>设置</span>
            </nav>
        );
    }
}