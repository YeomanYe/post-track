//@flow
import React, {Component} from 'react';
import Event from './Event';
import TabUtil from '../utils/TabUtil';

type State = {
    isCol: boolean
}
let {bindInnerFun,arrEqStr,CNT_CMD_TOGGLE_CUR_COL,EVENT_RELOAD_COL} = window;
export default class Toolbar extends Component<any, State> {
    constructor(props: any) {
        super(props);
        bindInnerFun(this);
        this.state = {
            isCol:false
        }
    }

    componentWillReceiveProps(nextProps: Object) {
        let self = this;
        TabUtil.getCurTab(tab => {
            let index = arrEqStr(nextProps.colListDatas,{url:tab.url});
            let isCol = true;
            if(index < 0) isCol = false;
            self.setState({isCol});
        });
    }

    toggleCol(){
        TabUtil.sendToCurTab([CNT_CMD_TOGGLE_CUR_COL],this.handlerResData);
    }

    handlerResData(data: any){
        if(data) this.setState(data);
        Event.emit(Event.TYPE.RELOAD_COL);
    }

    render() {
        let {isCol} = this.state;
        return (
            <header id='toolbar'>
                <div className="hd">
                    <img src="../../images/icon/logo-white32.png" alt=""/>
                    <h1>PostTrack</h1>
                </div>
                <div className="bd">
                    <img onClick={this.toggleCol} src={isCol ? "../../images/star-yellow.png" : "../../images/star-white.png"} alt=""/>
                </div>
            </header>
        );
    }
}
