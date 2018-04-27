//@flow
import React, {Component} from 'react';
import Event from './Event';

let switchTipsElm: Object;

type State = {
    isShow: boolean
}
type Props = {

}
let {SHOW_SETTING,getStoreLocal,Switch,storLocal,EVENT_CHANGE_CNT,bindInnerFun,STOR_KEY_IS_CLOSE_TIPS} = window;
export default class SettingList extends Component<Props,State> {

    cntChangeHandler(num: number){
        let isShow = false;
        if(num === SHOW_SETTING){
            if(!switchTipsElm)
            getStoreLocal(STOR_KEY_IS_CLOSE_TIPS,function (status: ?boolean) {
                status = !status;
                switchTipsElm = new Switch(document.getElementById('switch-close-tip'), {size: 'middle',onChange:function (e) {
                    var checked = switchTipsElm.getChecked();
                    storLocal.set({[STOR_KEY_IS_CLOSE_TIPS]:!checked});
                }});
                if(status) switchTipsElm.on();
            });
            isShow = true;

        }
        this.setState({isShow})
    }

    componentWillUnmount() {
        Event.unregister(EVENT_CHANGE_CNT,this.cntChangeHandler);
    }

    constructor(props: any) {
        super(props);
        bindInnerFun(this);
        this.state = {
          isShow:false
        };
        Event.register(EVENT_CHANGE_CNT,this.cntChangeHandler);
    }

    render() {
        let {isShow} = this.state;
        return (
            <div id="content-setting-wrap" className={ isShow ? 'list' : 'hidden'}>
                <ul id="setting-list" class="list">
                    <legend><img src="images/all-setting.png"/><span>全部设置</span></legend>
                    <li><span>桌面提醒</span><input className="checkbox-switch" type="checkbox" id="switch-close-tip"/></li>
                </ul>

            </div>
        );
    }
}